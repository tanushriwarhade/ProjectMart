// ==================== DATA ====================
const projectsDB = [
    {id:1,title:"AI Resume Analyzer with NLP",price:1499,category:"ml",tech:"Python • OpenAI • Streamlit • Pandas",image:"https://picsum.photos/id/1015/800/560",desc:"Upload any resume and get instant ATS score...",includes:["Full Source Code","35-page Report","PPT (18 slides)","25 Viva Questions","Video Demo","Deployment Guide"]},
    {id:2,title:"Smart Hostel Management System",price:1699,category:"web",tech:"Django • React • Tailwind • PostgreSQL",image:"https://picsum.photos/id/201/800/560",desc:"Room allotment, mess fees, complaint portal...",includes:["Complete Full-Stack Code","Database Schema","Report + PPT","Live Demo Link"]},
    {id:3,title:"Face Recognition Attendance System",price:1199,category:"ml",tech:"Python • OpenCV • Flask",image:"https://picsum.photos/id/237/800/560",desc:"Automatic attendance using webcam...",includes:["Source Code","Trained Model","Report","PPT","Dataset"]},
    {id:4,title:"E-Commerce Platform with AI Recommendation",price:1899,category:"web",tech:"React TS • Node.js • MongoDB",image:"https://picsum.photos/id/180/800/560",desc:"Modern online store with AI recommendation...",includes:["MERN Stack Code","Report","PPT"]},
    {id:5,title:"Online Examination Portal with Proctoring",price:2299,category:"web",tech:"Django • WebRTC • Tailwind",image:"https://picsum.photos/id/251/800/560",desc:"Live proctoring using webcam...",includes:["Full Code + Admin Panel","Report","PPT"]},
    {id:6,title:"Android Food Delivery App (Swiggy Clone)",price:999,category:"android",tech:"Kotlin • Firebase • MVVM",image:"https://picsum.photos/id/1005/800/560",desc:"Real-time tracking, order history...",includes:["Android Studio Project","Backend Code","Report"]},
    {id:7,title:"Java Spring Boot Banking System",price:1399,category:"java",tech:"Java • Spring Boot • MySQL",image:"https://picsum.photos/id/160/800/560",desc:"Secure banking with JWT auth...",includes:["Microservices Ready","Report + PPT"]},
    {id:8,title:"Movie Recommendation System using ML",price:1299,category:"ml",tech:"Python • Scikit-learn • Flask",image:"https://picsum.photos/id/870/800/560",desc:"Content-based + Collaborative filtering...",includes:["Source + Dataset","Report","PPT"]},
    {id:9,title:"Chat Application with Real-time Messaging",price:1599,category:"web",tech:"Django Channels • React",image:"https://picsum.photos/id/1009/800/560",desc:"WhatsApp-like real-time chat...",includes:["Full Code","Deployment Guide"]},
    {id:10,title:"IoT Smart Home Automation (ESP32)",price:1799,category:"other",tech:"Arduino • ESP32 • MQTT",image:"https://picsum.photos/id/1016/800/560",desc:"Control lights, fan, security...",includes:["Circuit Diagram","Code","Report"]},
];

const testimonials = [
    {name:"Rohan Patil",college:"Fergusson College",text:"Got 92/100... guide was impressed!",color:"bg-purple-100 text-purple-700"},
    {name:"Sneha Deshmukh",college:"Pimpri Chinchwad Polytechnic",text:"Saved me 3 weeks of coding!",color:"bg-orange-100 text-orange-700"},
    {name:"Aarav Kulkarni",college:"SPPU 2026 Batch",text:"Got my first internship offer!",color:"bg-teal-100 text-teal-700"},
    {name:"Priya Sharma",college:"MIT Pune",text:"Scored 95/100. Viva questions helped a lot!",color:"bg-rose-100 text-rose-700"},
    {name:"Aditya More",college:"VIIT Pune",text:"Best documentation I have ever seen.",color:"bg-amber-100 text-amber-700"},
];

const faqs = [
    {q:"Is the project ready for direct submission?", a:"Yes! Every project comes with full source code, detailed report, PPT, and viva questions."},
    {q:"Do you provide custom projects?", a:"Absolutely. Tell us your topic → we build it in 4–7 days."},
    {q:"Is payment secure?", a:"100% secure with Razorpay. You only pay after seeing the demo video."},
    {q:"Can I get it customized for my college?", a:"Yes! Mention your university name in the notes."},
];

