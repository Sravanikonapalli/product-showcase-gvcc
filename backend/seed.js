require('dotenv').config(); 
const fs = require('fs');
const path = require('path');
const { db } = require('./db');

function runSqlFile(filePath) {
  return new Promise((resolve, reject) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    db.exec(sql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function seed() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');

    console.log('Applying schema...');
    await runSqlFile(schemaPath);
    console.log('Schema applied.');

    console.log('Applying seed data...');
    await runSqlFile(seedPath);
    console.log('Seed data applied.');

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
