const express = require('express');
const router = express.Router();


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

module.exports = router;