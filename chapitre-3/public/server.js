const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PORT = 8000;
const upload = multer({dest: 'public/uploads'});
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'image is showing',
    });
});
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});