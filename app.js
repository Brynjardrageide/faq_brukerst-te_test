// Desc: Main entry point for the application
const express = require('express');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs'); // Require EJS

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// ...

// Your other code

app.get('/', async (req, res) => {
  // Fetch data from the SQLite database
  db.all('SELECT * FROM faq', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }

    // Render the 'home' template (home.ejs) with the fetched data
    res.render('home', { faqData: rows });
  });
});


app.get('/data', (req, res) => {
    // Fetch data from the SQLite database
    db.all('SELECT * FROM faq', (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
      }
  
      // Render the 'home' template (home.ejs) with the fetched data
      res.render('data', { faqData: rows });
    });
  });
// ...

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));


// Rest of your code related to the database operations...


// koble til databasen
const db = new sqlite3.Database('./db/data/faq3.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})


