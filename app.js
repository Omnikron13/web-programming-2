const PORT = 3000;

const express = require('express');

const app = express();

// Serve anything found in the public dir statically by default
app.use(express.static(__dirname + '/public'));

app.listen(PORT, (error) => {
    if(error) {
        console.error("Failed to start listening on port " + PORT);
        console.error(error);
        return;
    }
    console.log("Listening on port " + PORT);
});
