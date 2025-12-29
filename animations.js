/* =========================================
   KITE FLORIPA - Ultra Premium Animations
   Cinematographic GSAP Effects v2.0
   Apple-style scroll animations
   ========================================= */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// =========================================
// PRELOADER / LOADING SCREEN
// =========================================

const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    // Minimum display time for loader
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
        }
        // Start hero animations after loader
        initHeroAnimations();
    }, 1500);
});

// =========================================
// CUSTOM CURSOR (Desktop only)
// =========================================

if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1
        });
    });

    // Smooth cursor following
    gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        gsap.set(cursor, {
            x: cursorX,
            y: cursorY
        });
    });

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .pricing-card, .experience-card');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// =========================================
// NAVIGATION
// =========================================

const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Scroll-based nav styling
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: nav }
});

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// =========================================
// HERO SECTION - Cinematic Entrance
// =========================================

function initHeroAnimations() {
    const heroTl = gsap.timeline({
        defaults: {
            ease: 'power4.out',
            duration: 1.2
        }
    });

    // Ken Burns effect on hero image
    gsap.to('.hero-image', {
        scale: 1,
        duration: 2,
        ease: 'power2.out'
    });

    // Main hero sequence
    heroTl
        // Tag line
        .to('.hero-tag', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, 0.3)

        // Title lines with stagger - dramatic reveal
        .to('.hero-title-line', {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.1,
            ease: 'power4.out'
        }, 0.5)

        // Subtitle
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1
        }, 1)

        // CTAs
        .to('.hero-cta-wrapper', {
            opacity: 1,
            y: 0,
            duration: 1
        }, 1.2)

        // Scroll indicator
        .to('.hero-scroll', {
            opacity: 1,
            duration: 0.8
        }, 1.5);
}

// Hero parallax on scroll
gsap.to('.hero-image', {
    yPercent: 40,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Hero content fade out on scroll
gsap.to('.hero-content', {
    opacity: 0,
    y: -100,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'center center',
        end: 'bottom top',
        scrub: 1
    }
});

// =========================================
// EXPERIENCE SECTION - Editorial Reveals
// =========================================

// Section intro - dramatic entrance
const expIntroTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.experience-intro',
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse'
    }
});

expIntroTl
    .from('.experience-intro .section-tag', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.experience-intro .title-line', {
        opacity: 0,
        y: 80,
        rotateX: -30,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out'
    }, '-=0.4')
    .from('.experience-intro .section-description', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');

// Experience cards - staggered 3D entrance
gsap.from('.experience-card', {
    scrollTrigger: {
        trigger: '.experience-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 100,
    rotateX: 10,
    scale: 0.95,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power4.out',
    immediateRender: false
});

// Images reveal with scale
gsap.utils.toArray('.experience-card-image img').forEach(img => {
    gsap.fromTo(img,
        { scale: 1.3, opacity: 0.7 },
        {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Parallax on scroll
    gsap.to(img, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// Stats counter animation with enhanced effect
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.count);

    gsap.fromTo(stat,
        { scale: 0.5, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(stat, {
                        innerText: target,
                        duration: 2.5,
                        snap: { innerText: 1 },
                        ease: 'power2.out'
                    });
                },
                once: true
            }
        }
    );
});

// Stats section glow effect
gsap.to('.experience-stats', {
    '--glow-opacity': 0.5,
    scrollTrigger: {
        trigger: '.experience-stats',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse'
    }
});

// =========================================
// PRICING SECTION - Premium Card Reveals
// =========================================

// Pricing header
const pricingHeaderTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.pricing-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

pricingHeaderTl
    .from('.pricing-header .section-tag', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.pricing-header .title-line', {
        opacity: 0,
        y: 80,
        rotateX: -30,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out'
    }, '-=0.4')
    .from('.pricing-header .section-description', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');

// Pricing cards - dramatic 3D stagger
gsap.from('.pricing-card', {
    scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 100,
    rotateX: 10,
    scale: 0.95,
    duration: 1,
    stagger: {
        each: 0.15,
        from: 'center'
    },
    ease: 'power4.out',
    immediateRender: false
});

// Card features - staggered list animation
gsap.utils.toArray('.pricing-card').forEach((card, i) => {
    const features = card.querySelectorAll('.pricing-card-features li');

    gsap.from(features, {
        scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.4 + (i * 0.1),
        ease: 'power3.out',
        immediateRender: false
    });
});

// CTA buttons reveal
gsap.from('.pricing-card-cta', {
    scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 60%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.6,
    ease: 'power3.out',
    immediateRender: false
});

// =========================================
// CTA SECTION - Full Impact
// =========================================

// Background parallax
gsap.to('.cta-background img', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    }
});

// CTA content reveal
const ctaTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.cta-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

ctaTl
    .from('.cta-title .title-line', {
        opacity: 0,
        y: 80,
        rotateX: -20,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out'
    })
    .from('.cta-text', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.form-group', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.cta-submit', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.2');

// =========================================
// FOOTER - Subtle Reveal
// =========================================

gsap.from('.footer-brand, .footer-contact, .footer-social', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 95%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// =========================================
// MAGNETIC BUTTONS EFFECT
// =========================================

const magneticBtns = document.querySelectorAll('.hero-cta, .nav-cta, .pricing-card-cta, .cta-submit');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// =========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            gsap.to(window, {
                scrollTo: targetPosition,
                duration: 1.2,
                ease: 'power3.inOut'
            });
        }
    });
});

// =========================================
// FORM HANDLING - WhatsApp Integration
// =========================================

const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;

    // Build WhatsApp message
    const message = `Olá! Vim pelo site e gostaria de mais informações.

*Nome:* ${name}
*WhatsApp:* ${phone}
*Interesse:* ${interest}

Podem me ajudar? 🪁🌊`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/554888045775?text=${encodedMessage}`;

    // Button animation feedback
    const submitBtn = contactForm.querySelector('.cta-submit');
    gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            window.open(whatsappUrl, '_blank');
        }
    });
});

// =========================================
// TILT EFFECT ON CARDS (Desktop only)
// =========================================

if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.pricing-card, .experience-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// =========================================
// TEXT SCRAMBLE EFFECT - DISABLED
// Was causing issues with navigation display
// =========================================

// Effect disabled to prevent text overlap issues

// =========================================
// SCROLL PROGRESS INDICATOR
// =========================================

const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00E5FF, #00FFB3);
    z-index: 10000;
    transform-origin: left;
    transform: scaleX(0);
`;
document.body.appendChild(progressBar);

gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// =========================================
// PERFORMANCE OPTIMIZATION
// =========================================

// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// Reduce animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(3);
}

// Log initialization
console.log('🪁 Kite Floripa - Ultra Premium Animations initialized');
console.log('✨ Features: Custom cursor, Magnetic buttons, 3D tilt, Text scramble, Scroll progress');
