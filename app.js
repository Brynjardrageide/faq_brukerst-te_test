// Desc: Main entry point for the application
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs'); // Require EJS
const moment = require('moment'); // Require moment.js


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

    // Format the timestamp for display in the template
    rows.forEach((row) => {
      row.Tidsmerke = moment(row.Tidsmerke, 'DD.MM.YYYY [kl.] HH.mm.ss').format('LLLL');
    });

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
     // Format the timestamp for display in the template
     rows.forEach((row) => {
      row.Tidsmerke = moment(row.Tidsmerke, 'DD.MM.YYYY [kl.] HH.mm.ss').format('LLLL');
    });
      res.render('data', { faqData: rows });
    });
  });
  
// ...
// Your existing code...

// Define a GET route for accessing the input form
app.get('/input', (req, res) => {
  const timestamp = moment().format('DD.MM.YYYY [kl.] HH.mm.ss'); // Generate timestamp
  res.render('input', { timestamp }); // Pass the timestamp to the template
});

// Define a POST route for handling question submissions
app.post('/submit', (req, res) => {
  const question = req.body.question;
  const timestamp = moment(); // Use moment.js to generate a timestamp

  // Insert the question and formatted timestamp into the database
  db.run('INSERT INTO faq (Spørsmål, Tidsmerke) VALUES (?, ?)', [question, timestamp.format('DD.MM.YYYY [kl.] HH.mm.ss')], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/'); // Redirect to the home page after submission
  });
});

// Define a GET route for the "svar" page where users can answer questions
app.get('/svar', (req, res) => {
  // Fetch unanswered questions from the database (questions with Svar set to null)
  db.all('SELECT * FROM faq WHERE Svar IS NULL', (err, questions) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }

    // Render the "svar" template with the unanswered questions
    res.render('svar', { questions });
  });
});
app.post('/answer', (req, res) => {
  const questionId = req.body.questionId;
  const answer = req.body.answer;

  // Insert the answer into the database for the selected question
  db.run('UPDATE faq SET Svar = ? WHERE id = ?', [answer, questionId], (err) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Internal Server Error');
      }
      res.redirect('/svar'); // Redirect back to the answer page
  });
});



app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));


// Rest of your code related to the database operations...

// koble til databasen
const db = new sqlite3.Database('./db/data/faq3.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});
