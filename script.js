// DOM Elements
const cosmicBtn = document.getElementById('cosmicBtn');
const portalSide = document.getElementById('portalSide');
const messageSide = document.getElementById('messageSide');
const closeCosmic = document.getElementById('closeCosmic');
const portalSound = document.getElementById('portalSound');
const typewriterElement = document.getElementById('typewriterText');

// Message to type
const messageText = `Aaj ka scene simple hai…

Jao, paper do… aur wapas aake bolo “ho gaya kaam” 😎  
Tension lene ka nahi, dene ka hai 😏

Aur haan… tum kar logi yaar, mujhe 110% biswas hai 💯

Ab jao… heroine wali entry maaro exam me 😄  
Baad me full update chahiye`;

// State variables
let soundPlayed = false;
let isAnimating = false;  // Prevent multiple clicks

// Starfield Animation
function createStars() {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            alpha: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            
            // Twinkling effect
            star.alpha += (Math.random() - 0.5) * 0.02;
            star.alpha = Math.min(0.8, Math.max(0.2, star.alpha));
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter Effect
function typeWriter(text, element, speed = 70) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text[i] === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text[i];
            }
            i++;
            setTimeout(type, speed);
        } else {
            const cursor = document.querySelector('.cursor-blink');
            if (cursor) cursor.style.display = 'none';
        }
    }
    
    type();
}

// Play sound only once
function playPortalSound() {
    if (!soundPlayed && portalSound) {
        portalSound.currentTime = 0;
        portalSound.play().then(() => {
            soundPlayed = true;
            console.log('✨ Sound played once');
        }).catch(e => console.log('Sound play error:', e));
    }
}

// Create cosmic particles on click
function createCosmicParticles() {
    const particleCount = 80;
    const colors = ['#ff3366', '#33ccff', '#ff66cc', '#ff9933', '#ff66aa'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = `${Math.random() * 8 + 2}px`;
        particle.style.height = `${Math.random() * 8 + 2}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.zIndex = '1000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 15px ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocityX = Math.cos(angle) * (Math.random() * 80 + 40);
        const velocityY = Math.sin(angle) * (Math.random() * 80 + 40);
        
        let posX = parseFloat(particle.style.left);
        let posY = parseFloat(particle.style.top);
        let opacity = 0.9;
        
        const animate = () => {
            posX += velocityX * 0.02;
            posY += velocityY * 0.02;
            opacity -= 0.012;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Open Portal (Main Action) - FIXED
function openPortal() {
    // Prevent multiple clicks while animating
    if (isAnimating) {
        console.log('Animation in progress, please wait');
        return;
    }
    
    // Check if message is already open
    if (messageSide.classList.contains('slide-in')) {
        console.log('Message already open');
        return;
    }
    
    isAnimating = true;
    
    // Play sound once
    playPortalSound();
    
    // Create particle explosion
    createCosmicParticles();
    
    // Add click effect on button
    if (cosmicBtn) {
        cosmicBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            if (cosmicBtn) cosmicBtn.style.transform = '';
        }, 150);
    }
    
    // Slide out portal side
    portalSide.classList.add('slide-out');
    
    // Slide in message side after delay
    setTimeout(() => {
        messageSide.classList.add('slide-in');
        
        // Start typewriter effect
        typeWriter(messageText, typewriterElement, 65);
        
        // Add extra cosmic flair
        createStarBurst();
        
        // Reset animation flag after everything is done
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }, 500);
}

// Create star burst effect
function createStarBurst() {
    const burstCount = 40;
    const container = document.querySelector('.message-container');
    if (!container) return;
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.innerHTML = ['✨', '⭐', '🌟', '💫', '⚡'][Math.floor(Math.random() * 5)];
            star.style.position = 'absolute';
            star.style.fontSize = `${Math.random() * 25 + 12}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.pointerEvents = 'none';
            star.style.zIndex = '100';
            star.style.opacity = '0';
            star.style.animation = `starPop ${Math.random() * 0.8 + 0.5}s ease-out forwards`;
            
            container.appendChild(star);
            
            setTimeout(() => {
                if (star && star.remove) star.remove();
            }, 1200);
        }, i * 40);
    }
}

// Close Message - FIXED
function closeMessage() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    messageSide.classList.remove('slide-in');
    
    setTimeout(() => {
        portalSide.classList.remove('slide-out');
        // Reset typewriter
        if (typewriterElement) {
            typewriterElement.innerHTML = '';
        }
        // Show cursor again
        const cursor = document.querySelector('.cursor-blink');
        if (cursor) cursor.style.display = 'inline-block';
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }, 500);
}

// Add keyframe animation for stars
const style = document.createElement('style');
style.textContent = `
    @keyframes starPop {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        30% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes btnClick {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything
function init() {
    createStars();
    
    // Event listeners - CLEAN AND SIMPLE
    if (cosmicBtn) {
        // Remove any existing listeners to avoid duplicates
        const newBtn = cosmicBtn.cloneNode(true);
        cosmicBtn.parentNode.replaceChild(newBtn, cosmicBtn);
        
        const freshBtn = document.getElementById('cosmicBtn');
        if (freshBtn) {
            freshBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openPortal();
            });
        }
    }
    
    if (closeCosmic) {
        const newClose = closeCosmic.cloneNode(true);
        closeCosmic.parentNode.replaceChild(newClose, closeCosmic);
        
        const freshClose = document.getElementById('closeCosmic');
        if (freshClose) {
            freshClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMessage();
            });
        }
    }
    
    // Close on background click (optional)
    if (messageSide) {
        messageSide.addEventListener('click', function(e) {
            if (e.target === messageSide) {
                closeMessage();
            }
        });
    }
    
    // Preload sound
    if (portalSound) {
        portalSound.load();
    }
    
    console.log('%c✨ Ready! Button is fixed ✨', 'color: #ff3366; font-size: 14px; font-weight: bold;');
}

// Start when ready
window.addEventListener('DOMContentLoaded', init);