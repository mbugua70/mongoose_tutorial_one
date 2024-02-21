const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require("./book.model");

const db =
  "mongodb+srv://myAtlasDBUser:123455@myatlasclusteredu.kmyoknr.mongodb.net/Bookmongoose?retryWrites=true&w=majority";

mongoose.connect(db);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello John Doe</h1>");
});

app.get("/books", async (req, res) => {
  try {
    const result = await Book.find({}).exec();
    res.status(200).json({ success: true, msg: result });
  } catch (err) {
    res.status(500).json({ success: false, msg: `An Error occurred ${err}` });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findOne({ _id: id }).exec();
    res.status(200).json({ success: true, msg: result });
  } catch (err) {
    res.status(500).json({ success: false, msg: `An Error occured ${err}` });
  }
});






const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening to port ${port}....`)
})
