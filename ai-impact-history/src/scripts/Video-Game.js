/**
 * video-game-ai.js
 * Handles background effects and interactivity for the AI in Gaming page.
 */

// Function to handle the animated Canvas background effect
function setupBackgroundEffects() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error("Canvas element 'background-canvas' not found.");
        return;
    }

    const ctx = canvas.getContext('2d');
    
    // Set initial dimensions
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const particles = [];
    const particleCount = 80; 

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8, 
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 2 + 1,
            color: 'rgba(0, 212, 255,', 
            opacity: Math.random() * 0.5 + 0.3 
        });
    }

    // Animation loop
    const animate = () => {
        // Clear canvas with a slight fade effect over the background color
        ctx.fillStyle = 'rgba(11, 20, 38, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `${particle.color} ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections between nearby particles (Net effect)
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 150; 
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `${particle.color} ${0.2 * (1 - distance / maxDistance)})`; 
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    window.addEventListener('resize', setCanvasSize);
}

// Function to handle the "Animate on Scroll" effect using Intersection Observer
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}


// Initialize all effects when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupBackgroundEffects();
    setupScrollAnimations();
});