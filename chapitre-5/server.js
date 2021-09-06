const express = require("express");
const app = express();
const PORT = 3000;
const hotels = require('./hotels.json')
const restaurants = require('/restaurants.json')

app.use(function(req, res, next) {
    console.log("Je fais un console.log à chaque requête", new Date().toDateString());
    next(); 
});

app.get('/hotels', (req, res) => {
    res.json({
        status: "ok",
        data: hotels,
    });
});

app.get('/hotels/:id', (req, res) => {
    let num = req.params.id;
    res.json({
        status: "ok",
        data: hotels[num - 1],
    })
});

app.get('/restaurants', (req, res) => {
    res.json({
        status: "ok",
        data: restaurants,
    });
});

app.get('/restaurants/:id', (req, res) => {
    let num = req.params.id;
    res.json({
        status: "ok",
        data: restaurants[num - 1],
    })
});


app.use(express.json)

app.post('/hotels', (req, res) => {
    const newHotel = req.body
    hotels.push(newHotel)
    res.json({
        status: "hotel added",
        data: hotels,
    });
});

app.post('/restaurants', (req, res) => {
    const newRestaurant = req.body
    hotels.push(newRestaurant)
    res.json({
        status: "restaurant added",
        data: restaurants,
    });
});

app.listen(PORT, () => {
	console.log("Server listening...");
});