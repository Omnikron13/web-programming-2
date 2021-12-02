// This script progressively enhances dropdown menus to open on hover instead of on click
let dropdowns = document.querySelectorAll("details.dropdown");

for(n = 0; n < dropdowns.length; n++) {
    // Open menu on mouse over
    dropdowns[n].addEventListener("mouseenter", event => {
        event.target.setAttribute("open", "");
        event.stopPropagation();
    });

    // Close menu on mouse leave
    dropdowns[n].addEventListener("mouseleave", event => {
        event.target.removeAttribute("open");
        event.stopPropagation();
    });
}
