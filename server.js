const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vit_lab_db');

// --- SCHEMAS ---
const Note = mongoose.model('Note', new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}));

const Book = mongoose.model('Book', new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
}));

// --- QUESTION 1: NOTES CRUD ---

app.post('/notes', async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
});

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.put('/notes/:id', async (req, res) => {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// --- QUESTION 2: BOOK QUERIES ---

app.get('/books/search', async (req, res) => {
    const title = req.query.title;
    const results = await Book.find({ title: { $regex: title, $options: "i" } });
    res.json(results);
});

app.get('/books/category/:cat', async (req, res) => {
    const results = await Book.find({ category: req.params.cat });
    res.json(results);
});

app.get('/books/sort/:field', async (req, res) => {
    const field = req.params.field;
    const order = field === 'price' ? 1 : -1;
    const results = await Book.find().sort({ [field]: order });
    res.json(results);
});

app.get('/books/top', async (req, res) => {
    const results = await Book.find({ rating: { $gte: 4 } }).limit(5);
    res.json(results);
});

app.get('/books', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const results = await Book.find().skip((page - 1) * limit).limit(limit);
    res.json(results);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));