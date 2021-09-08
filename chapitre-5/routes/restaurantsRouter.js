const express = require('express');
const router = express.Router();

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

const RestaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: Number,
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

// Routes
router.get("/restaurants", async (req, res) => {
	const restaurants = await Restaurant.find();
	res.json({
		message: "OK",
		data: restaurants,
	});
});

router.get("/restaurants/:id", async (req, res) => {
	const restaurant = await Restaurant.findById(req.params.id);
	res.json({
		message: "OK",
		data: restaurant,
	});
});


router.use(express.json)

router.post('/restaurants', (req, res) => {
    
    const newRestaurant = await Restaurant.findById(req.body)
    restaurants.push(newRestaurant)
    res.json({
        status: "restaurant added",
        data: restaurants,
    });
});

router.patch('/restaurants', (req, res) => {
    
    const restaurant = await Restaurant.findById(req.params.id)
    const name = await Restaurant.findById(req.params.name)
    Restaurant.findByIdAndUpdate(id, { $set: { name: name } }, { new: true }).then(updatedRestaurant => {
        res.json({
            status: "name updated",
            data: restaurant,
        });
      });
    
});

router.delete('/restaurants/:id', (req, res, next) => {
    const restaurantIndex = await Restaurant.getIndexById(req.params.id, restaurant);
    if (restaurantIndex !== -1) {
        restaurant.splice(restaurantIndex, 1);
      res.json({
        status: "restaurant deleted",
        data: restaurant,
    });
    } else {
        res.json({
            status: "error",
            data: restaurant,
        });
    }
  });

/*
router.get('/restaurants', (req, res) => {
    res.json({
        status: "ok",
        data: restaurants,
    });
});

router.get('/restaurants/:id', (req, res) => {
    let num = req.params.id;
    res.json({
        status: "ok",
        data: restaurants[num - 1],
    })
});


router.use(express.json)



router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body
    hotels.push(newRestaurant)
    res.json({
        status: "restaurant added",
        data: restaurants,
    });
});
*/
module.exports = router;