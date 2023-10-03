const sqlite3 = require('sqlite3').verbose();
const XLSX = require('node-xlsx');
const fs = require('fs');

// Open the SQLite database or create it if it doesn't exist
const db = new sqlite3.Database('faq2.db');

// Read the ODS file
const odsData = XLSX.parse(fs.readFileSync('faq2.ods'));

// Assuming the ODS file contains a single sheet
const sheetData = odsData[0].data;

// Create an SQLite table for the FAQ data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS faq (
    Tidsmerke TEXT,
    Sporsmal TEXT,
    Svar TEXT
  )`);

  // Insert data from the ODS file into the SQLite table
  const insertStatement = db.prepare('INSERT INTO faq (Tidsmerke, Sporsmal, Svar) VALUES (?, ?, ?)');
  
  for (let i = 1; i < sheetData.length; i++) { // Skip header row
    const [Tidsmerke, Sporsmal, Svar] = sheetData[i];
    insertStatement.run(Tidsmerke, Sporsmal, Svar);
  }
  
  insertStatement.finalize();

  console.log('Data imported successfully.');

  // Close the SQLite database
  db.close();
});
