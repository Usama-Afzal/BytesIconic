import '../css/style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './three-bg.js';

gsap.registerPlugin(ScrollTrigger);

// =========================================
// Project Data
// =========================================
const projects = {
    1: {
        title: 'Our Portfolio',
        description: 'A comprehensive collection of our digital works and creative innovations.',
        overview: 'We showcase our diverse range of projects, from animation to web development. Each project is handled with precision and creativity to deliver the best results for our clients.',
        services: ['Branding', 'Digital Solutions', 'Creative Design'],
        image: '/section/section1.jpeg',
        date: 'Jan 2026',
        gallery: []
    },
    2: {
        title: '3D/2D Animation',
        description: 'We bring stories to life with high-quality 3D and 2D animations, perfect for brands and storytelling.',
        overview: 'Our animation team creates immersive visual experiences that captivate audiences. Whether it is a 3D product showcase or a 2D character animation, we ensure top-tier quality.',
        services: ['3D Modeling', 'Character Animation', 'Storyboarding'],
        image: '/section/section2.jpeg',
        date: 'Dec 2025',
        gallery: []
    },
    3: {
        title: 'AI Bots & Automation',
        description: 'Smarter business solutions with AI-powered chatbots and automated systems to save time and boost efficiency.',
        overview: 'We develop intelligent AI bots that handle customer inquiries and automate repetitive tasks, allowing your business to scale faster and work more efficiently.',
        services: ['AI Integration', 'Workflow Automation', 'Chatbot Development'],
        image: '/section/section3.jpeg',
        date: 'Nov 2025',
        gallery: []
    },
    4: {
        title: 'Motion Graphics',
        description: 'Dynamic and engaging motion graphics that capture attention and communicate your message clearly.',
        overview: 'Motion graphics are an essential part of modern marketing. We create high-energy visuals that help brands stand out on social media and digital platforms.',
        services: ['Video Editing', 'Visual Effects', 'Kinetic Typography'],
        image: '/section/section4.jpeg',
        date: 'Oct 2025',
        gallery: []
    },
    5: {
        title: 'UI/UX & Product Animation',
        description: 'Beautiful and easy-to-use designs for apps and websites, built to provide the best experience for your users.',
        overview: 'Our design philosophy focuses on the user. We create intuitive interfaces that are not only visually stunning but also highly functional across all devices.',
        services: ['User Interface Design', 'Experience Optimization', 'Prototyping'],
        image: '/section/section5.jpeg',
        date: 'Sep 2025',
        gallery: []
    },
    6: {
        title: 'E-Commerce Solutions',
        description: 'Complete online stores that make selling easy, with secure payments and a smooth shopping experience.',
        overview: 'We build robust e-commerce platforms tailored to your business needs, ensuring a seamless journey from product discovery to secure checkout.',
        services: ['Shopify Development', 'Payment Integration', 'Inventory Management'],
        image: '/section/section6.jpeg',
        date: 'Aug 2025',
        gallery: []
    }
};

// =========================================
// Dynamic Gallery Automation
// =========================================
// Automatically detect and import all images/videos from section* folders
const galleryFiles = import.meta.glob([
    '../../section*/*.{png,jpg,jpeg,gif,svg,webp,WEBP,mp4,webm,MP4,WEBM}'
], { eager: true });

Object.keys(galleryFiles).forEach(path => {
    // Extract section ID (e.g., ../../section2/1.mp4 -> 2)
    const match = path.match(/section(\d)\//);
    if (match) {
        const id = match[1];
        if (projects[id]) {
            const url = galleryFiles[path].default || galleryFiles[path];
            const type = path.match(/\.(mp4|webm)$/i) ? 'video' : 'image';
            projects[id].gallery.push({ type, url });
        }
    }
});


// =========================================
// Theme Toggle Logic
// =========================================
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved user preference
if (localStorage.theme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
} else {
    htmlElement.setAttribute('data-theme', 'dark');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.theme = 'light';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.theme = 'dark';
        }
    });
}

// =========================================
// Navigation Scroll Effect
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('py-6');
        navbar.classList.add('py-4');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('py-6');
        navbar.classList.remove('py-4');
    }
});

// =========================================
// Mobile Menu
// =========================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// =========================================
// Scroll Reveals & Counters (GSAP)
// =========================================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

const stats = document.querySelectorAll('.stat-number');
if (stats.length > 0) {
    stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.to(stat, {
            innerText: target,
            duration: 2,
            ease: 'power3.out',
            snap: { innerText: 1 },
            onUpdate: function () {
                this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText) + '+';
            },
            scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// =========================================
// Modal Functions
// =========================================
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');
const portfolioItems = document.querySelectorAll('.portfolio-card');

function openProject(id) {
    const project = projects[id];
    if (!project || !modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="aspect-video relative overflow-hidden">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
            <div class="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium">
                ${project.date}
            </div>
        </div>
        <div class="p-8">
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-3xl font-bold" style="color: var(--color-text);">${project.title}</h2>
            </div>
            <p class="text-base mb-8 leading-relaxed" style="color: var(--color-text-muted);">${project.overview}</p>
            
            <div class="mb-8">
                <h3 class="text-sm font-medium uppercase tracking-wider mb-4 gradient-text">Services Used</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.services.map(s => `<span class="px-4 py-2 rounded-full text-sm" style="background-color: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-muted);">${s}</span>`).join('')}
                </div>
            </div>
            
            ${project.gallery && project.gallery.length > 0 ? `
            <div class="mb-8">
                <h3 class="text-sm font-medium uppercase tracking-wider mb-4 gradient-text">Project Gallery</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${project.gallery.map(item => `
                        <div class="aspect-square rounded-xl overflow-hidden bg-surface border border-border group cursor-zoom-in">
                            ${item.type === 'video' ? `
                                <video controls class="w-full h-full object-cover">
                                    <source src="${item.url}" type="video/mp4">
                                </video>
                            ` : `
                                <img src="${item.url}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery item">
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : `
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="aspect-video rounded-lg overflow-hidden border border-border">
                    <img src="${project.image}" class="w-full h-full object-cover opacity-80" alt="Detail 1">
                </div>
                <div class="aspect-video rounded-lg overflow-hidden border border-border">
                    <img src="${project.image}" class="w-full h-full object-cover opacity-60" alt="Detail 2">
                </div>
            </div>
            `}
            
            <a href="#contact" onclick="document.getElementById('projectModal').classList.remove('active'); document.body.style.overflow = '';" class="btn-primary inline-block px-8 py-4 rounded-lg font-medium text-center">
                Start a Similar Project
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

if (portfolioItems) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            openProject(id);
        });
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProject);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProject();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProject();
    }
});

// =========================================
// Contact Form
// =========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectType = document.getElementById('projectType').value;
        const message = document.getElementById('message').value;

        const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Project Type:* ${projectType}%0A*Message:* ${message}`;
        window.open(`https://wa.me/19452904946?text=${whatsappMessage}`, '_blank');
        e.target.reset();
    });
}

console.log('Bytes Iconic theme initialized.');
