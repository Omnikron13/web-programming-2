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

// Process POST input from form submission and JS fetch
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Render with EJS
app.set('view engine', 'ejs');

// Use 'templates' instead of 'views' for the templates dir
app.set('views', 'templates');

// Serve anything found in the public dir statically by default
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to the index via the primary route
app.get('/', (req, res) => res.redirect('/index.html'));

// Serve any HTML file that isn't static as an EJS template
app.get('/*.html', (req, res) => {
    // Name of the page (without extention)
    var page = req.params[0];

    // Load common resources lists
    var cssFiles = getResources('common', 'css');
    var scriptFiles = getResources('common', 'scripts');

    // Load page specific resources lists
    cssFiles = cssFiles.concat(getResources(page, 'css'));
    scriptFiles = scriptFiles.concat(getResources(page, 'scripts'));

    // Render the template
    res.render('main.ejs', {
        page: page,
        css: cssFiles,
        scripts: scriptFiles,
    });
});

// Process signup.html more dynamically
app.post('/signup.html', (req, res) => {
    signup.process(req, res);
});

// Check if an email is already in the database
app.post('/duplicateEmail', (req, res) => {
    console.debug('duplicateEmail:', req.body);
    res.send(signup.duplicateEmail(req.body.email));
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

// Load an array of resource file names to be inserted into the templates
function getResources(page, type) {
    // Where to find a JSON file holding an array of page-specific CSS/JS file names
    var dataFile = path.join(__dirname, 'templates', 'data', page + '_' + type + '.json');

    // Read & return CSS/JS file lists
    return fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
}
