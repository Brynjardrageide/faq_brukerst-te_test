
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Replace 'faq3.tsv' with your actual file path.
const tsvFilePath = 'faq3.tsv';

// Create a new SQLite database or open an existing one.
const db = new sqlite3.Database('faq3.db');

// Read the TSV file and split it into lines.
const tsvData = fs.readFileSync(tsvFilePath, 'utf-8');
const lines = tsvData.split('\n');

// Remove the header line (if any).
const header = lines.shift();

// Create a table in the SQLite database.
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS faq (Tidsmerke TEXT, Spørsmål TEXT, Svar TEXT)');

  // Insert data from the TSV file into the SQLite table.
  const stmt = db.prepare('INSERT INTO faq VALUES (?, ?, ?)');

  lines.forEach((line) => {
    const [tidsmerke, sporsmal, svar] = line.split('\t'); // Updated variable name to 'sporsmal'
    stmt.run(tidsmerke, sporsmal, svar); // Updated variable name to 'sporsmal'
  });

  stmt.finalize();
});

// Close the database connection when done.
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Import completed. Database closed.');
});
