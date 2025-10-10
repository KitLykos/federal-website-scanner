const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { createLogger } = require('./logger');

const STATIC_CONFIG_DIR = 'output/configs/validated';
const OUTPUT_YAML = 'output/generated-jobs/static-unified-jobs.yml';

// Create logger for this module
const log = createLogger('StaticJobGen');

log.info(`Generating unified static jobs for all agencies`);
log.info(`Output file: ${OUTPUT_YAML}`);

/**
 * Find static site configurations for a specific agency
 * @param {string} agency - Agency name filter
 * @returns {Array<{configFile: string, domain: string, safeDomain: string, jobName: string}>}
 */
function findStaticConfigs(agency) {
  const sourceConfigDir = path.join(__dirname, 'configs/validated'); // Source directory
  
  if (!fs.existsSync(sourceConfigDir)) {
    console.warn(`⚠️ Source config directory does not exist: ${sourceConfigDir}`);
    return [];
  }
  
  const allFiles = fs.readdirSync(sourceConfigDir);
  
  // Filter config files based on agency
  let configFiles = [];
  
  if (agency === 'cms') {
    configFiles = allFiles.filter(f => 
      f.includes('health-human-services-') && 
      f.includes('cms') && 
      f.endsWith('.config.js')
    );
  } else if (agency === 'va') {
    configFiles = allFiles.filter(f => 
      f.startsWith('veterans-affairs-') && 
      f.endsWith('.config.js')
    );
  } else if (agency === 'education') {
    configFiles = allFiles.filter(f => 
      (f.startsWith('unlighthouse.config-education-') || 
       f.includes('education') ||
       f.includes('national-education-association-')) &&
      f.endsWith('.config.js')
    );
  } else {
    // Fallback for other agencies
    configFiles = allFiles.filter(f => 
      f.includes(agency) && 
      f.endsWith('.config.js')
    );
  }
  
  log.debug(`Found ${configFiles.length} config files for ${agency}`);
  
  const jobs = [];
  
  for (const configFile of configFiles) {
    const filenameWithoutExt = configFile.replace('.config.js', '');
    
    // Extract domain info from filename based on pattern
    let domainPart, jobPrefix;
    
    if (agency === 'education') {
      // Handle both patterns: unlighthouse.config-education-* and national-education-association-*
      if (filenameWithoutExt.includes('national-education-association-')) {
        domainPart = filenameWithoutExt.replace('national-education-association-', '');
      } else {
        domainPart = filenameWithoutExt.replace('unlighthouse.config-education-', '');
      }
      jobPrefix = 'education';
    } else if (agency === 'va') {
      // Format: veterans-affairs-domain-subdomain.config.js
      domainPart = filenameWithoutExt.replace('veterans-affairs-', '');
      jobPrefix = 'va';
    } else if (agency === 'cms') {
      // Format: health-human-services-domain-cms-gov.config.js
      domainPart = filenameWithoutExt.replace('health-human-services-', '');
      jobPrefix = 'cms';
    } else {
      domainPart = filenameWithoutExt;
      jobPrefix = agency;
    }
    
    // Convert domain part to actual domain (replace dashes with dots)
    const domain = domainPart.replace(/-/g, '.');
    
    // Create safe domain name for job naming
    const safeDomain = domainPart.replace(/[^a-zA-Z0-9-]/g, '-');
    const jobName = `scan-${jobPrefix}-${safeDomain}`;
    
    jobs.push({
      configFile,
      domain,
      safeDomain,
      jobName
    });
  }
  
  return jobs;
}

/**
 * Generate unified static pipeline with all agencies as matrix jobs
 */
