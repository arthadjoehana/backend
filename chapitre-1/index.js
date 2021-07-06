
var authors = [
  {
      name: "Lawrence Nowell",
      nationality: "UK",
      books: ["Beowulf"]
  },
  {
      name: "William Shakespeare",
      nationality: "UK",
      books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
  },
  {
      name: "Charles Dickens",
      nationality: "US",
      books: ["Oliver Twist", "A Christmas Carol"]
  },
  {
      name: "Oscar Wilde",
      nationality: "UK",
      books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
  },
]

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
  let i = num - 1
  res.send(`${authors[i].name}, ${authors[i].nationality}`)

});

//ex3

app.get('/authors/:id/books', (req, res) => {
  let num = req.params.id;
  let i = num - 1
  res.send(`${authors[i].books}`)

});

//ex4

app.get('/json/authors/:id', (req, res) => {
  let num = req.params.id;
  let name = authors[num].name
  let nationality = authors[num].nationality
  res.json({
    name: name,
    nationality: nationality
  });
});

app.get('/json/authors/:id/books', (req, res) => {
  let num = req.params.id;
  let books = authors[num].books
  res.json({
    books: books
  });
});

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});