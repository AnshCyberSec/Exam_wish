// DOM Elements
const cosmicBtn = document.getElementById('cosmicBtn');
const portalSide = document.getElementById('portalSide');
const messageSide = document.getElementById('messageSide');
const closeCosmic = document.getElementById('closeCosmic');
const portalSound = document.getElementById('portalSound');
const typewriterElement = document.getElementById('typewriterText');

// Message to type - Simple, natural, dost wali feeling
// Message to type - Filmy + masti + tum tone
const messageText = `Aaj ka scene simple hai…

Jao, paper do… aur wapas aake bolo “ho gaya kaam” 😎  
Tension lene ka nahi, dene ka hai 😏

Aur haan… tum kar logi yaar, mujhe 110% biswas hai 💯

Ab jao heroine wali entry maaro exam me 😄  
Baad me full update chahiye`;

// Sound played flag (only once)
let soundPlayed = false;

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
            alpha: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.5 + 0.1
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
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter Effect
function typeWriter(text, element, speed = 80) {
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
            // Remove cursor after typing
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
    const particleCount = 60;
    const colors = ['#ff3366', '#33ccff', '#ff66cc', '#ff9933'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = `${Math.random() * 6 + 2}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.zIndex = '1000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocityX = Math.cos(angle) * (Math.random() * 100 + 50);
        const velocityY = Math.sin(angle) * (Math.random() * 100 + 50);
        
        let posX = parseFloat(particle.style.left);
        let posY = parseFloat(particle.style.top);
        let opacity = 0.8;
        
        const animate = () => {
            posX += velocityX * 0.02;
            posY += velocityY * 0.02;
            opacity -= 0.01;
            
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

// Open Portal (Main Action)
function openPortal() {
    // Play sound once
    playPortalSound();
    
    // Create particle explosion
    createCosmicParticles();
    
    // Slide out portal side
    portalSide.classList.add('slide-out');
    
    // Slide in message side after delay
    setTimeout(() => {
        messageSide.classList.add('slide-in');
        
        // Start typewriter effect
        typeWriter(messageText, typewriterElement, 70);
        
        // Add extra cosmic flair
        createStarBurst();
    }, 400);
}

// Create star burst effect
function createStarBurst() {
    const burstCount = 30;
    const container = document.querySelector('.message-container');
    
    for (let i = 0; i < burstCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'absolute';
        star.style.fontSize = `${Math.random() * 20 + 10}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.pointerEvents = 'none';
        star.style.zIndex = '100';
        star.style.opacity = '0';
        star.style.animation = `starPop ${Math.random() * 1 + 0.5}s ease-out forwards`;
        
        container.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 1500);
    }
}

// Close Message
function closeMessage() {
    messageSide.classList.remove('slide-in');
    
    setTimeout(() => {
        portalSide.classList.remove('slide-out');
        // Reset typewriter
        typewriterElement.innerHTML = '';
        // Show cursor again
        const cursor = document.querySelector('.cursor-blink');
        if (cursor) cursor.style.display = 'inline-block';
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
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything
function init() {
    createStars();
    
    // Event listeners
    if (cosmicBtn) {
        cosmicBtn.addEventListener('click', openPortal);
    }
    
    if (closeCosmic) {
        closeCosmic.addEventListener('click', closeMessage);
    }
    
    // Preload sound
    if (portalSound) {
        portalSound.load();
    }
    
    console.log('%c✨ Ready for exam wishes ✨', 'color: #ff3366; font-size: 14px; font-weight: bold;');
}

// Start when ready
window.addEventListener('load', init);
