const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.json());
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

app.use(function(req, res, next) {
    console.log("Je fais un console.log à chaque requête", new Date().toDateString());
    next(); 
});



app.get('/heroes', (req, res) => {
    const heroes = superHeroes.map(hero => {
        return hero.name
    })
    res.json(heroes);
});

app.get('/heros/:name', (req, res) => {
    let param = req.params.name;
    let heroName = superHeroes.filter(function(hero) {
        return param === hero.name
    })
        res.json(heroName)
})



app.get('/heroes/:name/power', (req, res) => {
    let params = req.params.power;
    let heroPower = superHeroes.filter(function(hero) {
        return param === hero.power
    })
        res.json(heroPower)
});

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});