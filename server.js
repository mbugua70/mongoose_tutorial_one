const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require("./book.model");

const db =
  "mongodb+srv://myAtlasDBUser:123455@myatlasclusteredu.kmyoknr.mongodb.net/Bookmongoose?retryWrites=true&w=majority";

mongoose.connect(db);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

// app.post("/books", async (req, res) => {
//   try {
//     const newBook = new Book();
//     newBook.title = req.body.title;
//     newBook.author = req.body.author;
//     newBook.category = req.body.category;
//     const book = await newBook.save();
//     res.status(200).json({ success: true, msg: book });
//   } catch (err) {
//     res.status(500).json({ success: false, msg: `An Error occured ${err}` });
//   }
// });

// below shows the use of create method

app.post("/books", async (req, res) => {
  try {
    const result = await Book.create(req.body);
    res.status(200).json({ success: true, msg: result });
  } catch (err) {
    res.status(500).json({ success: false, msg: `An error occured ${err}` });
  }
});

// update

app.put("/books/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const newUpdate = await Book.findOneAndUpdate(
      { _id },
      { $set: { title: req.body.title } },
      { upsert: true }
    );

    res.status(204).json({ success: true, data: newUpdate });
    console.log(newUpdate);
  } catch (err) {
    res.status(500).json({ success: false, msg: `An Error Occurred ${err}` });
  }
});

// delete request

app.delete("/books/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedBook = await Book.findOneAndDelete({ _id });
    res
      .status(201)
      .json({ success: true, msg: `The book has been deleted successfully` });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: `An Error occured, Error: ${err}` });
  }
});


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening to port ${port}....`)
})
