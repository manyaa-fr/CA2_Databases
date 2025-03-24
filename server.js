const express = require("express");
const book = require('./schema');
require ('dotenv').config();
const connectToDatabase = require('./db');
const dburl = process.env.DB_URI;

const app = express();
app.use(express.json());

app.post ('/book', async (req, res) => {
    try {
        const {title, author, genre, publishedYear, availableCopies, borrowedBy} = req.body;

    if (!title || !author || !genre || !publishedYear || !availableCopies || !borrowedBy){
        res.status(400).json("All field are required!!")
    }

    const newBook = new book({title, author, genre, publishedYear, availableCopies, borrowedBy});
    await newBook.save();
    res.status(200).json(newBook);
    } catch (error) {
        res.status(500).json(`internal server error ${error}`);
    }
})

app.get ('/book', async (req, res) => {
    try {
        const books = await book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(`internal server error ${error}`);
    }
})

app.put ('/book/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const updatedBook = await book.findByIdAndUpdate(id, updatedData, {new: true});

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json(`internal server error ${error}`);
    }
})

app.delete ('/book/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await book.findByIdAndDelete(id);
        res.status(200).json("Deleted Finally!!");
    } catch (error) {
        res.status(500).json(`internal server error ${error}`);
    }
})

port = 4000;
app.listen(port, async() => {
    try {
        await connectToDatabase(dburl);
        console.log(`Server is running at http://localhost:${port}`);
        console.log("Connected!!")
    } catch (error) {
        console.log(error)
    }
})