const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { findExistingConfigs, generateConfigsForAgency } = require('./configGenerator');

const OUTPUT_YAML = 'output/generated-jobs/generated.yml';
// Only use the checked-in version
const VALIDATED_URLS_PATH = 'output/checked-in/validated-urls.json';

const agencyFilter = process.env.AGENCY_NAME ? process.env.AGENCY_NAME.toLowerCase() : null;
console.log(`Agency filter: ${agencyFilter || 'None (generating all jobs)'}`);
console.log(`AGENCY_NAME environment variable: "${process.env.AGENCY_NAME}"`);
console.log(`Using validated URLs from: ${VALIDATED_URLS_PATH}`);

let validatedData;

// Replace the FORCE_JSON_DATA constant with this conditional check
const FORCE_JSON_DATA = process.env.CI_JOB_NAME === 'scan-matrix-sites' || false;

console.log(`Force JSON data: ${FORCE_JSON_DATA ? 'Yes' : 'No'} (Job name: ${process.env.CI_JOB_NAME || 'Not set'})`);

// Only use the checked-in file, no fallbacks
if (!fs.existsSync(VALIDATED_URLS_PATH)) {
  console.error(`❌ Missing checked-in file: ${VALIDATED_URLS_PATH}`);
  console.error('Please run validate_urls.js first to generate the validated URLs file');
  process.exit(1);
} 

// Load the validated URLs
validatedData = JSON.parse(fs.readFileSync(VALIDATED_URLS_PATH, 'utf8'));
console.log(`✅ Loaded ${Object.keys(validatedData).length} agencies from validated URLs`);

(async () => {
  if (agencyFilter) {
    console.log(`Agency filter: ${agencyFilter}`);
    
    // Debug information
    console.log("====== DEBUG INFO ======");
    console.log(`AGENCY_NAME: "${agencyFilter}"`);
    console.log("Environment variables:", process.env);
    console.log("========================");
    
    // Find existing configs for this agency
    const existingConfigs = findExistingConfigs(agencyFilter);
    
    // If we have existing configs, use them
    if (!FORCE_JSON_DATA && existingConfigs.length > 0) {
      const jobBlocks = [];
      
      // Create both Unlighthouse and OOBEE jobs for each config
      existingConfigs.forEach(config => {
        // Unlighthouse job
        jobBlocks.push({
          jobName: `scan-${agencyFilter}-${config.safeDomain}`,
          scanType: 'unlighthouse',
          agency: agencyFilter,
          domain: config.safeDomain,
          configFile: config.configFile
        });
        
        // OOBEE job
        jobBlocks.push({
          jobName: `oobee-${agencyFilter}-${config.safeDomain}`,
          scanType: 'oobee',
          agency: agencyFilter,
          domain: config.safeDomain,
          configFile: config.configFile
        });
      });
      
      // Generate YAML with these job blocks
      await generateYaml(jobBlocks);
    } 
    // If no configs exist, create them using the same process as normal mode
    else {
      console.log(`No existing configs found for ${agencyFilter}, will generate them`);
      
      if (!fs.existsSync(VALIDATED_URLS_PATH)) {
        console.error(`❌ Missing: ${VALIDATED_URLS_PATH}`);
        process.exit(1);
      }
      
      validatedData = JSON.parse(fs.readFileSync(VALIDATED_URLS_PATH, 'utf8'));
      fs.mkdirSync(path.dirname(OUTPUT_YAML), { recursive: true });
      
      // Filter the data for just this agency
      const filteredAgencies = Object.entries(validatedData).filter(([agency, _]) => 
        agency.toLowerCase().includes(agencyFilter.toLowerCase())
      );
      
      console.log(`Processing ${filteredAgencies.length} agencies out of ${Object.keys(validatedData).length} total`);
      
      if (filteredAgencies.length === 0) {
        console.warn(`⚠️ No matching agencies found for "${agencyFilter}" in validated data`);
        process.exit(0);
      }
      
      let jobBlocks = [];
      
      // Generate configs for each agency
      for (const [agency, urls] of filteredAgencies) {
        console.log(`Processing agency: ${agency} with ${urls.length} URLs`);
        
        // Group URLs by base domain
        const domainGroups = groupUrlsByBaseDomain(urls);
        console.log(`Grouped into ${Object.keys(domainGroups).length} base domains`);
        
        // Process each base domain
        for (const [baseDomain, domainUrls] of Object.entries(domainGroups)) {
          console.log(`Processing domain: ${baseDomain} with ${domainUrls.length} URLs`);
          
          try {
            // Process all URLs for this domain at once
            const domainJobBlocks = await withTimeout(
              generateConfigsForAgency(agency, domainUrls, baseDomain),
              30000 // 30 second timeout per domain
            );
            
            // Add successful job blocks
            jobBlocks = jobBlocks.concat(domainJobBlocks);
            
            console.log(`✅ Successfully processed domain ${baseDomain} for ${agency}`);
          } catch (error) {
            console.error(`⚠️ Error processing domain ${baseDomain} for ${agency}: ${error.message}`);
            // Continue with next domain
          }
        }
      }
      
      // Generate YAML with these job blocks
      await generateYaml(jobBlocks);
    }
  } else {
    if (!fs.existsSync(VALIDATED_URLS_PATH)) {
      console.error(`❌ Missing: ${VALIDATED_URLS_PATH}`);
      process.exit(1);
    }

    validatedData = JSON.parse(fs.readFileSync(VALIDATED_URLS_PATH, 'utf8'));
    fs.mkdirSync(path.dirname(OUTPUT_YAML), { recursive: true });

    // Process all agencies
    const filteredAgencies = Object.entries(validatedData);
    console.log(`Processing ${filteredAgencies.length} agencies`);

    let jobBlocks = [];

    // Generate configs for each agency
    for (const [agency, urls] of filteredAgencies) {
      console.log(`Processing agency: ${agency} with ${urls.length} URLs`);
      
      // Group URLs by domain first
      const domainGroups = groupUrlsByBaseDomain(urls);
      console.log(`Grouped into ${Object.keys(domainGroups).length} domains for ${agency}`);
      
      // Process each domain with all its URLs at once
      for (const [domain, domainUrls] of Object.entries(domainGroups)) {
        console.log(`Processing domain ${domain} with ${domainUrls.length} URLs`);
        
        try {
          // Process all domain URLs at once
          const domainJobBlocks = await withTimeout(
            generateConfigsForAgency(agency, domainUrls, domain),
            30000 // 30 second timeout per domain
          );
          
          jobBlocks = jobBlocks.concat(domainJobBlocks);
        } catch (error) {
          console.error(`⚠️ Error processing domain ${domain}: ${error.message}`);
        }
      }
    }

    // Generate YAML with these job blocks
    await generateYaml(jobBlocks);
  }
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

// Add this helper function at the top of your file
function withTimeout(promise, timeoutMs = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
}

// Extract base domain from URL
function getBaseDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    console.error(`Invalid URL: ${url}`);
    return null;
  }
}

