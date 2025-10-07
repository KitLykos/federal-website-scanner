const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function countJobs() {
  const jobsDir = path.join(__dirname, 'output/generated-jobs/');
  let agencyJobCounts = {};
  let totalJobCount = 0;
  let totalMatrixDefinitions = 0;

  try {
    const files = fs.readdirSync(jobsDir);
    // Filter for only the agency-specific matrix files
    const ymlFiles = files.filter(file => file.endsWith('_matrix.yml'));

    console.log(`🔍 Found ${ymlFiles.length} agency job files to process.`);

    ymlFiles.forEach(file => {
      const agencyName = file.replace('_matrix.yml', '');
      let agencyTotalJobs = 0;
      const filePath = path.join(jobsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsedYaml = yaml.load(fileContent);

      Object.keys(parsedYaml).forEach(key => {
        // Skip non-job keys
        if (key === 'stages' || key === 'include') return;

        totalMatrixDefinitions++;
        const job = parsedYaml[key];
        if (job.parallel && job.parallel.matrix && Array.isArray(job.parallel.matrix)) {
          agencyTotalJobs += job.parallel.matrix.length;
        }
      });
      
      agencyJobCounts[agencyName] = agencyTotalJobs;
      totalJobCount += agencyTotalJobs;
    });

    console.log('\n📊 Job counts per agency:');
    for (const [agency, count] of Object.entries(agencyJobCounts).sort()) {
      console.log(`  - ${agency}: ${count} jobs`);
    }
    
    console.log(`\n🧮 Total matrix job definitions: ${totalMatrixDefinitions}`);
    console.log(`🧮 Total dynamic scan jobs: ${totalJobCount}`);
    return totalJobCount;

  } catch (err) {
    // If the directory doesn't exist, it's not an error, just means no jobs generated yet.
    if (err.code === 'ENOENT') {
      console.log('🟡 No generated job files found. Skipping count.');
      return 0;
    }
    console.error(`❌ Error processing job files: ${err.message}`);
    return 0;
  }
}

countJobs();
