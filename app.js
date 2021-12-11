const PORT = 3000;

const express = require('express');

const app = express();

app.listen(PORT, (error) => {
    if(error) {
        console.error("Failed to start listening on port " + PORT);
        console.error(error);
        return;
    }
    console.log("Listening on port " + PORT);
});
