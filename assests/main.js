document.addEventListener("DOMContentLoaded", () => {
    // 1. Matrix Rain Effect
    const canvas = document.getElementById('matrix');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0'; // Cyber green
            ctx.font = fontSize + 'px "JetBrains Mono", monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 2. Typing Effect for Terminal
    const typingHero = document.getElementById('typing-hero');
    if (typingHero) {
        const text = "Loading core modules...\nAccessing secure server...\nWelcome to the Mainframe, 1amGH05T.";
        let i = 0;
        typingHero.innerHTML = '';
        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    typingHero.innerHTML += '<br/>';
                } else {
                    typingHero.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // 3. Project Filter
    const filterBtns = document.querySelectorAll('.filter-btns .cyber-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Accordion Logic
    document.querySelectorAll('.acc-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // 5. Contact Form Submit Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.cyber-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const success = document.getElementById('contact-success');

            fetch("https://formsubmit.co/ajax/ladejebijoshua@gmail.com", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    success.style.color = 'lightgreen';
                    success.textContent = 'Thanks — I\'ll get back to you soon!';
                    success.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => {
                        success.style.display = 'none';
                    }, 5000);
                })
                .catch(error => {
                    success.style.color = '#ffcccb';
                    success.textContent = 'Something went wrong. Please try again.';
                    success.style.display = 'block';
                    console.error('Error:', error);
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});