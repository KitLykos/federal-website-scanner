#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Function to extract domain from config file
function getDomainFromConfigFile(configPath) {
    try {
        const config = require(path.resolve(configPath));
        if (config && config.site) {
            const url = new URL(config.site);
            return url.hostname.replace(/^www\./, '');
        }
    } catch (error) {
        console.warn(`Failed to extract domain from config: ${configPath}`);
    }
    return null;
}

// Function to create a safe job name from domain
function createJobName(domain) {
    return domain.replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
}

// Function to extract base config name (e.g., "agriculture" from "agriculture-www-usda-gov.config.js")
function extractBaseConfigName(configFile) {
    const match = configFile.match(/^([^-]+)-.*\.config\.js$/);
    return match ? match[1] : null;
}

// Function to generate GitLab CI job for a single domain
function generateJobConfig(configFile, domain, baseConfigName) {
    // Create a unique job name from the config file name (without .config.js)
    const jobName = configFile.replace('.config.js', '').replace(/[^a-zA-Z0-9]/g, '-');
    const configPath = `configs/validated/${configFile}`;
    
    return {
        [jobName]: {
            stage: 'schedule',
            extends: '.default_template',
            variables: {
                SITE_NAME: `https://${domain}`,
                SITE_FILE: configPath,
                SCAN_SCHEDULE: 'Scheduled',
                KUBERNETES_MEMORY_REQUEST: '3Gi',
                KUBERNETES_MEMORY_LIMIT: '8Gi',
                KUBERNETES_EPHEMERAL_STORAGE_REQUEST: '6Gi',  // Higher storage for domain jobs
                KUBERNETES_EPHEMERAL_STORAGE_LIMIT: '12Gi'
            },
            before_script: [
                'git config --global --add safe.directory "$CI_PROJECT_DIR"',
                'git config --global --add safe.directory "/a11y/site-evaluation-tools"',
                'echo "Installing NPM packages..."',
                'npm install @unlighthouse/cli googleapis csv json2csv axios xml2js node-jq',
                'mkdir -p output/configs/validated',
                'echo "📄 Checking for existing config:"',
                `if test -e ${configPath}; then echo "✅ Config file exists"; else echo "❌ Config file does not exist!"; fi`,
                `export SITE_FILE="${configPath}"`
            ],
            artifacts: {
                when: 'always',
                paths: [
                    '.unlighthouse/ci-result.csv',
                    '.unlighthouse/',
                    'scan.log',
                    configPath
                ]
            }
        }
    };
}

