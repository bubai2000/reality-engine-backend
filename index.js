const express = require('express');
const app = express();
const routes = require('./routes.js');
const cors = require('cors');
const { config } = require('dotenv');
const PORT = process.env.PORT || 3000;

config({
    path: 'environments/.env'
})

app.use(cors());
app.use(express.json(), routes);

app.listen(PORT);