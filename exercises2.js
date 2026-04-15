const express = require('express');
const app = express();

// 1. Application-level Middleware (Logger)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
    next(); // Move to the next layer
});

// 2. Custom Authentication Middleware (Route-level example)
const authGuard = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'secret-key') {
        next();
    } else {
        res.status(403).send('Access Denied: Invalid Token');
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

// Applying route-level middleware to /dashboard
app.get('/dashboard', authGuard, (req, res) => {
    res.send('Welcome to the Secure Dashboard');
});

app.listen(3001, () => console.log('Middleware server on port 3001'));