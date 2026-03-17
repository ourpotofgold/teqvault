document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Dynamic Nav Background
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-[#050810]/95', 'py-3');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('bg-[#050810]/95', 'py-3');
            nav.classList.add('py-4');
        }
    });

    // 4. Contact Form "Thank You" Logic
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    if (contactForm && thankYouMessage) {
        contactForm.addEventListener('submit', function(e) {
            // Prevent the page from reloading
            e.preventDefault(); 
            
            // Note: If you want to actually send the email to support@teqvault.online later,
            // you will connect a service like Formspree or EmailJS here.
            
            // Hide the form and show the thank you message
            contactForm.classList.add('hidden');
            
            // Remove hidden class and add a small fade-in effect
            thankYouMessage.classList.remove('hidden');
            thankYouMessage.classList.add('animate-pulse'); // Optional subtle animation
            
            // Re-initialize icons just in case the checkmark icon needs to render
            lucide.createIcons();
        });
    }
});