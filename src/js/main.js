import '../css/style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './three-bg.js';

gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            loader.classList.add('opacity-0');
        }, 1500);
    }
});

// Navigation scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.add('py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('py-2');
        navbar.classList.add('py-4');
    }
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        setTimeout(() => {
            cursorFollower.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        }, 50);
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-150');
            cursorFollower.classList.add('scale-[2]');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-150');
            cursorFollower.classList.remove('scale-[2]');
        });
    });
}

// Typing Effect
const typingTexts = ['3D Animation', 'AI Solutions', 'Web Design', 'UI/UX Design'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingContainer = document.getElementById('typing-container');

function typeText() {
    if (!typingContainer) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingContainer.innerHTML = `<span class="typing-cursor pr-1">${currentText.substring(0, charIndex - 1)}</span>`;
        charIndex--;
    } else {
        typingContainer.innerHTML = `<span class="typing-cursor pr-1">${currentText.substring(0, charIndex + 1)}</span>`;
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

typeText();

// Scroll Reveals
gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
    counterAnimated = true;
}

ScrollTrigger.create({
    trigger: '#about',
    start: 'top 70%',
    onEnter: animateCounters
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const whatsappMessage = `Hi, I'm ${name}!%0A%0AEmail: ${email}%0A%0ASubject: ${subject}%0A%0AMessage: ${message}`;
        window.open(`https://wa.me/19452904946?text=${whatsappMessage}`, '_blank');
        e.target.reset();
    });
}

// Particles (CSS/DOM based for simplicity over canvas)
const particlesContainer = document.createElement('div');
particlesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0';
const hero = document.getElementById('hero');
if (hero) {
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-primary rounded-full opacity-0 animate-[particle-float_15s_infinite_ease-in-out]';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add particle keyframes if not exists
if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.innerHTML = `
        @keyframes particle-float {
            0% { transform: translateY(0) scale(0); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

console.log('Iconic Byte app fully initialized');
