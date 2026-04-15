const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 }
];

// GET: Fetch all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST: Add a new product
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT: Update a product by ID
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { id, ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).send("Product not found");
    }
});

// DELETE: Remove a product
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.send(`Product ${id} deleted.`);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));