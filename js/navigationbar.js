// Menu bar
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const toggleMenuBtn = document.getElementById('toggle-menu-btn');
    const navbar = document.getElementById('navbar');
    const body = document.body;
    const menuIcon = toggleMenuBtn ? toggleMenuBtn.querySelector('img') : null;
    
    // Check if elements exist
    if (!toggleMenuBtn || !navbar) {
        console.error('Required elements not found');
        return;
    }
    
    // Function to toggle menu state
    function toggleMenu() {
        navbar.classList.toggle('open');
        body.classList.toggle('menu-open');
        toggleMenuBtn.classList.toggle('active');
        
        // Smooth rotation animation for menu icon
        if (menuIcon) {
            if (navbar.classList.contains('open')) {
                // Rotate icon smoothly when menu opens
                menuIcon.style.transform = "rotate(90deg)";
            } else {
                // Rotate back smoothly when menu closes
                menuIcon.style.transform = "rotate(0deg)";
            }
        }
    }
    
    // Toggle menu when button is clicked
    toggleMenuBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        toggleMenu();
    });
    
    // Optional: Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navbar.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
    
    // Optional: Close menu when clicking outside navbar
    document.addEventListener('click', function(e) {
        if (navbar.classList.contains('open') && 
            !navbar.contains(e.target) && 
            e.target !== toggleMenuBtn && 
            !toggleMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // If window is resized to desktop size and menu is open, close it
        if (window.innerWidth > 768 && navbar.classList.contains('open')) {
            toggleMenu();
        }
    });
});