async function generateStaticPipeline() {
  const yamlDir = path.dirname(OUTPUT_YAML);
  
  // Ensure output directory exists
  if (!fs.existsSync(yamlDir)) {
    fs.mkdirSync(yamlDir, { recursive: true });
  }

  console.log(`🏭 Generating unified static jobs pipeline for all agencies...`);
  
  // Define agencies and their config patterns
  const allAgencies = [
    {
      name: 'cms',
      displayName: 'CMS',
      copyCommand: 'cp configs/validated/health-human-services-*cms*.config.js output/configs/validated/ || echo "No CMS configs to copy"'
    },
    {
      name: 'va', 
      displayName: 'VA',
      copyCommand: 'cp configs/validated/veterans-affairs-*.config.js output/configs/validated/ || echo "No VA configs to copy"'
    },
    {
      name: 'education',
      displayName: 'Education', 
      copyCommand: 'cp configs/validated/unlighthouse.config-education-*.config.js output/configs/validated/ 2>/dev/null || true; cp configs/validated/*education*.config.js output/configs/validated/ 2>/dev/null || true; cp configs/validated/*national-education-association*.config.js output/configs/validated/ 2>/dev/null || echo "No Education configs to copy"'
    }
  ];

  const allJobs = {};
  let totalJobs = 0;

  for (const agency of allAgencies) {
    const configs = findStaticConfigs(agency.name);
    
    if (configs.length === 0) {
      console.log(`⚠️ No configs found for ${agency.name}`);
      continue;
    }

    // Create matrix entries for both Unlighthouse and OOBEE jobs
    const unlighthouseMatrixEntries = configs.map(config => ({
      JOB_NAME: config.jobName,
      SITE_NAME: `https://${config.domain}`,
      SITE_FILE: `output/configs/validated/${config.configFile}`
    }));

    const oobeeMatrixEntries = configs.map(config => ({
      JOB_NAME: `oobee-${config.jobName.replace('scan-', '')}`,
      SITE_NAME: `https://${config.domain}`,
      SITE_FILE: `output/configs/validated/${config.configFile}`
    }));

    // Create Unlighthouse matrix job
    allJobs[`${agency.name}_unlighthouse_matrix`] = {
      extends: '.default_template',
      stage: 'build',
      cache: [
        {
          key: {
            files: ['package-lock.json']
          },
          paths: ['.npm/']
        }
      ],
      artifacts: {
        when: 'always',
        paths: [
          '.unlighthouse/ci-result.csv',
          '.unlighthouse/',
          'scan.log'
        ]
      },
      variables: {
        KUBERNETES_MEMORY_REQUEST: '2Gi',
        KUBERNETES_MEMORY_LIMIT: '4Gi',
        KUBERNETES_EPHEMERAL_STORAGE_REQUEST: '4Gi',
        KUBERNETES_EPHEMERAL_STORAGE_LIMIT: '8Gi'
      },
      before_script: [
        'echo "Installing NPM packages..."',
        'npm install @unlighthouse/cli googleapis csv json2csv axios xml2js node-jq',
        'echo "Setting up config files..."',
        'mkdir -p output/configs/validated',
        agency.copyCommand,
        'echo "Job Configuration:"',
        'echo "JOB_NAME=$JOB_NAME"',
        'echo "SITE_NAME=$SITE_NAME"',
        'echo "SITE_FILE=$SITE_FILE"',
        'echo "CONFIG_BASE_PATH=$CONFIG_BASE_PATH"',
        'echo "Checking if config exists:"',
        'ls -la "$SITE_FILE" || echo "Config file not found"'
      ],
      parallel: {
        matrix: unlighthouseMatrixEntries
      }
    };

    // Create OOBEE matrix job
    allJobs[`${agency.name}_oobee_matrix`] = {
      extends: '.default_template',
      stage: 'build',
      variables: {
        KUBERNETES_MEMORY_REQUEST: '1.5Gi',
        KUBERNETES_MEMORY_LIMIT: '3Gi',
        KUBERNETES_EPHEMERAL_STORAGE_REQUEST: '3Gi',
        KUBERNETES_EPHEMERAL_STORAGE_LIMIT: '6Gi'
      },
      parallel: {
        matrix: oobeeMatrixEntries
      }
    };

    totalJobs += (configs.length * 2); // Both Unlighthouse and OOBEE jobs
    log.success(`Added ${configs.length} matrix jobs for ${agency.displayName}`);
  }

  if (totalJobs === 0) {
    console.log('⚠️ No static jobs to generate');
    
    // Create empty YAML file
    const emptyYamlObj = {
      '# No static jobs generated': null,
      '# Generated on': new Date().toISOString(),
      jobs: {}
    };
    fs.writeFileSync(OUTPUT_YAML, yaml.dump(emptyYamlObj));
    return;
  }

  const yamlObj = {
    include: [
      { local: 'template.yml' }
    ],
    variables: {
      CONFIG_BASE_PATH: 'output/configs/validated',
      DEBUG_MODE: 'true',
      NODE_OPTIONS: '--max-old-space-size=4096'
    },
    stages: ['build'],
    ...allJobs
  };

  // Convert the object to YAML and write to file
  const yamlHeader = `# Unified static matrix jobs for all agencies
# Generated on ${new Date().toISOString()}
# Total matrix jobs: ${totalJobs} across ${allAgencies.length} agencies

`;
  
  const yamlContent = yamlHeader + yaml.dump(yamlObj, {
    indent: 2,
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false
  });
  
  fs.writeFileSync(OUTPUT_YAML, yamlContent);
  log.success(`Generated unified static pipeline: ${OUTPUT_YAML}`);
  log.success(`Successfully generated ${totalJobs} matrix jobs across ${allAgencies.length} agencies`);
}

// Main execution
(async () => {
  try {
    console.log(`🚀 Starting unified static job generation...`);
    await generateStaticPipeline();
  } catch (error) {
    console.error(`❌ Error generating unified static jobs: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
})();