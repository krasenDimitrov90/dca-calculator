const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// https://dca-calculator-kras-2-b13afe117966.herokuapp.com/ | https://git.heroku.com/dca-calculator-kras-2.git

require('dotenv').config();
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

mongoose.connect(MONGO_URL)
    .then(result => {
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is running, access on http://localhost:${PORT}`);
        })
    })
    .catch(err => console.log({ err }));