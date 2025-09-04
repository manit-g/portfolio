// Portfolio JavaScript - Complex Animations and Interactive Features

// Global Variables
let isLoading = true;
let gameState = {
    isActive: false,
    score: 0,
    timeLeft: 60,
    target: null,
    array: [],
    left: 0,
    right: 0,
    middle: 0,
    attempts: 0,
    maxAttempts: 10
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializeGame();
    // Contact form removed
    initializeParallaxEffects();
    initializeTypingAnimation();
    initializeParticleSystem();
});

// Loading Screen
function initializeLoadingScreen() {
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        isLoading = false;
        
        // Start hero animations after loading
        setTimeout(() => {
            startHeroAnimations();
        }, 500);
    }, 3000);
}

// Navigation
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Active nav link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                if (entry.target.classList.contains('skill-tag')) {
                    animateSkillTag(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .timeline-item, .project-card, .skill-tag');
    animatedElements.forEach(el => observer.observe(el));
}

function animateTimelineItem(element) {
    const marker = element.querySelector('.timeline-marker');
    const card = element.querySelector('.timeline-card');
    
    setTimeout(() => {
        marker.style.transform = 'translateX(-50%) scale(1.2)';
        marker.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
    }, 200);
    
    setTimeout(() => {
        marker.style.transform = 'translateX(-50%) scale(1)';
        marker.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
    }, 600);
}

function animateProjectCard(element) {
    const overlay = element.querySelector('.project-overlay');
    const techTags = element.querySelectorAll('.project-tech span');
    
    setTimeout(() => {
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.opacity = '1';
            }, index * 100);
        });
    }, 300);
}

function animateSkillTag(element) {
    element.style.transform = 'translateY(0) scale(1)';
    element.style.opacity = '1';
}

// Hero Animations
function startHeroAnimations() {
    // Animate floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        setTimeout(() => {
            shape.style.animationPlayState = 'running';
        }, index * 200);
    });

    // Animate code typing
    setTimeout(() => {
        animateCodeTyping();
    }, 1000);
}

