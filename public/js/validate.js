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
        // TODO: return early if it doesn't validate anyway

        var req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
            }),
        };

        fetch('duplicateEmail', req)
            .then(res => res.json())
            .then(duplicate => {
                event.target.setCustomValidity(duplicate ? 'Email address is already signed up for updates.' : '')
            });
    });

// Force a validation check when any fields are changed
document.getElementById('signup').addEventListener('change', event => {
    event.target.reportValidity();
});