// ==================== STATE ====================
let cart = [];
let currentModalProject = null;
let currentCat = 'all';
let loggedInUser = null;

// ==================== INIT ====================
window.onload = () => {
    renderProjects(projectsDB);
    renderCatScroll('all');
    renderTestimonials();
    renderFAQ();
    animateStats();
    initNavHighlight();
    startHeroBadgeCycle();
};

// ==================== HELPER FUNCTIONS ====================
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseFloat(el.dataset.count);
        let count = 0;
        const inc = target / 60;
        const timer = setInterval(() => {
            count += inc;
            if (count >= target) { count = target; clearInterval(timer); }
            el.textContent = count % 1 === 0 ? Math.floor(count) : count.toFixed(2);
        }, 25);
    });
}

function initNavHighlight() {
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);

        const sections = ['home','projects','how','categories','sell','faq'];
        let current = 'home';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 100) current = id;
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ==================== CATEGORY & PROJECT RENDERING ====================
// ==================== CATEGORY & PROJECT RENDERING ====================
function switchCat(cat, el) {
    currentCat = cat;

    // Remove active class from all tabs
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));

    // Add active class to clicked tab
    if (el) el.classList.add('active');

    renderCatScroll(cat);
}

function renderCatScroll(cat) {
    const filtered = cat === 'all' 
        ? projectsDB 
        : projectsDB.filter(p => p.category === cat);

    const container = document.getElementById('catScroll');

    if (filtered.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center py-8 text-slate-400">No projects found in this category.</p>`;
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="cat-proj-card" onclick="showProjectModal(${p.id})">
            <img src="${p.image}" alt="${p.title}">
            <div class="cat-proj-card-info">
                <h4>${p.title}</h4>
                <p>${p.tech}</p>
                <div class="cat-proj-price">₹${p.price}</div>
            </div>
        </div>
    `).join('');
}

// ==================== MODALS ====================
function showProjectModal(id) {
    const p = projectsDB.find(x => x.id === id);
    if (!p) return;
    currentModalProject = p;

    document.getElementById('modalHeader').innerHTML = `<h1 class="sora text-2xl font-extrabold">${p.title}</h1><p class="text-blue-600 text-sm mt-1">${p.tech}</p>`;
    document.getElementById('modalPrice').innerHTML = `₹${p.price} <span style="font-size:0.9rem;color:#94a3b8">one-time</span>`;
    document.getElementById('modalTechBadge').innerHTML = `<span class="inline-flex bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">${p.tech}</span>`;
    document.getElementById('modalImage').src = p.image;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalIncludes').innerHTML = p.includes.map(item => `
        <div class="flex items-center gap-2.5 text-sm"><i class="fa-solid fa-circle-check text-emerald-500"></i><span>${item}</span></div>
    `).join('');

    document.getElementById('projectModal').classList.add('show');
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('show');
}

function addToCartFromModal() {
    if (!currentModalProject) return;
    cart.push(currentModalProject);
    updateCartBadge();
    closeModal();
    showToast(`✅ ${currentModalProject.title} added to cart!`);
    setTimeout(toggleCart, 600);
}

// ==================== CART ====================
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) renderCart();
}

function updateCartBadge() {
    document.getElementById('cartCountBadge').textContent = cart.length;
}

function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-16"><p class="text-5xl mb-4">🛒</p><p class="font-bold">Cart is empty</p></div>`;
        document.getElementById('cartTotalPrice').textContent = '₹0';
        return;
    }

    container.innerHTML = cart.map((item, i) => {
        total += item.price;
        return `
        <div class="flex gap-4 mb-6">
            <img src="${item.image}" class="w-20 h-16 object-cover rounded-xl">
            <div class="flex-1">
                <h4 class="font-bold text-sm">${item.title}</h4>
                <p class="text-xs text-blue-600">${item.tech}</p>
                <p class="font-extrabold mt-2">₹${item.price}</p>
            </div>
            <button onclick="removeFromCart(${i}); renderCart()" class="text-red-500 hover:text-red-700">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;
    }).join('');

    document.getElementById('cartTotalPrice').textContent = `₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    showToast('Item removed');
}

function proceedToCheckout() {
    if (cart.length === 0) return showToast('Cart is empty!');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showToast(`🎉 Order placed successfully! Total: ₹${total} (Demo)`);
    cart = [];
    updateCartBadge();
    toggleCart();
}

// ==================== LOGIN & FREE PROJECT ====================
function showLoginModal() {
    document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) return showToast('Enter email');
    loggedInUser = { name: email.split('@')[0] };
    closeLoginModal();
    showToast(`Welcome back, ${loggedInUser.name}!`);
}

function doRegister() {
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) return showToast('Enter email');
    loggedInUser = { name: email.split('@')[0] };
    closeLoginModal();
    showToast(`Account created! Welcome, ${loggedInUser.name}`);
}