function animateCodeTyping() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Typing Animation for Hero Title
function initializeTypingAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 800);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Parallax Effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes, .grid-overlay');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Particle System
function initializeParticleSystem() {
    const hero = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s ${delay}s infinite linear;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Interactive Game - Binary Search Challenge
function initializeGame() {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const leftBtn = document.getElementById('left-btn');
    const middleBtn = document.getElementById('middle-btn');
    const rightBtn = document.getElementById('right-btn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const feedbackElement = document.getElementById('game-feedback');

    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    leftBtn.addEventListener('click', () => makeGuess('left'));
    middleBtn.addEventListener('click', () => makeGuess('middle'));
    rightBtn.addEventListener('click', () => makeGuess('right'));
}

function startGame() {
    gameState.isActive = true;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.attempts = 0;
    
    // Generate random sorted array
    gameState.array = generateRandomArray(10, 1, 100);
    gameState.target = gameState.array[Math.floor(Math.random() * gameState.array.length)];
    gameState.left = 0;
    gameState.right = gameState.array.length - 1;
    gameState.middle = Math.floor((gameState.left + gameState.right) / 2);
    
    updateGameDisplay();
    startTimer();
    updateGameButtons();
    
    document.getElementById('game-feedback').textContent = 'Find the target number using binary search!';
    document.getElementById('start-btn').textContent = 'Game Active';
    document.getElementById('start-btn').disabled = true;
}

function generateRandomArray(size, min, max) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array.sort((a, b) => a - b);
}

function updateGameDisplay() {
    const arrayDisplay = document.getElementById('array-display');
    const targetDisplay = document.getElementById('target-value');
    
    arrayDisplay.innerHTML = '';
    gameState.array.forEach((value, index) => {
        const item = document.createElement('div');
        item.className = 'array-item';
        item.textContent = value;
        
        if (index === gameState.middle) {
            item.classList.add('active');
        } else if (index < gameState.left || index > gameState.right) {
            item.classList.add('checked');
        }
        
        arrayDisplay.appendChild(item);
    });
    
    targetDisplay.textContent = gameState.target;
}

function makeGuess(direction) {
    if (!gameState.isActive) return;
    
    gameState.attempts++;
    const feedback = document.getElementById('game-feedback');
    
    if (gameState.array[gameState.middle] === gameState.target) {
        // Found the target!
        gameState.score += Math.max(0, 100 - gameState.attempts * 10);
        feedback.textContent = `🎉 Found it! Score: +${Math.max(0, 100 - gameState.attempts * 10)}`;
        feedback.className = 'game-feedback success';
        
        // Highlight the found item
        const items = document.querySelectorAll('.array-item');
        items[gameState.middle].classList.add('found');
        
        setTimeout(() => {
            startGame(); // Start new round
        }, 2000);
        
    } else if (direction === 'left') {
        gameState.right = gameState.middle - 1;
        if (gameState.left > gameState.right) {
            feedback.textContent = '❌ Target not found! Try again.';
            feedback.className = 'game-feedback error';
            setTimeout(() => {
                startGame();
            }, 2000);
            return;
        }
    } else if (direction === 'right') {
        gameState.left = gameState.middle + 1;
        if (gameState.left > gameState.right) {
            feedback.textContent = '❌ Target not found! Try again.';
            feedback.className = 'game-feedback error';
            setTimeout(() => {
                startGame();
            }, 2000);
            return;
        }
    }
    
    gameState.middle = Math.floor((gameState.left + gameState.right) / 2);
    updateGameDisplay();
    updateScore();
    
    if (gameState.attempts >= gameState.maxAttempts) {
        feedback.textContent = '⏰ Max attempts reached! Starting new game.';
        feedback.className = 'game-feedback error';
        setTimeout(() => {
            startGame();
        }, 2000);
    }
}

function startTimer() {
    const timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameState.isActive = false;
    document.getElementById('game-feedback').textContent = `⏰ Time's up! Final Score: ${gameState.score}`;
    document.getElementById('game-feedback').className = 'game-feedback error';
    document.getElementById('start-btn').textContent = 'Start New Game';
    document.getElementById('start-btn').disabled = false;
    updateGameButtons();
}

function resetGame() {
    gameState.isActive = false;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.attempts = 0;
    
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '60';
    document.getElementById('game-feedback').textContent = '';
    document.getElementById('game-feedback').className = 'game-feedback';
    document.getElementById('start-btn').textContent = 'Start Game';
    document.getElementById('start-btn').disabled = false;
    
    updateGameButtons();
}

function updateScore() {
    document.getElementById('score').textContent = gameState.score;
}

function updateGameButtons() {
    const leftBtn = document.getElementById('left-btn');
    const middleBtn = document.getElementById('middle-btn');
    const rightBtn = document.getElementById('right-btn');
    
    const isDisabled = !gameState.isActive;
    
    leftBtn.disabled = isDisabled;
    middleBtn.disabled = isDisabled;
    rightBtn.disabled = isDisabled;
}

// Contact form functionality removed as requested

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        padding: 15px 20px;
        color: var(--primary-text);
        backdrop-filter: blur(20px);
        box-shadow: var(--glass-shadow);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Advanced Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .timeline-card, .project-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Game controls
    if (gameState.isActive) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                makeGuess('left');
                break;
            case 'ArrowRight':
                e.preventDefault();
                makeGuess('right');
                break;
            case ' ':
                e.preventDefault();
                makeGuess('middle');
                break;
        }
    }
    
    // Navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('a[href="#home"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('a[href="#about"]').click();
                break;
            case '3':
                e.preventDefault();
                document.querySelector('a[href="#experience"]').click();
                break;
            case '4':
                e.preventDefault();
                document.querySelector('a[href="#projects"]').click();
                break;
            case '5':
                e.preventDefault();
                document.querySelector('a[href="#game"]').click();
                break;
            case '6':
                e.preventDefault();
                document.querySelector('a[href="#contact"]').click();
                break;
        }
    }
});

// Easter eggs removed as requested

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadResources();

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateRandomArray,
        makeGuess,
        startGame,
        resetGame
    };
}
