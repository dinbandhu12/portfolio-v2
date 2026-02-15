// Loading screen
// Add this to the beginning of your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    
    // Check if elements exist
    if (!loadingScreen || !loadingBar) {
        console.error('Loading screen elements not found');
        return;
    }
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Start loading animation
    setTimeout(() => {
        loadingBar.style.width = '100%';
    }, 50); // Small delay to ensure CSS transition works
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Remove loading screen from DOM after animation completes
        setTimeout(() => {
            loadingScreen.parentNode.removeChild(loadingScreen);
        }, 500);
    }, 2000);
    
    // Your existing JavaScript code continues here...
    // ...

});


// Dark Mode Toggle JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all toggle buttons (there might be multiple on different pages)
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const body = document.body;

    // If no toggle button found, exit
    if (toggleBtns.length === 0) {
        return;
    }

    // Check for saved preference in localStorage
    const darkMode = localStorage.getItem('darkMode');

    // If dark mode was previously enabled, reapply it
    if (darkMode === 'enabled') {
        enableDarkMode();
    }

    // Add click event to all toggle buttons
    toggleBtns.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Check if dark mode is currently enabled
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    });

    // Functions to handle dark mode
    function enableDarkMode() {
        body.classList.add('dark-mode');
        updateAllToggleButtons('Light Mode');
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        updateAllToggleButtons('Dark Mode');
        localStorage.setItem('darkMode', 'disabled');
    }

    // Update all toggle buttons text and recreate the box
    function updateAllToggleButtons(text) {
        toggleBtns.forEach(toggleBtn => {
            toggleBtn.textContent = text + ' ';

            // Recreate the box span since changing textContent removes all children
            const boxSpan = document.createElement('span');
            boxSpan.className = 'box';
            toggleBtn.appendChild(boxSpan);
        });
    }

    // Initialize the toggle button text based on current mode
    if (body.classList.contains('dark-mode')) {
        updateAllToggleButtons('Light Mode');
    } else {
        updateAllToggleButtons('Dark Mode');
    }
});

// Enhanced Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Ensure smooth scrolling is enabled
    if ('scrollBehavior' in document.documentElement.style) {
        // Modern browsers support CSS scroll-behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    } else {
        // Fallback for older browsers using JavaScript
        const smoothScrollTo = function(element, target, duration) {
            target = Math.round(target);
            duration = Math.round(duration);
            if (duration < 0) {
                return Promise.reject("bad duration");
            }
            if (duration === 0) {
                element.scrollTop = target;
                return Promise.resolve();
            }

            const start_time = Date.now();
            const start_element_y = element.scrollTop;
            const target_element_y = target;
            const distance = target_element_y - start_element_y;
            const easing_function = function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };

            return new Promise(function(resolve, reject) {
                let previous_top = element.scrollTop;
                let ticking = false;

                const scroll_frame = function() {
                    if (ticking) {
                        return;
                    }
                    ticking = true;

                    const now = Date.now();
                    const point = Math.min(1, ((now - start_time) / duration));
                    const frame_y = start_element_y + (distance * easing_function(point));
                    element.scrollTop = frame_y;

                    if (point === 1) {
                        resolve();
                        return;
                    }

                    if (element.scrollTop === previous_top && element.scrollTop !== frame_y) {
                        resolve();
                        return;
                    }
                    previous_top = element.scrollTop;

                    ticking = false;
                    requestAnimationFrame(scroll_frame);
                };

                requestAnimationFrame(scroll_frame);
            });
        };

        // Override anchor link behavior for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    smoothScrollTo(document.documentElement, target.offsetTop - 80, 800);
                }
            });
        });
    }
});