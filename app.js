// Port to serve the website on
const PORT = 3000;

// Import modules
const express = require('express');
const path    = require('path');

// Initialise express
const app = express();

// Serve anything found in the public dir statically by default
app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(PORT, (error) => {
    // Log any errors
    if(error) {
        console.error("Failed to start listening on port " + PORT);
        console.error(error);
        return;
    }

    // Log successful startup
    console.log("Listening on port " + PORT);
});
