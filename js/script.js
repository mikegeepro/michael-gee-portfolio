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

// Initialize Vanilla Tilt on project cards
document.addEventListener('DOMContentLoaded', function() {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });
});

// Project Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const caseStudyBtns = document.querySelectorAll('.btn-view-case-study');

    const modalTitle = document.getElementById('modal-project-title');
    const modalImage = document.getElementById('modal-project-image');
    const modalDescription = document.getElementById('modal-project-description');

    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get data from button
            const title = this.dataset.title;
            const imgSrc = this.dataset.imageSrc;
            const description = this.dataset.description;

            // Populate modal
            modalTitle.textContent = title;
            modalImage.src = imgSrc;
            modalDescription.textContent = description;

            // Show modal
            modal.style.display = 'block';
        });
    });

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact form');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Create a success message element
        const successMessage = document.createElement('p');
        successMessage.id = 'form-success-message';
        form.appendChild(successMessage);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = validateForm();
            
            if (isValid) {
                successMessage.textContent = 'Thank you for your message! I will get back to you shortly.';
                successMessage.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000); // Hide message after 5 seconds
            } else {
                 successMessage.style.display = 'none';
            }
        });

        function validateForm() {
            let valid = true;
            valid = validateField(nameInput, 'Name is required.') && valid;
            valid = validateField(emailInput, 'A valid email is required.') && valid;
            valid = validateField(subjectInput, 'Subject is required.') && valid;
            valid = validateField(messageInput, 'Message is required.') && valid;
            return valid;
        }

        function validateField(input, message) {
            const formGroup = input.parentElement;
            let errorMessage = formGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('p');
                errorMessage.className = 'error-message';
                formGroup.appendChild(errorMessage);
            }

            if (input.value.trim() === '') {
                showError(input, errorMessage, message);
                return false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showError(input, errorMessage, 'Please enter a valid email address.');
                return false;
            } else {
                clearError(input, errorMessage);
                return true;
            }
        }

        function showError(input, errorMessageElement, message) {
            input.classList.add('error');
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block';
        }

        function clearError(input, errorMessageElement) {
            input.classList.remove('error');

            if (errorMessageElement) {
                errorMessageElement.style.display = 'none';
            }
        }

        function isValidEmail(email) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        }
    }
});

// Enhanced Section Interactions and Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanilla Tilt on all card types
    VanillaTilt.init(document.querySelectorAll(".project-card, .service-card, .passion-card, .interest-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // Smooth reveal animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for reveal animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Enhanced testimonials scroll with pause on hover
    const testimonialsTrack = document.querySelector('.testimonials-track');
    if (testimonialsTrack) {
        testimonialsTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        testimonialsTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });

        // Touch support for mobile devices
        let isTouching = false;
        testimonialsTrack.addEventListener('touchstart', function() {
            isTouching = true;
            this.style.animationPlayState = 'paused';
        });

        testimonialsTrack.addEventListener('touchend', function() {
            isTouching = false;
            setTimeout(() => {
                if (!isTouching) {
                    this.style.animationPlayState = 'running';
                }
            }, 1000);
        });
    }

    // Add subtle hover effects to all cards
    const allCards = document.querySelectorAll('.project-card, .service-card, .passion-card, .interest-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
