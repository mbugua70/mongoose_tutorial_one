const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./book.model');

const db = 'mongodb+srv://myAtlasDBUser:123455@myatlasclusteredu.kmyoknr.mongodb.net/Bookmongoose?retryWrites=true&w=majority';
mongoose.connect(db);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening to port ${port}....`)
})
