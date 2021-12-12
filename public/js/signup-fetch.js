// This script progressively enhances the signup form by sending the data
// using fetch() instead of submitting traditionally, and updating the DOM
// based on a JSON response. This could potentially be more responsive.

// Trigger when the submit button is clicked
document.getElementById('submit').addEventListener('click', event => {
    // Disable normal submission
    event.preventDefault();

    // Try to get the form element to check validity, and possibly submit
    var signup = document.getElementById('signup');

    // Exit if the form can't be found
    if(!signup)
        return;

    // Check inpout validity
    if(!document.getElementById('signup').reportValidity())
        return;

    // The request that will be sent to the server
    var req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName : document.getElementById('firstName').value,
            lastName  : document.getElementById('lastName').value,
            email     : document.getElementById('email').value,
            comments  : document.getElementById('comments').value,
        }),
    };

    // Send the form data to the server
    fetch('signup.html', req)
        // Unpack the actual response data from the full response
        .then(response => response.json())
        // Process it once it is unpacked
        .then(json => {
            // Debug log of the response data
            console.debug('Response:', json);

            // Tell the user what happened
            insertResponse(json);
        });

    // Disable the form
    document.querySelectorAll('input, textarea').forEach(element => {
        element.disabled = true;
    });

    // Change submit button text
    document.getElementById('submit').value = 'Sending...';
});

// Display details of the response to the user, as a success/failure heading,
// and a short description.
// TODO: perhaps rework to be sent a rendered template in the JSON
function insertResponse(response) {
    // Remove form now a response has been received (crude, but not worth changing
    // vs. upgrading to templates probably)
    document.getElementById('signup').remove();

    // Get the main element to insert the response
    var main = document.getElementById('main');

    // Insert the response header and message
    var h2 = document.createElement('h1');
    h2.appendChild(document.createTextNode(response.header));

    var p = document.createElement('p');
    p.appendChild(document.createTextNode(response.message));

    main.appendChild(h2);
    main.appendChild(p);
}
