const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const tsvFilePath = 'faq3.tsv';

const db = new sqlite3.Database('faq3.db');

const tsvData = fs.readFileSync(tsvFilePath, 'utf-8');
const lines = tsvData.split('\n');

const header = lines.shift();

db.serialize(() => {
  // Add an ID column with auto-incrementing behavior.
  db.run('DROP TABLE IF EXISTS faq'); // Drop the table if it exists.
  db.run('CREATE TABLE IF NOT EXISTS faq (id INTEGER PRIMARY KEY AUTOINCREMENT, Tidsmerke TEXT, Spørsmål TEXT, Svar TEXT)');

  // Update the insertion statement.
  const stmt = db.prepare('INSERT INTO faq (Tidsmerke, Spørsmål, Svar) VALUES (?, ?, ?)');

  lines.forEach((line) => {
    const [tidsmerke, sporsmal, svar] = line.split('\t');
    stmt.run(tidsmerke, sporsmal, svar);
  });

  stmt.finalize();
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Import completed. Database closed.');
});
