// Import the built-in http module
const http = require('http');

const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Set response header
    res.setHeader('Content-Type', 'text/html');
    
    // Write the response body
    res.write('<h1>Welcome to my Node.js Server</h1>');
    res.write('<p>Request received successfully!</p>');
    
    // Signal that the response is complete
    res.end();
});

// Start the server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server.');
});