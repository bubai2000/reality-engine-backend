const express = require('express');
const router = express.Router();
const { main } = require('./services/palm_service.js');

router.get('/', function (req, res) {
    res.send("Welcome to reality engine!");
});
router.post('/', async function (req, res) {
    try {
        const response = await main(req.body.statement);
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        res.send('Some error occured!', e);
    }
});

//export this router to use in our index.js
module.exports = router;