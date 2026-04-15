const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Define a listener for the "userAction" event
myEmitter.on('userAction', (userName, action) => {
    console.log(`[Listener 1] User ${userName} performed: ${action}`);
});

// Multiple listeners for a single event
myEmitter.on('userAction', () => {
    console.log(`[Listener 2] Log updated at ${new Date().toLocaleTimeString()}`);
});

// Triggering (emitting) the event with data
console.log('--- Triggering Event ---');
myEmitter.emit('userAction', 'Gopikrishnan', 'Login');

// Demonstrating asynchronous behavior using a timeout
setTimeout(() => {
    console.log('\n--- Triggering Delayed Event ---');
    myEmitter.emit('userAction', 'Student', 'Submit Lab');
}, 2000);