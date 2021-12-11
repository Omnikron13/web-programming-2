// This module handles processing the signup form, serving a response to the
// user informing them of success or failure.

// Import modules
const path = require('path');

// Exposed API
module.exports = {
    // Process POST requests for signup.html
    process: function(req, res) {
        // Log submission
        console.log('Processing POST request to signup.html:');

        // Remove the useless submit data from the POST
        delete req.body.submit;

        // Log details of submission
        console.log(req.body);

        // TODO: move success out to after data saved successfully
        sendResponseFile(req, res, 'success.html');
    }
};

// Sends out a full static HTML file as a response
function sendResponseFile(req, res, file) {
    res.sendFile(path.join(__dirname, 'responses', file));
}
