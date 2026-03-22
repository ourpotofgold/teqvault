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
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('bg-[#050810]/95', 'py-3');
                nav.classList.remove('py-4');
            } else {
                nav.classList.remove('bg-[#050810]/95', 'py-3');
                nav.classList.add('py-4');
            }
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
            
            // Swap Icons: Show 'x' when menu is open, 'menu' when closed
            iconContainer.innerHTML = isHidden ? 
                '<i data-lucide="x"></i>' : 
                '<i data-lucide="menu"></i>';
                
            // Re-render the new icon
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconContainer.innerHTML = '<i data-lucide="menu"></i>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        });
    }

    // 5. Auto-Select Application Discipline via URL (For pages/application.html)
    const urlParams = new URLSearchParams(window.location.search);
    const targetRole = urlParams.get('role');
    const positionDropdown = document.querySelector('select[name="position"]');
    
    if (targetRole && positionDropdown) {
        if (targetRole === 'tester') {
            positionDropdown.value = 'Game Tester';
        } else if (targetRole === 'proofreader') {
            positionDropdown.value = 'Proofreader';
        }
    }

    // 6. Global Form Transmission Engine
    // INJECTED: Your live Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDENZ1tS1mH5WZawQ1zhX37loJP8mLJ86q_TB-WjAgA12Hs8E4hlXLRuZdwRW2CoiVaQ/exec"; 

    const handleFormSubmit = (formId, successId, btnId) => {
        const formElement = document.getElementById(formId);
        const successElement = document.getElementById(successId);
        const submitBtn = document.getElementById(btnId);

        if (!formElement) return;

        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if(submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span class="animate-pulse">Transmitting...</span>`;
            }

            // FIX: Convert FormData to URLSearchParams so Google Apps Script parses it flawlessly
            const data = new URLSearchParams(new FormData(formElement));
            
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: data
                // mode: "no-cors" is removed here so it properly posts to Apps Script
            })
            .then(() => {
                formElement.classList.add('hidden');
                if(successElement) {
                    successElement.classList.remove('hidden');
                    successElement.classList.add('animate-pulse');
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            })
            .catch(err => {
                console.error("Transmission Error:", err);
                if(submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4"></i> Retry Transmission`;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            });
        });
    };

    // Initialize the engine for all forms across the site
    handleFormSubmit('contactForm', 'thankYouMessage', 'submitBtn');           
    handleFormSubmit('vaultAppForm', 'appSuccess', 'appSubmitBtn');            
    handleFormSubmit('quickAppForm', 'quickSuccessMessage', 'quickSubmitBtn'); 
});