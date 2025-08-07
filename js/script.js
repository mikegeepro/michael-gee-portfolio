// Smooth scrolling for navigation anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Select all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each anchor link
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default jump behavior
            event.preventDefault();
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href');
            
            // Find the element with that ID
            const targetElement = document.querySelector(targetId);
            
            // Smooth scroll to the target element
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
});
