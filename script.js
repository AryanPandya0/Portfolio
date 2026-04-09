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
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(13, 13, 18, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '1rem 0';
            header.style.borderBottom = '4px solid #000';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '2rem 0';
            header.style.borderBottom = 'none';
        }
    });

    // 3. Web Shoot Interaction
    document.addEventListener('mousedown', (e) => {
        const actions = ['THWIP!', 'BOOM!', 'POW!', 'WHAM!', 'ZAP!', 'CRUNCH!'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        createWebBurst(e.clientX, e.clientY);
        showActionText(randomAction, e.clientX, e.clientY);
    });

    function createWebBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'web-burst';
        burst.style.left = `${x}px`;
        burst.style.top = `${y}px`;
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 600);
    }

    function showActionText(text, x, y) {
        const el = document.createElement('div');
        el.className = 'action-text';
        el.innerText = text;
        el.style.left = `${x}px`;
        el.style.top = `${y - 50}px`;
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
