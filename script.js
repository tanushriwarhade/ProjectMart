// ===== DATA =====
const projectsDB = [ /* Paste all your 12 projects here exactly as in the uploaded file */ ];

const testimonials = [ /* Paste all testimonials */ ];
const faqs = [ /* Paste all FAQs */ ];

let cart = [];
let currentModalProject = null;
let currentCat = 'all';
let loggedInUser = null;
let testiInterval = null;

// ===== INIT =====
window.onload = () => {
    renderProjects(projectsDB);
    renderCatScroll('all');
    renderTestimonials();
    renderFAQ();
    animateStats();
    initNavHighlight();
    startHeroBadgeCycle();
};

// ===== All your JavaScript functions =====
// Paste everything from <script> tag in your uploaded file here
// Including: renderProjects, filterProjects, showProjectModal, toggleCart, etc.

// Example:
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ... rest of your functions (renderCatScroll, switchCat, etc.)
