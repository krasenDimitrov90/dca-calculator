const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const functions = require('firebase-functions');

const { startBtcSchedule } = require('./scheduler');

// https://dca-calculator-kras-2-b13afe117966.herokuapp.com/ | https://git.heroku.com/dca-calculator-kras-2.git

require('dotenv').config();
// const MONGO_URL = functions.config().mongo.url;
const MONGO_URL = process.env.MONGO_URL;

const routes = require('./routes/routes');
const PORT = 8080;

const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(routes);


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong!';
    res.status(status).json({ message: message });
})

// startBtcSchedule();

// mongoose.connect(MONGO_URL)
//     .then(result => {
//         app.listen(process.env.PORT || PORT, '192.168.100.6', () => {
//             console.log(`Server is running, access on http://192.168.100.6:${PORT}`);
//         })
//     })
//     .catch(err => {
//         console.log({ err })
//     });

mongoose.connect(MONGO_URL)
    .then(result => {
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is running, access on http://192.168.100.6:${PORT}`);
        })
    })
    .catch(err => {
        console.log({ err })
    });

module.exports.api = functions.https.onRequest(app);