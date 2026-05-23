// ============================================
// HERO CAROUSEL
// ============================================

let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.carousel-dots .dot');

function showHeroSlide(n) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[n].classList.add('active');
    heroDots[n].classList.add('active');
}

function changeHeroSlide(direction) {
    currentHeroSlide += direction;
    if (currentHeroSlide >= heroSlides.length) {
        currentHeroSlide = 0;
    }
    if (currentHeroSlide < 0) {
        currentHeroSlide = heroSlides.length - 1;
    }
    showHeroSlide(currentHeroSlide);
}

function goToHeroSlide(n) {
    currentHeroSlide = n;
    showHeroSlide(currentHeroSlide);
}

// Auto-advance hero carousel every 5 seconds
if (heroSlides.length > 0) {
    setInterval(() => {
        changeHeroSlide(1);
    }, 5000);
}

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonials .carousel-dots .dot');

function showTestimonial(n) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[n].classList.add('active');
    testimonialDots[n].classList.add('active');
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    }
    if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    }
    showTestimonial(currentTestimonial);
}

function goToTestimonial(n) {
    currentTestimonial = n;
    showTestimonial(currentTestimonial);
}

// Initialize testimonials
if (testimonialCards.length > 0) {
    showTestimonial(0);
}

// ============================================
// MENU TOGGLE
// ============================================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 100 ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (Math.floor(current) > 0 ? '+' : '0');
        }
    }, 30);
}

// Trigger counter animation on scroll
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

function checkStatsInView() {
    if (statsSection && !statsAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            statsAnimated = true;
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
        }
    }
}

window.addEventListener('scroll', checkStatsInView);

// ============================================
// GALLERY FILTER
// ============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    });
});

// Initialize gallery
galleryItems.forEach(item => item.classList.add('show'));

// ============================================
// FAQ ACCORDION
// ============================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// ============================================
// FORM SUBMISSION
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formMessage = document.getElementById('form-message');
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    
    // Validation
    if (!name || !email || !phone || !service || !date) {
        showMessage('Please fill in all required fields', 'error', formMessage);
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error', formMessage);
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
        showMessage('Please enter a valid phone number', 'error', formMessage);
        return;
    }
    
    // Success
    showMessage('Appointment booked successfully! We will contact you soon.', 'success', formMessage);
    form.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

function showMessage(message, type, element) {
    element.textContent = message;
    element.className = `form-message show ${type}`;
}

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================

function handleNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        alert('Thank you for subscribing! Check your email for special offers.');
        event.target.reset();
    }
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .stat-card, .gallery-item, .section-header, .faq-item, .contact-form-section, .contact-image-section').forEach(el => {
    el.classList.add('fade-up-element');
    observer.observe(el);
});

