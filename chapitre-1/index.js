const authors = require('./authors/authors.js')
const express = require('express');
const port = 8000;
const app = express();

//ex1

app.get('/', (req, res) => {
  res.send('Authors API');
});

//ex2

app.get('/authors/:id', (req, res) => {
  let num = req.params.id;

  res.send(`${authors[num - 1].name}, ${authors[num - 1].nationality}`)

});

//ex3

app.get('/authors/:id/books', (req, res) => {
  let num = req.params.id;
  res.send(`${authors[num - 1].books.join(", ")}`)

});

//ex4

app.get('/json/authors/:id', (req, res) => {
  let num = req.params.id;
  res.json({
    name: authors[num - 1].name,
    nationality: authors[num - 1].nationality
  });
});

app.get('/json/authors/:id/books', (req, res) => {
  let num = req.params.id;
  let books = authors[num - 1].books
  res.json({
    books: books
  });
});

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});