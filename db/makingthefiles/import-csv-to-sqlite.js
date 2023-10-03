const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Create or open an SQLite database file (change the filename if needed)
const db = new sqlite3.Database('faq.db');

// Read the CSV file
const csvData = fs.readFileSync('faq.csv', 'utf8');

// Split the CSV data into rows
const rows = csvData.split('\n');

// Define a function to insert a row into the database
function insertRow(row) {
  const [tidsmerke, question, answer] = row.split(',');
  const query = `INSERT INTO faq (Tidsmerke, Sporsmal, Svar) VALUES (?, ?, ?)`;
  
  db.run(query, [tidsmerke, question, answer], function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Row inserted with ID ${this.lastID}`);
    }
  });
}

// Create the faq table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS faq (
      Tidsmerke TEXT,
      Sporsmal TEXT,
      Svar TEXT
    )
  `);

  // Loop through the CSV rows and insert them into the database
  for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
    insertRow(rows[i]);
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database connection closed.');
  }
});
