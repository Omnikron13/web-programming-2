// This script enhances validation of the signup form on the client side

// 128 bit salt
const SALT = 'PTK3syLmZx45KK7IIUHZbQ';

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


// Check if email address is already in DB file
// TODO: rework this so the client sends a hash to the server and gets a response, for scaling
const email = document.getElementById('email');
// Placeholder for hash list
let invalidEmails = [];
// Download hash list
fetch('emailhashes')
    .then(res => res.json())
    .then(hashes => invalidEmails = hashes);
// Needed to encode/decode strings to ArrayBuffers for the hashing function
const encoder = new TextEncoder();
const decoder = new TextDecoder();
// Check validity whenever email is changed
email.addEventListener('change', event => {
    // Hash the entered email
    crypto.subtle.digest('SHA-1', encoder.encode(email.value.toLowerCase() + SALT))
        // TODO: cleaner way of handling the async
        .then(buffer => {
            // Mark entered email as valid or invalid
            if(invalidEmails.includes(decoder.decode(buffer)))
                email.setCustomValidity('Email address is already signed up for updates.');
            else
                email.setCustomValidity('');
        });
});