function showFreeModal() {
    document.getElementById('freeModal').classList.add('show');
}

function closeFreeModal() {
    document.getElementById('freeModal').classList.remove('show');
}

function claimFreeProject() {
    const email = document.getElementById('freeEmail').value.trim();
    if (!email) return showToast('Please enter email');
    closeFreeModal();
    showToast(`🎁 Download link sent to ${email}`);
}

// ==================== TESTIMONIALS & FAQ ====================
function renderTestimonials() {
    const container = document.getElementById('testiScroll');
    container.innerHTML = testimonials.map(t => `
        <div class="testi-card">
            <div class="flex gap-1 mb-4">${'<i class="fa-solid fa-star text-yellow-400"></i>'.repeat(5)}</div>
            <p class="italic text-sm text-slate-600">"${t.text}"</p>
            <div class="flex items-center gap-3 mt-6">
                <div class="w-9 h-9 rounded-xl ${t.color} flex items-center justify-center font-bold text-xs">${t.name[0]}</div>
                <div>
                    <div class="font-bold text-sm">${t.name}</div>
                    <div class="text-xs text-slate-400">${t.college}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFAQ() {
    const container = document.getElementById('faqList');
    container.innerHTML = faqs.map((f, i) => `
        <div class="faq-item mb-3 border border-slate-200 rounded-2xl overflow-hidden">
            <div class="faq-q p-4 flex justify-between items-center cursor-pointer" onclick="this.parentElement.classList.toggle('open')">
                <span class="font-medium">${f.q}</span>
                <i class="fa-solid fa-chevron-down transition-transform"></i>
            </div>
            <div class="faq-a px-4 pb-4 text-sm text-slate-600">${f.a}</div>
        </div>
    `).join('');
}

// ==================== SELLER WAITLIST ====================
function joinSellerWaitlist() {
    const email = document.getElementById('sellerEmail').value.trim();
    if (!email) return showToast('Please enter your email');
    showToast(`✅ ${email.split('@')[0]}, you're on the waitlist! We'll contact you soon.`);
    document.getElementById('sellerEmail').value = '';
}

function openWhatsApp() {
    showToast('📱 WhatsApp Support: +91 98765 43210 (Demo)');
}

// ==================== KEYBOARD SUPPORT ====================
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeModal();
        closeLoginModal();
        closeFreeModal();
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) toggleCart();
    }
});

// ==================== HERO BADGE CYCLE ====================
const heroBadgeData = [
    {title:"Delivered in 8 seconds", sub:"AI Resume Analyzer • Just bought by Tanu from Pimpri"},
    {title:"Delivered in 5 seconds", sub:"Face Recognition • Just bought by Rohan from Kothrud"},
    {title:"Delivered in 11 seconds", sub:"Hostel Management • Just bought by Sneha from Wakad"},
];

let badgeIndex = 0;

function startHeroBadgeCycle() {
    setInterval(() => {
        badgeIndex = (badgeIndex + 1) % heroBadgeData.length;
        const badge = document.getElementById('heroBadge');
        badge.style.opacity = '0';
        setTimeout(() => {
            document.getElementById('heroBadgeTitle').textContent = heroBadgeData[badgeIndex].title;
            document.getElementById('heroBadgeSub').textContent = heroBadgeData[badgeIndex].sub;
            badge.style.opacity = '1';
        }, 300);
    }, 4000);
}
