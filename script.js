document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Web Shoot & Interaction
    document.addEventListener('mousedown', (e) => {
        const isHeroZone = e.target.closest('.hero-web-zone');
        
        if (isHeroZone) {
            shootWebLines(e.clientX, e.clientY);
        } else {
            const actions = ['THWIP!', 'BOOM!', 'POW!', 'WHAM!', 'ZAP!', 'CRUNCH!', 'SNAP!', 'WEB!'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            showActionText(randomAction, e.clientX, e.clientY);
        }
        
        // Always show the cursor click feedback
        createClickPulse(e.clientX, e.clientY);
    });

    function shootWebLines(x, y) {
        // Create a small web "trap" decal at the click location
        const trap = document.createElement('div');
        trap.className = 'web-trap';
        
        // Use an SVG for a realistic web look
        trap.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <style>
                    path { 
                        stroke: white; 
                        stroke-width: 1.5; 
                        fill: none; 
                        stroke-linecap: round;
                        opacity: 0.8;
                    }
                </style>
                <!-- Radial webs -->
                <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85" />
                <path d="M50 20 Q60 20 71 29 Q80 40 80 50 Q80 60 71 71 Q60 80 50 80 Q40 80 29 71 Q20 60 20 50 Q20 40 29 29 Q40 20 50 20" />
                <path d="M50 5 Q70 5 82 18 Q95 30 95 50 Q95 70 82 82 Q70 95 50 95 Q30 95 18 82 Q5 70 5 50 Q5 30 18 18 Q30 5 50 5" />
                <!-- Random sticky bits -->
                <circle cx="50" cy="50" r="3" fill="white" opacity="0.9" />
                <circle cx="20" cy="20" r="2" fill="white" opacity="0.6" />
                <circle cx="80" cy="80" r="2" fill="white" opacity="0.6" />
                <circle cx="80" cy="20" r="1.5" fill="white" opacity="0.5" />
                <circle cx="20" cy="80" r="1.5" fill="white" opacity="0.5" />
            </svg>
        `;
        
        const size = 60 + Math.random() * 60;
        trap.style.width = `${size}px`;
        trap.style.height = `${size}px`;
        trap.style.left = `${x}px`;
        trap.style.top = `${y}px`;
        trap.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(trap);
        
        // Decay and remove
        setTimeout(() => {
            trap.style.opacity = '0';
            trap.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(0.8)`;
            setTimeout(() => trap.remove(), 1000);
        }, 2000); // Stays on page for a bit as requested
    }

    function createClickPulse(x, y) {
        const pulse = document.createElement('div');
        pulse.style.position = 'fixed';
        pulse.style.left = `${x}px`;
        pulse.style.top = `${y}px`;
        pulse.style.width = '20px';
        pulse.style.height = '20px';
        pulse.style.border = '2px solid white';
        pulse.style.borderRadius = '50%';
        pulse.style.pointerEvents = 'none';
        pulse.style.zIndex = '9999';
        pulse.style.transform = 'translate(-50%, -50%)';
        pulse.style.animation = 'pulseAnim 0.4s ease-out forwards';
        document.body.appendChild(pulse);
        
        setTimeout(() => pulse.remove(), 400);
    }

    // Add animation for pulse
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulseAnim {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    function showActionText(text, x, y) {
        const el = document.createElement('div');
        el.className = 'action-text';
        el.innerText = text;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.setProperty('--rotate', `${Math.random() * 40 - 20}deg`);
        document.body.appendChild(el);
        
        setTimeout(() => el.remove(), 800);
    }

    // 4. Contact Form Interaction
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerText;
            
            btn.innerText = 'WEB-FLINGING...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'SENT! EXCELSIOR!';
                btn.style.backgroundColor = '#0066ff';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 5. Custom Cursor (Web-slinger)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});
