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

const HotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: Number,
});

const Hotel = mongoose.model("Hotel", HotelSchema);

// Routes
router.get("/hotels", async (req, res) => {
	const hotels = await Hotel.find();
	res.json({
		message: "OK",
		data: hotels,
	});
});

router.get("/hotels/:id", async (req, res) => {
	const hotel = await Hotel.findById(req.params.id);
	res.json({
		message: "OK",
		data: hotel,
	});
});


router.use(express.json)

router.post('/hotels', (req, res) => {
    
    const newHotel = await Hotel.findById(req.body)
    hotels.push(newHotel)
    res.json({
        status: "hotel added",
        data: hotels,
    });
});

router.patch('/hotels', (req, res) => {
    
    const id = await Hotel.findById(req.params.id)
    const name = await Hotel.findById(req.params.name)
    Hotel.findByIdAndUpdate(id, { $set: { name: name } }, { new: true }).then(updatedId => {
        res.json({
            status: "name updated",
            data: hotel,
        });
      });
    
});

router.delete('/hotels/:id', (req, res, next) => {
    const hotelIndex = await Hotel.getIndexById(req.params.id, hotel);
    if (hotelIndex !== -1) {
      hotel.splice(hotelIndex, 1);
      res.json({
        status: "hotel deleted",
        data: hotel,
    });
    } else {
        res.json({
            status: "error",
            data: hotel,
        });
    }
  });


/*
router.get('/hotels', (req, res) => {
    res.json({
        status: "ok",
        data: hotels,
    });
});

router.get('/hotels/:id', (req, res) => {
    let num = req.params.id;
    res.json({
        status: "ok",
        data: hotels[num - 1],
    })
});

router.use(express.json)

router.post('/hotels', (req, res) => {
    const newHotel = req.body
    hotels.push(newHotel)
    res.json({
        status: "hotel added",
        data: hotels,
    });
});
*/
module.exports = router;