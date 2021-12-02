// This script progressively enhances dropdown menus to open on hover instead of on click

// Delays to opening/closing in ms to make the menus feel less jittery
const MOUSE_ENTER_DELAY = 500;
const MOUSE_LEAVE_DELAY = 750;

let dropdowns = document.querySelectorAll("details.dropdown");

for(n = 0; n < dropdowns.length; n++) {
    // Open menu on mouse over
    dropdowns[n].addEventListener("mouseenter", event => {
        // Track mouse over state
        event.target.isMouseOver = true;

        // Delay menu closing until the pointer is over the menu for a short time
        setTimeout(() => {
            if(event.target.isMouseOver)
                event.target.setAttribute("open", "");
        }, MOUSE_ENTER_DELAY);

        event.stopPropagation();
    });

    // Close menu on mouse leave
    dropdowns[n].addEventListener("mouseleave", event => {
        // Track mouse over state
        event.target.isMouseOver = false;

        // Delay menu closing until the pointer is out of the menu for a short time
        setTimeout(() => {
            if(!event.target.isMouseOver)
                event.target.removeAttribute("open");
        }, MOUSE_LEAVE_DELAY);

        event.stopPropagation();
    });
}
