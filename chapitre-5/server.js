const express = require("express");
const app = express();
const PORT = 3000;
const hotelsRouter = require('./routes/hotelsRouter')
const restaurantsRouter = require('./routes/restaurantsRouter')
const hotels = require('./hotels.json')
const restaurants = require('/restaurants.json')

app.use(function(req, res, next) {
    console.log("Je fais un console.log à chaque requête", new Date().toDateString());
    next(); 
});

app.use("/restaurants", restaurantsRouter);
app.use("/hotels", hotelsRouter);

app.listen(PORT, () => {
	console.log("Server listening...");
});