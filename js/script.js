// Main initialization function - consolidates all event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
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
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Resume modal functionality
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeModal = document.getElementById('close-resume-modal');

    if (resumeBtn && resumeModal && closeResumeModal) {
        // Open resume modal
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resumeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Close resume modal
        closeResumeModal.addEventListener('click', function() {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside of it
        resumeModal.addEventListener('click', function(e) {
            if (e.target === resumeModal) {
                resumeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && resumeModal.style.display === 'block') {
                resumeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const caseStudyBtns = document.querySelectorAll('.btn-view-case-study');
    const interestImages = document.querySelectorAll('.interest-card img[data-image-src]');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (modal && closeBtn) {
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

        // Interest Image Modal Logic
        interestImages.forEach(img => {
            img.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Get data from image
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

        // Testimonial Card Modal Logic
        testimonialCards.forEach(card => {
            card.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Get data from testimonial card data attributes
                const name = this.dataset.name;
                const title = this.dataset.title;
                const company = this.dataset.company;
                const testimonialText = this.dataset.testimonial;
                const headshotSrc = this.dataset.headshot;
                
                // Create full testimonial content for modal
                const fullContent = `"${testimonialText}"\n\n- ${name}, ${title} at ${company}`;

                // Populate modal
                modalTitle.textContent = name;
                modalImage.src = headshotSrc;
                modalDescription.textContent = fullContent;

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
    }

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('form-success-message');

        if (nameInput && emailInput && subjectInput && messageInput && submitBtn) {
            // Real-time validation
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this, getErrorMessage(this));
                });

                input.addEventListener('input', function() {
                    clearError(this, this.parentElement.querySelector('.error-message'));
                });
            });

            // Form submission
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                if (validateForm()) {
                    // Show loading state
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;

                    // Prepare template parameters
                    const templateParams = {
                        from_name: nameInput.value,
                        from_email: emailInput.value,
                        subject: subjectInput.value,
                        message: messageInput.value,
                        to_name: 'Michael Gee'
                    };

                    // Send email using EmailJS
                    emailjs.send('service_g23i0xu', 'template_rznp6na', templateParams)
                        .then(function(response) {
                            successMessage.textContent = 'Thank you for your message! I will get back to you shortly.';
                            successMessage.style.display = 'block';
                            successMessage.className = 'success-message';
                            contactForm.reset();
                            
                            // Hide success message after 5 seconds
                            setTimeout(() => {
                                successMessage.style.display = 'none';
                            }, 5000);
                        })
                        .catch(function(error) {
                            successMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
                            successMessage.style.display = 'block';
                            successMessage.className = 'error-message';
                        })
                        .finally(function() {
                            // Reset button state
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        });
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

            function getErrorMessage(input) {
                switch(input.id) {
                    case 'name': return 'Name is required.';
                    case 'email': return 'A valid email is required.';
                    case 'subject': return 'Subject is required.';
                    case 'message': return 'Message is required.';
                    default: return 'This field is required.';
                }
            }
        }
    }

    // Initialize Vanilla Tilt on all card types
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card, .service-card, .passion-card, .interest-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.5
        });
    }

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

    // Enhanced endorsements scroll with pause on hover
    const endorsementsTrack = document.querySelector('.endorsements-track');
    if (endorsementsTrack) {
        endorsementsTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        endorsementsTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });

        // Touch support for mobile devices
        let isTouching = false;
        endorsementsTrack.addEventListener('touchstart', function() {
            isTouching = true;
            this.style.animationPlayState = 'paused';
        });

        endorsementsTrack.addEventListener('touchend', function() {
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
