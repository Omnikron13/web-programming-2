// This script enhances validation of the signup form on the client side

// Trigger validation when submit is clicked
document.getElementById('submit').addEventListener('click', event => {
    // Trim whitespace from names (attempt to bypass required)
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    firstName.value = firstName.value.trim();
    lastName.value = lastName.value.trim();
});
