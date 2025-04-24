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
    // Get the toggle button
    const toggleBtn = document.querySelector('.toggle-btn');
    const body = document.body;
    
    // Check for saved preference in localStorage
    const darkMode = localStorage.getItem('darkMode');
    
    // If dark mode was previously enabled, reapply it
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
    
    // Add click event to toggle button
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Check if dark mode is currently enabled
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Functions to handle dark mode
    function enableDarkMode() {
        body.classList.add('dark-mode');
        updateToggleButton('Light Mode');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        updateToggleButton('Dark Mode');
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Update toggle button text and recreate the box
    function updateToggleButton(text) {
        toggleBtn.textContent = text + ' ';
        
        // Recreate the box span since changing textContent removes all children
        const boxSpan = document.createElement('span');
        boxSpan.className = 'box';
        toggleBtn.appendChild(boxSpan);
    }
    
    // Initialize the toggle button text based on current mode
    if (body.classList.contains('dark-mode')) {
        updateToggleButton('Light Mode');
    } else {
        updateToggleButton('Dark Mode');
    }
});
