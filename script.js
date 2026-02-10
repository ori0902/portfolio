// ===================================
// RESEARCH PORTFOLIO - JAVASCRIPT
// ===================================

// Toggle Research Details
function toggleDetails(projectId) {
    const details = document.getElementById(projectId + '-details');
    const button = event.target;
    
    if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        button.textContent = 'Read more →';
    } else {
        details.classList.add('expanded');
        button.textContent = 'Show less ←';
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation Scroll Effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active Navigation Link Tracking
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

function updateActiveLink() {
    let current = '';
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize Animations and Observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(el => {
        observer.observe(el);
    });
    
    // Observe research items with staggered delays
    document.querySelectorAll('.research-item').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Observe conference items with staggered delays
    document.querySelectorAll('.conference-item').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe publication cards
    document.querySelectorAll('.publication-card').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Observe skill categories with staggered delays
    document.querySelectorAll('.skill-category').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
        observer.observe(el);
    });
    
    // Observe contact section elements
    document.querySelectorAll('.contact-info, .cta-box').forEach(el => {
        observer.observe(el);
    });
    
    // Initial active link update
    updateActiveLink();
    
    console.log('Portfolio loaded successfully!');
});
