const authors = require('./authors/authors.js')
const express = require('express');
const port = 8000;
const app = express();
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const mongoose = require("mongoose");


app.use(express.json());


// Connexion à MongoDB
// On accède à la valeur DB qui se trouve dans le config.env
// Dans le string de connection à MongoDB, on remplace le mot de passe et le nom de la base de données
mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to MongoDB !");
	});

// Mongoose
// Schéma pour définir la forme de vos documents
const AuthorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: Number,
});


// Modèle pour inteargir avec la base. Un modèle est lié à une collection
const Author = mongoose.model("Author", AuthorSchema);

// Routes
app.get("/authors", async (req, res) => {
	// Récupère tous les hotels de notre base de données
	const authors = await Author.find();

	res.json({
		message: "OK",
		data: authors,
	});
});

app.get("/authors/:id", async (req, res) => {
	// Récupère un seul hôtel dans notre BD, en fonction de son id
	const author = await Author.findById(req.params.id);

	// Trouver un Hotel en fonction de son nom
	//const hotel = Hotel.findOne({name: req.params.name})

	res.json({
		message: "OK",
		data: author,
	});
});

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