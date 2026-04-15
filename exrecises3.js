const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vit_lab_db')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection failed", err));

// Define Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    age: Number
});

// Create Model
const User = mongoose.model('User', userSchema);

// CREATE: Async/Await implementation
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ: Retrieve all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// UPDATE: Find by ID and Update
app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

// DELETE: Delete by ID
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
});

app.listen(3002, () => console.log('Database server on port 3002'));