// Group URLs by base domain
function groupUrlsByBaseDomain(urls) {
  const domainGroups = {};
  
  for (const url of urls) {
    const baseDomain = getBaseDomain(url);
    if (!baseDomain) continue;
    
    if (!domainGroups[baseDomain]) {
      domainGroups[baseDomain] = [];
    }
    domainGroups[baseDomain].push(url);
  }
  
  return domainGroups;
}

// Update the generateYaml function
async function generateYaml(jobBlocks) {
  // Deduplicate job blocks by domain
  const uniqueJobBlocks = {};
  
  // Use domain as the key for deduplication
  for (const job of jobBlocks) {
    const key = `${job.agency}-${job.domain}-${job.scanType || 'unlighthouse'}`;
    
    // Only keep the first occurrence of each domain-scantype combination
    if (!uniqueJobBlocks[key]) {
      uniqueJobBlocks[key] = job;
    }
  }
  
  // Convert back to array
  const deduplicatedJobBlocks = Object.values(uniqueJobBlocks);
  console.log(`Deduplicated job blocks: ${deduplicatedJobBlocks.length} (from ${jobBlocks.length} original blocks)`);
  
  // FIX: Correct paths BEFORE generating YAML files
  for (const job of deduplicatedJobBlocks) {
    // If using absolute paths, ensure they're correct for the CI environment
    if (job.configFile.startsWith('/')) {
      // Update path for CI environment if needed
      job.configFile = job.configFile.replace('/Users/kit/site-evaluation-tools', '/a11y/site-evaluation-tools');
    }
    
    // Use relative paths instead of absolute paths
    if (job.configFile.startsWith('/')) {
      // Extract just the filename and use a relative path
      const filename = path.basename(job.configFile);
      job.configFile = `configs/validated/${filename}`;
    }
    
    // Verify config exists (in local development)
    if (!fs.existsSync(job.configFile) && !process.env.CI) {
      console.warn(`⚠️ Warning: Config file does not exist: ${job.configFile}`);
    }
  }
  
  // Group jobs by agency
  const jobsByAgency = {};
  
  // Group all jobs by agency
  for (const job of deduplicatedJobBlocks) {
    if (!jobsByAgency[job.agency]) {
      jobsByAgency[job.agency] = [];
    }
    jobsByAgency[job.agency].push(job);
  }
  
  // Create directory for generated files
  fs.mkdirSync(path.dirname(OUTPUT_YAML), { recursive: true });
  
  // Generate individual agency YAML files
  for (const [agency, agencyJobs] of Object.entries(jobsByAgency)) {
    // Create agency-specific YAML
    const safeAgency = agency.replace(/[^a-z0-9-]/g, '-').toLowerCase();
    const agencyFile = `output/generated-jobs/${safeAgency}.yml`;
    
    // Separate jobs by scan type
    const unlighthouseJobs = agencyJobs.filter(job => job.scanType === 'unlighthouse');
    const oobeeJobs = agencyJobs.filter(job => job.scanType === 'oobee');
    
    // Build agency YAML object using proper structure like static generator
    const agencyYamlObj = {
      include: [
        { local: 'template.yml' }
      ],
      variables: {
        CONFIG_BASE_PATH: 'configs/validated',
        DEBUG_MODE: 'true',
        NODE_OPTIONS: '--max-old-space-size=4096'
      },
      stages: ['build']
    };
    
    // Create Unlighthouse matrix job
    if (unlighthouseJobs.length > 0) {
      const unlighthouseMatrixEntries = unlighthouseJobs.map(job => {
        const safeDomain = job.domain.replace(/[^a-z0-9-]/g, '-').toLowerCase();
        const configFileName = `${job.agency}-${safeDomain}.config.js`;
        const originalDomain = safeDomain.replace(/-part\d+$/, '');
        const properDomain = originalDomain.replace(/-/g, '.');
        
        return {
          JOB_NAME: `scan-${job.agency}-${safeDomain}`,
          SITE_NAME: `https://${properDomain}`,
          SITE_FILE: `configs/validated/${configFileName}`
        };
      });
      
      agencyYamlObj[`${safeAgency}_unlighthouse_matrix`] = {
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
          'mkdir -p configs/validated',
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
    }
    
    // Create OOBEE matrix job
    if (oobeeJobs.length > 0) {
      const oobeeMatrixEntries = oobeeJobs.map(job => {
        const safeDomain = job.domain.replace(/[^a-z0-9-]/g, '-').toLowerCase();
        const configFileName = `${job.agency}-${safeDomain}.config.js`;
        const originalDomain = safeDomain.replace(/-part\d+$/, '');
        const properDomain = originalDomain.replace(/-/g, '.');
        
        return {
          JOB_NAME: `oobee-${job.agency}-${safeDomain}`,
          SITE_NAME: `https://${properDomain}`,
          SITE_FILE: `configs/validated/${configFileName}`
        };
      });
      
      agencyYamlObj[`${safeAgency}_oobee_matrix`] = {
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
            'oobee-results.json',
            'oobee-results.zip',
            '*.log',
            'oobee-scan.log'
          ],
          expire_in: '1 week',
          reports: {
            junit: 'oobee-results.json'
          }
        },
        variables: {
          SCANNER_NAME: 'SiteEvaluationBot',
          SCANNER_EMAIL: 'scanner@example.com',
          TASK_NAME: 'OOBEE Matrix Accessibility Scan',
          UPLOAD_RESULTS: 'false',
          SCAN_TYPE: 'oobee',
          KUBERNETES_MEMORY_REQUEST: '1.5Gi',
          KUBERNETES_MEMORY_LIMIT: '3Gi',
          KUBERNETES_EPHEMERAL_STORAGE_REQUEST: '3Gi',
          KUBERNETES_EPHEMERAL_STORAGE_LIMIT: '6Gi'
        },
        before_script: [
          'echo "Installing NPM packages..."',
          'npm install @unlighthouse/cli googleapis csv json2csv axios xml2js node-jq',
          'echo "Setting up OOBEE matrix job..."',
          'mkdir -p configs/validated',
          'echo "Job Configuration:"',
          'echo "JOB_NAME=$JOB_NAME"',
          'echo "SITE_NAME=$SITE_NAME"',
          'echo "SITE_FILE=$SITE_FILE"',
          'echo "CONFIG_BASE_PATH=$CONFIG_BASE_PATH"',
          'echo "Checking if config exists:"',
          'ls -la "$SITE_FILE" || echo "Config file not found"'
        ],
        parallel: {
          matrix: oobeeMatrixEntries
        }
      };
    }
    
    // Convert the object to YAML and write to file
    const yamlHeader = `# Auto-generated for agency: ${agency}
# Generated on ${new Date().toISOString()}
# Total matrix jobs: ${agencyJobs.length}

`;
    
    const yamlContent = yamlHeader + yaml.dump(agencyYamlObj, {
      indent: 2,
      lineWidth: -1,
      quotingType: '"',
      forceQuotes: false
    });
    
    // Write agency file
    fs.writeFileSync(agencyFile, yamlContent);
    console.log(`✅ Wrote agency file: ${agencyFile} with ${agencyJobs.length} jobs`);
  }
  
  // Create parent file that includes all agency files
  const parentYamlObj = {
    variables: {
      CONFIG_BASE_PATH: 'configs/validated',
      JQ_PATH: '/usr/bin/jq',
      SKIP_EMPTY_AGENCIES: 'true'
    },
    include: []
  };
  
  // Add all agency files to the parent with FULL PATH from repo root
  for (const agency of Object.keys(jobsByAgency)) {
    const safeAgency = agency.replace(/[^a-z0-9-]/g, '-').toLowerCase();
    parentYamlObj.include.push({
      local: `output/generated-jobs/${safeAgency}.yml`
    });
  }
  
  // Convert to YAML and write the parent file
  const parentYamlHeader = `# Auto-generated parent include file
# Generated on ${new Date().toISOString()}
# Total agencies: ${Object.keys(jobsByAgency).length}

`;
  
  const parentYamlContent = parentYamlHeader + yaml.dump(parentYamlObj, {
    indent: 2,
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false
  });
  
  fs.writeFileSync(OUTPUT_YAML, parentYamlContent);
  console.log(`✅ Wrote parent include file: ${OUTPUT_YAML}`);
}
