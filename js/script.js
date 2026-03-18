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

// 4. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconContainer = document.getElementById('menu-icon-container');

if (mobileMenuBtn && mobileMenu && iconContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        // Toggle Visibility
        mobileMenu.classList.toggle('hidden');
        
        // Move the operators to the end of the lines to satisfy JSHint (W014)
        iconContainer.innerHTML = isHidden ? 
            '<i data-lucide="x"></i>' : 
            '<i data-lucide="menu"></i>';
            
        lucide.createIcons();
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            iconContainer.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
}
    // 5. Contact Form Google Script Logic
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    // Connected to your exact Google Web App Deployment
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7kysWa79PxjOZAufHysZkxDn2Nt163MMXpaw219527Zp-pGPJMGIr3rGfmp9s3WlM/exec"; 

    if (contactForm && thankYouMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Visual feedback for the user
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="animate-pulse">Transmitting...</span>`;

            // Collect data
            const formData = new FormData(contactForm);
            
            // Send to Google Scripts via Fetch
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: formData,
                mode: "no-cors" // Essential for Google Script cross-origin requests
            })
            .then(() => {
                // Success UI transition
                contactForm.classList.add('hidden');
                thankYouMessage.classList.remove('hidden');
                thankYouMessage.classList.add('animate-pulse');
                lucide.createIcons();
            })
            .catch(err => {
                console.error("Transmission Error:", err);
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4"></i> Retry Transmission`;
                lucide.createIcons();
            });
        });
    }
});