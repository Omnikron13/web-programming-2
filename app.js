// Port to serve the website on
const PORT = 3000;

// Import modules
const express = require('express');
const path    = require('path');
const ejs     = require('ejs');
const fs      = require('fs');

const signup  = require('./signup');

// Initialise express
const app = express();

app.use(express.urlencoded({extended:true}));

// Render with EJS
app.set('view engine', 'ejs');

// Use 'templates' instead of 'views' for the templates dir
app.set('views', 'templates');

// Serve anything found in the public dir statically by default
app.use(express.static(path.join(__dirname, 'public')));

// Serve any HTML file that isn't static as an EJS template
app.get('/*.html', (req, res) => {
    // Name of the page (without extention)
    var page = req.params[0];

    // Where to find a JSON file holding an array of page-specific CSS/JS file names
    var cssFile = path.join(__dirname, 'templates', 'data', page + '_css.json');
    var scriptsFile = path.join(__dirname, 'templates', 'data', page + '_scripts.json');

    // Render the template
    res.render('main.ejs', {
        page: page,
        css: fs.existsSync(cssFile) ? JSON.parse(fs.readFileSync(cssFile)) : [],
        scripts: fs.existsSync(scriptsFile) ? JSON.parse(fs.readFileSync(scriptsFile)) : [],
    });
});

// Process signup.html more dynamically
app.post('/signup.html', (req, res) => {
    signup.process(req, res);
});

// Return list of email addresses already in the DB file, served as salted
// hashes to preserve privacy.
app.get('/emailhashes', (req, res) => {
    res.send(signup.getHashes());
});

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
