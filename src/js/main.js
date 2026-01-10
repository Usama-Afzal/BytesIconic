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
        title: 'E-Commerce Platform',
        description: 'Complete redesign and development of a luxury fashion e-commerce experience.',
        overview: 'We partnered with a leading fashion brand to completely reimagine their digital shopping experience. The project involved extensive user research, prototyping, and development of a cutting-edge e-commerce platform.',
        services: ['UI/UX Design', 'Web Development', 'Brand Identity'],
        gradient: 'from-indigo-500 to-purple-600'
    },
    2: {
        title: 'Fintech Dashboard',
        description: 'Data-rich financial dashboard with real-time analytics and AI insights.',
        overview: 'A comprehensive financial analytics platform designed for institutional investors. Features include real-time data visualization, AI-powered insights, and customizable reporting tools.',
        services: ['UI/UX Design', 'Web Development', 'AI Website Bot'],
        gradient: 'from-purple-500 to-pink-600'
    },
    3: {
        title: 'Healthcare App',
        description: 'Patient-centered mobile application for telemedicine and health tracking.',
        overview: 'An innovative telemedicine platform that connects patients with healthcare providers. The app includes video consultations, prescription management, and health monitoring features.',
        services: ['UI/UX Design', 'Web Development'],
        gradient: 'from-pink-500 to-red-600'
    },
    4: {
        title: 'SaaS Platform',
        description: 'Enterprise software solution with AI-powered automation features.',
        overview: 'A comprehensive business automation platform designed for enterprise clients. Features intelligent workflow automation, team collaboration tools, and advanced analytics.',
        services: ['UI/UX Design', 'Web Development', 'AI Website Bot'],
        gradient: 'from-blue-500 to-indigo-600'
    },
    5: {
        title: 'Brand Identity',
        description: 'Complete brand system for a tech startup including logo and guidelines.',
        overview: 'End-to-end brand identity development for an emerging technology startup. Deliverables included logo design, color palette, typography system, and comprehensive brand guidelines.',
        services: ['Brand Identity & Graphics', 'Motion & 3D Animation'],
        gradient: 'from-teal-500 to-blue-600'
    },
    6: {
        title: '3D Product Showcase',
        description: 'Interactive 3D product visualization for an electronics brand.',
        overview: 'An immersive 3D product experience that allows customers to explore products in stunning detail. Features include 360° rotation, zoom functionality, and interactive hotspots.',
        services: ['Motion & 3D Animation', 'Web Development'],
        gradient: 'from-orange-500 to-yellow-600'
    }
};

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
        <div class="aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative">
            <span class="text-white text-6xl font-bold opacity-20">0${id}</span>
        </div>
        <div class="p-8">
            <h2 class="text-3xl font-bold mb-4" style="color: var(--color-text);">${project.title}</h2>
            <p class="text-base mb-8 leading-relaxed" style="color: var(--color-text-muted);">${project.overview}</p>
            
            <div class="mb-8">
                <h3 class="text-sm font-medium uppercase tracking-wider mb-4 gradient-text">Services Used</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.services.map(s => `<span class="px-4 py-2 rounded-full text-sm" style="background-color: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-muted);">${s}</span>`).join('')}
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="aspect-video rounded-lg bg-gradient-to-br ${project.gradient} opacity-60"></div>
                <div class="aspect-video rounded-lg bg-gradient-to-br ${project.gradient} opacity-40"></div>
            </div>
            
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
