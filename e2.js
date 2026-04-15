const fs = require('fs');
const fileName = 'lab_test.txt';

// 1. Create/Write a file
fs.writeFile(fileName, 'Hello, VIT-AP!', (err) => {
    if (err) return console.error('Error writing file:', err);
    console.log('File created successfully.');

    // 2. Append data to the file
    fs.appendFile(fileName, '\nThis is Exercise 2 content.', (err) => {
        if (err) return console.error('Error appending:', err);
        console.log('Data appended.');

        // 3. Read the file
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) return console.error('Error reading:', err);
            console.log('File Content:\n' + data);

            // 4. Delete the file
            fs.unlink(fileName, (err) => {
                if (err) return console.error('Error deleting:', err);
                console.log('File deleted successfully. Cleanup complete.');
            });
        });
    });
});