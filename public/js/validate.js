// This script enhances validation of the signup form on the client side

// Treat whitespace as blank for firstName & lastName
document.querySelectorAll('#firstName, #lastName')
    .forEach(element => {
        element.addEventListener('change', event => {
            if(event.target.value.trim() === '')
                event.target.setCustomValidity('This field must not be blank.');
            else
                event.target.setCustomValidity('');
        })
    });

// Check for email duplicates when email is changed
var email = document.getElementById('email');
if(email)
    email.addEventListener('change', event => {
        // Ignore events that have been re-fired
        if(event.ignore)
            return;

        // Don't bother wasting the server's time if it doesn't validate anyway
        if(email.validity.patternMismatch)
            return;

        // Hold the event so the event to report errors doesn't fire too early
        event.stopPropagation();

        // Prepare POST request to s end email to check
        var req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
            }),
        };

        // Query the server, and set validity as necessary
        fetch('duplicateEmail', req)
            .then(res => res.json())
            .then(duplicate => {
                email.setCustomValidity(duplicate ? 'Email address is already signed up for updates.' : '');
                // Mark the event to be ignore to prevent infinite loop and re-fire
                event.ignore = true;
                email.dispatchEvent(event);
            });
    });

// Force a validation check when any fields are changed
var signup = document.getElementById('signup');
if(signup)
    signup.addEventListener('change', event => {
        event.target.reportValidity();
    });
