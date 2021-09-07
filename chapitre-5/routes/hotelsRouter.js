const express = require('express');
const router = express.Router();

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

module.exports = router;