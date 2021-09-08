const express = require('express');
const app = express();
const PORT = 8000;
const students = [
    { name: "Laura" },
    { name: "Yangchen" },
    { name: "Emran" },
    { name: "Julien" },
    { name: "Elodie" },
    { name: "Anthony" },
    { name: "Artha" },
    { name: "Asad" },
    { name: "Kévin" },
];


const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const mongoose = require("mongoose");

app.use(express.json());

app.use(function(req, res, next) {
    console.log("Je fais un console.log à chaque requête", new Date().toDateString());
    next(); 
});

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to MongoDB !");
	});

const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: Number,
});

const Student = mongoose.model("Student", HeroSchema);

// Routes
app.get("/students", async (req, res) => {
	const students = await Student.find();
	res.json({
		message: "OK",
		data: students,
	});
});

app.get("/heroes/:name", async (req, res) => {
	const name = await Hero.findById(req.params.name);
    let hero = heroes.filter((obj) => obj.name.toLowerCase().replace(" ", "") === name.toLowerCase())
	res.json({
		message: "OK",
		data: hero,
	});
});

app.get('/heroes/:name/power', (req, res) => {
    const name =  await Hero.findById(req.params.name)
    let hero = heroes.filter((obj) => obj.name.toLowerCase().replace(" ", "") === name.toLowerCase())
    res.json({
        status: "ok",
        power: hero.power,
    })
})

app.post('/student', (req, res) => {
    const newStudent =  await Student.findById(req.body)
    students.push(newStudent)
    res.json({
        status: "student added",
        data: students,
    });
});




app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});