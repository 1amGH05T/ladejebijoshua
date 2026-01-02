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
                    content.style.display = "flex";
                }, 700);
            }
        }, 100);
    }, 1500);
});

const testimonials = [
    {
        quote: "this plat",
        author: "ada",
        role: "frontend",
        image: "assests/profile.png"
    },
    {
        quote: "another",
        author: "joshua",
        role: "ui/ux",
        image: "assests/profile.png"
    },
    {
        quote: "hmmmmm",
        author: "deborah",
        role: "backend",
        image: "assests/profile.png"
    },
    {
        quote: "clown",
        author: "nife",
        role: "cybersecurity",
        image: "assests/profile.png"
    },
];

let current = 0;

function updateTestimonial() {
    const testimonialDiv = document.getElementById("testimonial");
    const t = testimonials[current];
    testimonialDiv.innerHTML = `
    <p class="quote">${t.quote}</p>
    <h3 class="author">${t.author}</h3>
    <p class="role">${t.role}</p>
    <img src="${t.image}" alt="${t.author}">
    `
}

function nextTestimonial() {
    current = (current + 1) % testimonials.length;
    updateTestimonial();
}

function prevTestimonial() {
    current = (current - 1) % testimonials.length;
    updateTestimonial();
}

// Close mobile menu when link clicked
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    document.querySelectorAll('.unordered_list a').forEach(a => {
        a.addEventListener('click', () => {
            if (menuToggle) menuToggle.checked = false;
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name-field');
            const email = document.getElementById('email-field');
            const message = document.getElementById('message-field');
            const success = document.getElementById('contact-success');

            // basic validation
            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                success.style.color = '#ffcccb';
                success.textContent = 'Please fill all fields.';
                success.style.display = 'block';
                return;
            }

            // show success and clear
            success.style.color = 'lightgreen';
            success.textContent = 'Thanks — I\'ll get back to you soon!';
            success.style.display = 'block';
            contactForm.reset();

            // Optionally open mail client as fallback (commented)
            // window.location.href = `mailto:you@domain.com?subject=Contact from ${encodeURIComponent(name.value)}&body=${encodeURIComponent(message.value)}`;
        });
    }
});