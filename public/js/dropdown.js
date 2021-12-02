// This script progressively enhances dropdown menus to open on hover instead of on click
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
        }, 500);

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
        }, 750);

        event.stopPropagation();
    });
}
