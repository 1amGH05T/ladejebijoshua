/* ═══════════════════════════════════════════════════════════════════
   LIQUID GLASS PORTFOLIO — Joshua
   Interactions & Effects
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── 1. Liquid Particle Background ───
    const canvas = document.getElementById('liquid-bg');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let w, h, particles;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function createParticles() {
            const count = Math.min(Math.floor((w * h) / 18000), 80);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 2.5 + 0.8,
                    dx: (Math.random() - 0.5) * 0.3,
                    dy: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.4 + 0.1,
                    hue: Math.random() > 0.5 ? 174 : 260 // teal or purple
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);

            // Ambient gradient backdrop
            const grd = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, w * 0.7);
            grd.addColorStop(0, 'rgba(45, 212, 191, 0.03)');
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);

            const grd2 = ctx.createRadialGradient(w * 0.7, h * 0.7, 0, w * 0.7, h * 0.7, w * 0.5);
            grd2.addColorStop(0, 'rgba(167, 139, 250, 0.03)');
            grd2.addColorStop(1, 'transparent');
            ctx.fillStyle = grd2;
            ctx.fillRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(45, 212, 191, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawParticles);
        }

        resize();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });
    }

    // ─── 2. Typed Text Effect ───
    const typedOutput = document.getElementById('typed-output');
    if (typedOutput) {
        const lines = [
            'Initializing portfolio...',
            'Loading modules...',
            'Welcome, Joshua.'
        ];
        let lineIdx = 0, charIdx = 0;

        function typeLine() {
            if (lineIdx >= lines.length) return;
            const line = lines[lineIdx];
            if (charIdx < line.length) {
                typedOutput.textContent += line[charIdx];
                charIdx++;
                setTimeout(typeLine, 40 + Math.random() * 30);
            } else {
                lineIdx++;
                if (lineIdx < lines.length) {
                    setTimeout(() => {
                        typedOutput.textContent = '';
                        charIdx = 0;
                        typeLine();
                    }, 1200);
                }
            }
        }
        setTimeout(typeLine, 800);
    }

    // ─── 3. Terminal Command Buttons ───
    document.querySelectorAll('.cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.querySelector(btn.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ─── 4. Section Reveal on Scroll ───
    const revealSections = document.querySelectorAll('.reveal-section');
    if (revealSections.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate skill fills when skills section appears
                    entry.target.querySelectorAll('.skill-badge').forEach((badge, i) => {
                        setTimeout(() => badge.classList.add('animated'), i * 100);
                    });
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealSections.forEach(s => revealObserver.observe(s));
    }

    // ─── 5. Nav Active Link on Scroll ───
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');

    if (sections.length && navLinks.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(s => navObserver.observe(s));
    }

    // ─── 6. Nav Scroll Effect ───
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // ─── 7. Mobile Hamburger ───
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinksContainer.classList.remove('open');
            });
        });
    }

    // ─── 8. 3D Tilt Effect on Cards ───
    if (!prefersReducedMotion) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            // Add glare element
            const glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;

                // Update glare position
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.setProperty('--glare-x', `${glareX}%`);
                glare.style.setProperty('--glare-y', `${glareY}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // ─── 9. Project Filter ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? '' : 'none';
                if (match) {
                    card.style.animation = 'none';
                    card.offsetHeight; // force reflow
                    card.style.animation = '';
                }
            });
        });
    });

    // ─── 10. Contact Form ───
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '> transmitting...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const status = document.getElementById('contact-status');

            fetch("https://formsubmit.co/ajax/ladejebijoshua@gmail.com", {
                method: "POST",
                body: formData
            })
                .then(r => r.json())
                .then(() => {
                    status.style.color = '#2dd4bf';
                    status.textContent = '✓ Message transmitted. I\'ll respond within 24h.';
                    status.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => { status.style.display = 'none'; }, 6000);
                })
                .catch(() => {
                    status.style.color = '#f472b6';
                    status.textContent = '✗ Transmission failed. Please try again.';
                    status.style.display = 'block';
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});