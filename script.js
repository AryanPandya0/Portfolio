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
            const actions = ['THWIP!', 'SWISH!', 'WEB-UP!', 'FLING!', 'GO WEB GO!', 'ZAP!', 'CRACK!', 'THOK!'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            showActionText(randomAction, e.clientX, e.clientY);
        }
        
        // Always show the cursor click feedback
        createClickPulse(e.clientX, e.clientY);
    });

    function shootWebLines(x, y) {
        const web = document.createElement('img');
        web.src = 'assets/spidey_websoot.png';
        web.className = 'web-trap';
        
        const size = 150 + Math.random() * 100;
        web.style.width = `${size}px`;
        web.style.height = 'auto';
        web.style.left = `${x}px`;
        web.style.top = `${y}px`;
        web.style.position = 'fixed';
        web.style.pointerEvents = 'none';
        web.style.zIndex = '9998';
        web.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(0)`;
        web.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        document.body.appendChild(web);
        
        // Animate in
        requestAnimationFrame(() => {
            web.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(1)`;
        });
        
        // Decay and remove
        setTimeout(() => {
            web.style.opacity = '0';
            web.style.transform += ' scale(0.8)';
            setTimeout(() => web.remove(), 1000);
        }, 2000);
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

    // 6. Photo Reveal Effect (Canvas-based)
    const revealFrame = document.getElementById('reveal-frame');
    const revealCanvas = document.getElementById('reveal-canvas');
    
    if (revealFrame && revealCanvas) {
        const frontImg = revealFrame.querySelector('.front-photo');
        const ctx = revealCanvas.getContext('2d');
        let isHovering = false;
        let mouseX = 0;
        let mouseY = 0;
        const REVEAL_RADIUS = 80;
        const FEATHER = 35;

        function resizeCanvas() {
            const rect = revealFrame.getBoundingClientRect();
            revealCanvas.width = rect.width;
            revealCanvas.height = rect.height;
        }

        function drawReveal() {
            if (!isHovering) return;
            
            const w = revealCanvas.width;
            const h = revealCanvas.height;
            
            ctx.clearRect(0, 0, w, h);
            
            // Draw the front image onto the canvas (Cover effect)
            const imgW = frontImg.naturalWidth;
            const imgH = frontImg.naturalHeight;
            const imgRatio = imgW / imgH;
            const canvasRatio = w / h;
            
            let sx, sy, sWidth, sHeight;
            
            if (imgRatio > canvasRatio) {
                // Image is wider than canvas
                sHeight = imgH;
                sWidth = imgH * canvasRatio;
                sx = (imgW - sWidth) / 2;
                sy = 0;
            } else {
                // Image is taller than canvas
                sWidth = imgW;
                sHeight = imgW / canvasRatio;
                sx = 0;
                sy = (imgH - sHeight) / 2;
            }
            
            ctx.drawImage(frontImg, sx, sy, sWidth, sHeight, 0, 0, w, h);
            
            // Create radial gradient for the hole
            const gradient = ctx.createRadialGradient(
                mouseX, mouseY, REVEAL_RADIUS - FEATHER,
                mouseX, mouseY, REVEAL_RADIUS + FEATHER
            );
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            // Cut the hole using destination-out
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, REVEAL_RADIUS + FEATHER, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalCompositeOperation = 'source-over';
            
            requestAnimationFrame(drawReveal);
        }

        // Wait for front image to load
        frontImg.addEventListener('load', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        
        // Initial resize
        setTimeout(resizeCanvas, 500);

        revealFrame.addEventListener('mouseenter', () => {
            isHovering = true;
            frontImg.style.visibility = 'hidden';
            resizeCanvas();
            drawReveal();
        });

        revealFrame.addEventListener('mouseleave', () => {
            isHovering = false;
            frontImg.style.visibility = 'visible';
            ctx.clearRect(0, 0, revealCanvas.width, revealCanvas.height);
        });

        revealFrame.addEventListener('mousemove', (e) => {
            const rect = revealFrame.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
    }
});
