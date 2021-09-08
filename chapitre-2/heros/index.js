const express = require('express');
const app = express();
const PORT = 8000;
const superHeros = [
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricty", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]

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

const HeroSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: Number,
});

const Hero = mongoose.model("Hero", HeroSchema);

// Routes
app.get("/hero", async (req, res) => {
	const heroes = await Hero.find();
	res.json({
		message: "OK",
		data: heroes,
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

app.post('/heroes', (req, res) => {
    const newHero =  await Hero.findById(req.body)
    heroes.push(newHero)
    res.json({
        status: "hero added",
        data: heroes,
    });
});



/*
app.get('/heroes', (req, res) => {
    res.json({
        status: "ok",
        data: heroes,
    });
});

app.get('/heros/:name', (req, res) => {
    const name = req.params.name
    let hero = heroes.filter((obj) => obj.name.toLowerCase().replace(" ", "") === name.toLowerCase())
    res.json({
        status: "ok",
        data: hero,
    })
})



app.get('/heroes/:name/power', (req, res) => {
    const name = req.params.name
    let hero = heroes.filter((obj) => obj.name.toLowerCase().replace(" ", "") === name.toLowerCase())
    res.json({
        status: "ok",
        power: hero.power,
    })
})

app.use(express.json)

app.post('/heroes', (req, res) => {
    const newHero = req.body
    heroes.push(newHero)
    res.json({
        status: "hero added",
        data: heroes,
    });
});
*/

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});