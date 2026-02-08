window.addEventListener("load", () => {
    const loader = document.getElementById('loader');
    const bounceball = document.getElementById('bounceball');
    const nameEl = document.getElementById('name');
    const cursor = document.getElementById('cursor');
    const content = document.getElementById('content');

    const fullName = "1amGH05T | FRONTEND DEVELOPER";
    let index = 0;

    setTimeout(() => {

        bounceball.style.display = "none";

        nameEl.style.display = "block";
        cursor.style.display = "inline";

        const typeEffect = setInterval(() => {
            if (index < fullName.length) {
                nameEl.textContent += fullName[index];
                index++;
            } else {
                clearInterval(typeEffect);

                setTimeout(() => {
                    loader.style.display = "none";
                    content.style.display = "block";
                }, 700);
            }
        }, 100);
    }, 1500);
});

const testimonials = [
    {
        quote: "Joshua is a developer with exceptional creativity and coding mastery. The final product exceeded my expectations. High quality work at a flexible price. Highly recommended!",
        author: "Sarah J.",
        role: "Frontend Developer",
        image: "assests/sarah.jpg"
    },
    {
        quote: "Fantastic work! The attention to detail and animations are top-notch. It really elevated our brand presence online.",
        author: "Michael C.",
        role: "UI/UX Designer",
        image: "assests/michael.jpg"
    },
    {
        quote: "Delivered on time and exceeded expectations. The code is clean, scalable, and easy to maintain.",
        author: "Emily D.",
        role: "Backend Developer",
        image: "assests/emily.jpg"
    },
    {
        quote: "Security best practices were followed perfectly. A very reliable and skilled developer.",
        author: "David W.",
        role: "Cybersecurity Engineer",
        image: "assests/cyber.jpg"
    },
];

function renderTestimonials() {
    const testimonialContainer = document.getElementById("testimonial");
    if (!testimonialContainer) return;

    testimonialContainer.innerHTML = testimonials.map(t => `
        <div class="testimonial-card slide-up">
            <p class="quote">"${t.quote}"</p>
            <div>
                <h3 class="author">${t.author}</h3>
                <p class="role">${t.role}</p>
            </div>
            <img src="${t.image}" alt="${t.author}">
        </div>
    `).join('');
}

// Render on load
document.addEventListener('DOMContentLoaded', renderTestimonials);

// Close mobile menu when link clicked
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    document.querySelectorAll('.unordered_list a').forEach(a => {
        a.addEventListener('click', () => {
            if (menuToggle) menuToggle.checked = false;
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
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