// Main function to generate jobs for a specific base config or all multi-domain configs
function generateDomainJobs(baseConfigFilter = null) {
    const configDir = 'configs/validated';
    
    if (!fs.existsSync(configDir)) {
        console.error(`❌ Config directory not found: ${configDir}`);
        process.exit(1);
    }
    
    const files = fs.readdirSync(configDir);
    
    // Find all multi-domain configs (pattern: <base>-<domain>.config.js)
    const multiDomainConfigs = files.filter(file => {
        const match = file.match(/^([^-]+)-.*\.config\.js$/);
        if (!match) return false;
        
        const baseConfig = match[1];
        // If filter is specified, only include configs matching that base
        return baseConfigFilter ? baseConfig === baseConfigFilter : true;
    });
    
    if (multiDomainConfigs.length === 0) {
        const filterMsg = baseConfigFilter ? ` for base config "${baseConfigFilter}"` : '';
        console.error(`❌ No multi-domain config files found${filterMsg}`);
        
        if (!baseConfigFilter) {
            console.log('\n📋 Available config patterns:');
            const allConfigs = files.filter(f => f.endsWith('.config.js'));
            const baseConfigs = new Set();
            allConfigs.forEach(file => {
                const match = file.match(/^([^-]+)-.*\.config\.js$/);
                if (match) baseConfigs.add(match[1]);
            });
            if (baseConfigs.size > 0) {
                console.log('Found base configs:', Array.from(baseConfigs).join(', '));
            } else {
                console.log('No multi-domain configs found. Looking for single configs...');
                allConfigs.forEach(file => console.log(`  - ${file}`));
            }
        }
        
        process.exit(1);
    }
    
    // Group configs by base config name
    const configGroups = {};
    multiDomainConfigs.forEach(configFile => {
        const baseConfig = extractBaseConfigName(configFile);
        if (baseConfig) {
            if (!configGroups[baseConfig]) {
                configGroups[baseConfig] = [];
            }
            configGroups[baseConfig].push(configFile);
        }
    });
    
    console.log(`📝 Found multi-domain configs for: ${Object.keys(configGroups).join(', ')}`);
    
    const allDomains = [];
    
    // Create base YAML object
    const yamlConfig = {
        stages: ['ci', 'generate', 'schedule', 'build'],
        include: [{ local: 'template.yml' }]
    };
    
    // Process each base config group
    for (const [baseConfig, configFiles] of Object.entries(configGroups)) {
        console.log(`\n📂 Processing ${baseConfig} configs (${configFiles.length} domains):`);
        
        const domains = [];
        
        for (const configFile of configFiles) {
            const configPath = path.join(configDir, configFile);
            const domain = getDomainFromConfigFile(configPath);
            
            if (domain) {
                console.log(`  - ${domain} (${configFile})`);
                domains.push({ domain, configFile, baseConfig });
                allDomains.push({ domain, configFile, baseConfig });
                
                // Add job config to YAML object
                const jobConfig = generateJobConfig(configFile, domain, baseConfig);
                Object.assign(yamlConfig, jobConfig);
            } else {
                console.warn(`⚠️  Could not extract domain from: ${configFile}`);
            }
        }
    }
    
    // Determine output file name
    const outputFile = baseConfigFilter 
        ? `output/generated-jobs/${baseConfigFilter}-jobs.yml`
        : 'output/generated-jobs/multi-domain-jobs.yml';
    
    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    
    // Convert YAML object to string and write the jobs file
    const yamlHeader = `# Generated multi-domain jobs
# This file contains individual jobs for each domain in multi-domain configs
# Generated on: ${new Date().toISOString()}

`;
    
    const yamlString = yamlHeader + yaml.dump(yamlConfig, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        skipInvalid: true
    });
    
    fs.writeFileSync(outputFile, yamlString);
    
    console.log(`\n✅ Generated ${allDomains.length} jobs in: ${outputFile}`);
    console.log('\n📋 Summary:');
    
    // Group summary by base config
    const summaryGroups = {};
    allDomains.forEach(({ domain, configFile, baseConfig }) => {
        if (!summaryGroups[baseConfig]) summaryGroups[baseConfig] = [];
        summaryGroups[baseConfig].push({ domain, configFile });
    });
    
    for (const [baseConfig, domains] of Object.entries(summaryGroups)) {
        console.log(`\n📂 ${baseConfig.toUpperCase()} (${domains.length} jobs):`);
        domains.forEach(({ domain, configFile }) => {
            const jobName = configFile.replace('.config.js', '').replace(/[^a-zA-Z0-9]/g, '-');
            console.log(`  - Job: ${jobName}`);
            console.log(`    Domain: ${domain}`);
            console.log(`    Config: ${configFile}`);
        });
    }
    
    console.log('\n🚀 To use these jobs, you can:');
    console.log('1. Include this file in your main .gitlab-ci.yml:');
    console.log('   include:');
    console.log(`     - local: ${outputFile}`);
    console.log('2. Or merge the job definitions into your existing .gitlab-ci.yml');
    
    return allDomains;
}

// Legacy function for backwards compatibility
function generateEducationJobs() {
    return generateDomainJobs('education');
}

// Run if called directly
if (require.main === module) {
    // Check command line arguments
    const args = process.argv.slice(2);
    const baseConfigFilter = args[0] || null;
    
    if (baseConfigFilter) {
        console.log(`🎯 Generating jobs for base config: ${baseConfigFilter}`);
        generateDomainJobs(baseConfigFilter);
    } else {
        console.log('🌐 Generating jobs for all multi-domain configs');
        console.log('💡 Tip: You can specify a base config name as an argument (e.g., "education", "sec", "va")');
        generateDomainJobs();
    }
}

module.exports = { 
    generateDomainJobs, 
    generateEducationJobs, 
    getDomainFromConfigFile, 
    createJobName, 
    extractBaseConfigName 
};
