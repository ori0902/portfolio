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

// Tab navigation: click nav link = show that section (no scrolling)
const pageSections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');

function showSection(sectionId) {
    const id = sectionId.replace('#', '');
    pageSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === id) section.classList.add('active');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) link.classList.add('active');
    });
    const nav = document.querySelector('.nav');
    if (id === 'hero') nav.classList.remove('scrolled');
    else nav.classList.add('scrolled');
    if (history.replaceState) history.replaceState(null, '', sectionId || '#hero');
}

function getSectionIdFromHash() {
    const hash = window.location.hash;
    if (hash && document.getElementById(hash.replace('#', ''))) return hash;
    return '#hero';
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        showSection(href);
    });
});

window.addEventListener('hashchange', () => {
    showSection(getSectionIdFromHash());
});

// Nav scroll effect (for when content is tall)
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) nav.classList.add('scrolled');
    else if (document.querySelector('.page-section.active#hero')) nav.classList.remove('scrolled');
});

// Intersection Observer for scroll-in animations (within visible section)
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    showSection(getSectionIdFromHash());
    
    document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
    document.querySelectorAll('.research-item').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.15}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.conference-item').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.publication-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.15}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.skill-category').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.gallery-grid').forEach(el => observer.observe(el));
});
