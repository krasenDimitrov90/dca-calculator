const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

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
        app.listen(PORT, () => {
            console.log(`Server is running, access on http://localhost:${PORT}`);
        })
    })
    .catch(err => consolr.log({ err }));