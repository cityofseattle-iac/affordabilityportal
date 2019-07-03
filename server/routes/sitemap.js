const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {

    console.log("Here come the robots");

    res.status(200)
        .sendFile(path.resolve('sitemap.xml'));
});

module.exports = router;