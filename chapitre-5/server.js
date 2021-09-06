const express = require("express");
const app = express();
const PORT = 3000;

const hotels = [
	{
		"id": 1,
		"name": "Imperial Hotel",
		"address": "84 av des Champs-Élysées",
		"city": "Paris",
		"country": "France",
		"stars": 5,
		"hasSpa": true,
		"hasPool": true,
		"priceCategory": 3
	},
	{
		"id": 2,
		"name": "The Queen",
		"address": "3 Darwin Street",
		"city": "London",
		"country": "England",
		"stars": 4,
		"hasSpa": true,
		"hasPool": false,
		"priceCategory": 3
	},
	{
		"id": 3,
		"name": "Kiwi land",
		"address": "4587 George St.",
		"city": "Auckland",
		"country": "New-Zealand",
		"stars": 3,
		"hasSpa": false,
		"hasPool": true,
		"priceCategory": 2
	}
]

const restaurants = [
	{
		"id": 1,
		"name": "Les trois Mousquetaires",
		"address": "22 av des Champs-Élysées",
		"city": "Paris",
		"country": "France",
		"stars": 4,
		"cuisine": "french",
		"priceCategory": 3
	},
	{
		"id": 2,
		"name": "The Fat Guy",
		"address": "47 Jackson Boulevard",
		"city": "New York",
		"country": "US",
		"stars": 5,
		"cusine": "burger",
		"priceCategory": 1
	},
	{
		"id": 3,
		"name": "Veggies",
		"address": "77 Avenir Street",
		"city": "Sydnet",
		"country": "Australia",
		"stars": 5,
		"cuisine": "vegan",
		"priceCategory": 2
	}
]

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