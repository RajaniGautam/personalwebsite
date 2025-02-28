// Animate progress bars when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = `${progress}%`;
        }
    });
}, { threshold: 0.5 });

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content') && navLinks.classList.contains('show')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('show');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add offset for fixed header
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            menuToggle.classList.remove('active');
            navLinks.classList.remove('show');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.1 });

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    animateOnScroll.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize animation for skill bars
document.addEventListener('DOMContentLoaded', () => {
    // Observe all progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        observer.observe(bar);
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
    
    // Shrink navbar on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.padding = '1rem 0';
        }
    });
});

// Animate timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.3}s`;
});

// Add hover effect to interest cards
const interestCards = document.querySelectorAll('.interest-card');
interestCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Photo upload functionality
const uploadForm = document.getElementById('photoUploadForm');
const uploadArea = document.querySelector('.upload-area');
const photoInput = document.getElementById('photoInput');

if (uploadArea && photoInput) {
    uploadArea.addEventListener('click', () => {
        photoInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--hover-color');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        photoInput.files = e.dataTransfer.files;
    });
}

if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your photo upload logic here
        alert('Photo upload feature coming soon!');
        uploadForm.reset();
    });
}

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Handle window resize for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});