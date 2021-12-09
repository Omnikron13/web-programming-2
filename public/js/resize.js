// This script provides progressive enhancements tuning the UX for the specific
// screen size when resizing and first loading pages.

// The screen width above which the screen is considered 'large' for the
// enhancements. 'Small' screens are this value and below, inclusive.
const BREAKPOINT = 500;

// Track the previous screen screen size last this ran, so the resize event
// can be ignored if it hasn't actually passed the breakpoint.
let previousWidth = null;

// Handler which delegates to functions for either small-specific or
// large-specific enhancements, notes the new screen size for future reference,
// and stops propagation.
let handleResize = function(event) {
    // Performance enhancements for the relevant screen size
    if(window.innerWidth <= BREAKPOINT) {
        handleSmallScreen(event);
    }
    else {
        handleLargeScreen(event);
    }

    // Note the current width for next time the handler is triggered
    previousWidth = window.innerWidth;

    event.stopPropagation();
}

// Enhancements for mobile devices and other tiny screens
let handleSmallScreen = function(event) {
    // Do nothing if the window was already small
    if(previousWidth !== null && previousWidth <= BREAKPOINT)
        return;

    // Close the navigation container so it isn't in the way
    document.getElementById("nav-container").removeAttribute("open");
}

// Enhancements for desktops/tablet/landscape and other larger screens
let handleLargeScreen = function(event) {
    // Do nothing if the window was already large
    if(previousWidth > BREAKPOINT)
        return;

    // Open the navigation container, as the control to do so will be hidden
    document.getElementById("nav-container").setAttribute("open", "");
}

// Perform size relevant enhancements both on resizing and on initial page load
window.addEventListener('resize', handleResize, {capture: true});
window.addEventListener('DOMContentLoaded', handleResize, {capture: true});
