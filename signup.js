// This module handles processing the signup form, serving a response to the
// user informing them of success or failure.

// Import modules
const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

// Actual constants
// 'Database' file
const DB_FILE = 'database.json';
// Email regex from regular-expressions.info
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 128 bit salt
const SALT = 'PTK3syLmZx45KK7IIUHZbQ';

// Exposed API
module.exports = {
    // Process POST requests for signup.html
    process: function(req, res) {
        // Log submission
        console.debug('Processing POST request to signup.html:');

        // Log details of submission
        console.debug(req.body);

        // Save to the DB
        saveData(req, res, req.body);
    },

    // Return list of email addresses already in the DB file, served as salted
    // hashes to preserve privacy.
    getHashes: function() {
        var db = JSON.parse(fs.readFileSync(DB_FILE));
        return db.map(entry => sha1(entry.email + SALT));
    },
};

// Sends out a full static HTML file as a response
function sendResponseFile(req, res, file) {
    res.sendFile(path.join(__dirname, 'responses', file));
}

// Adds the new user's details to the DB file
function saveData(req, res, data) {
    // TODO: server side validation

    // Clean data for saving
    delete data.submit;
    data.email = data.email.toLowerCase();
    data.firstName = data.firstName.trim();
    data.lastName = data.lastName.trim();
    data.comments = data.comments.trim();

    // Validate the data (you can never trust the client)
    if(!validate(data)) {
        sendResponseFile(req, res, 'invalid.html');
        return;
    }

    // Create empty DB file if it doesn't exist
    if(!fs.existsSync(DB_FILE))
        fs.writeFileSync(DB_FILE, '[]');

    // Read the DB file and convert to JSON
    var db = JSON.parse(fs.readFileSync(DB_FILE));

    // Check if email is alreayd in DB, and send a 'failure' response if it is
    if(db.find(element => element.email == data.email)) {
        sendResponseFile(req, res, 'duplicate.html');
        return;
    }

    // Append the new data
    db.push(data);

    // Write the DB back to disk
    fs.writeFileSync(DB_FILE, JSON.stringify(db));

    // Send the success response
    sendResponseFile(req, res, 'success.html');
}

// Validate form input (trusting the client is generally unwise).
// Note that it is _not_ sanitised here.
function validate(data) {
    // Check if names were just whitespace (attempts to bypass required)
    if(!data.firstName || !data.lastName)
        return false;

    // Sanity check the email address (trying to truly validate email addresses is usually unwise)
    if(!EMAIL_REGEX.test(data.email))
        return false;

    return true;
}

// Returns a UTF-8 encoded SHA-1 hash of a given string
const sha1hash = crypto.createHash('sha1');
function sha1(data) {
    return crypto.createHash('sha1').update(data).digest('utf8');
    sha1hash.update(data);
    return sha1hash.digest('utf8');
}
