document.addEventListener("DOMContentLoaded", () => {
    // PRELOADER
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 1000);
    });

    // CUSTOM CURSOR
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (window.innerWidth > 768) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding slight delay for outline
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 50);
        });

        // Add hover effect to links and buttons
        const hoverElements = document.querySelectorAll("a, button, .service-panel");
        hoverElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.style.width = "60px";
                cursorOutline.style.height = "60px";
                cursorOutline.style.backgroundColor = "rgba(194, 166, 188, 0.1)";
            });
            el.addEventListener("mouseleave", () => {
                cursorOutline.style.width = "40px";
                cursorOutline.style.height = "40px";
                cursorOutline.style.backgroundColor = "transparent";
            });
        });
    }

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // SWIPER INIT
    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper(".hero-swiper", {
            loop: true,
            effect: "fade",
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });

        // TESTIMONIAL SWIPER
        const testimonialSwiper = new Swiper(".testimonial-swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // FAQ ACCORDION
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove("active"));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // MOBILE MENU TOGGLE
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const mobileLinks = document.querySelectorAll(".nav-links a");
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
                mobileMenuBtn.style.color = "var(--text-main)";
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
                if (window.scrollY > 50) {
                    mobileMenuBtn.style.color = "var(--text-main)";
                } else {
                    mobileMenuBtn.style.color = "#fff";
                }
            }
        });
        
        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
                if (window.scrollY > 50) {
                    mobileMenuBtn.style.color = "var(--text-main)";
                } else {
                    mobileMenuBtn.style.color = "#fff";
                }
            });
        });
    }

    // Adjust mobile menu button color on scroll inside scroll listener
    window.addEventListener("scroll", () => {
        if (mobileMenuBtn && navLinks) {
            if (window.scrollY > 50) {
                if (!navLinks.classList.contains("active")) {
                    mobileMenuBtn.style.color = "var(--text-main)";
                }
            } else {
                if (!navLinks.classList.contains("active")) {
                    mobileMenuBtn.style.color = "#fff";
                }
            }
        }
    });
});
