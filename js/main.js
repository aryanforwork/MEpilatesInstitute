/* ME Pilates Institute - Interactive Actions & Fallbacks */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Shrink Header Fallback (for browsers lacking native CSS scroll timeline support)
    const header = document.querySelector('.site-header');
    
    if (header && !CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
        const scrollDistance = 100;
        
        const handleScroll = () => {
            if (window.scrollY > scrollDistance) {
                header.classList.add('shrunk');
            } else {
                header.classList.remove('shrunk');
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger initial state
    }
    
    // 2. Carousel Horizontal Scroll Arrow Clicks
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (track && prevBtn && nextBtn) {
        const scrollAmount = 300; // Average card width + gap
        
        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // 3. FAQ Accordion Handling (Crawlable Raw HTML support)
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.parentElement;
            const faqContent = trigger.nextElementSibling;
            
            // Check if open
            const isOpen = faqItem.classList.contains('open');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
                item.querySelector('.faq-content').style.maxHeight = null;
            });
            
            // Toggle clicked item
            if (!isOpen) {
                faqItem.classList.add('open');
                faqContent.style.maxHeight = faqContent.scrollHeight + "px";
            }
        });
    });
    
    // 4. Enquiry Form Submission Simulation
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = enquiryForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Submitting...';
            
            setTimeout(() => {
                const successMsg = document.createElement('div');
                successMsg.className = 'glass-card';
                successMsg.style.position = 'fixed';
                successMsg.style.top = '50%';
                successMsg.style.left = '50%';
                successMsg.style.transform = 'translate(-50%, -50%)';
                successMsg.style.zIndex = '2000';
                successMsg.style.textAlign = 'center';
                successMsg.style.maxWidth = '400px';
                successMsg.style.width = '90%';
                successMsg.style.border = '1px solid var(--color-gold)';
                successMsg.style.color = '#FFFFFF';
                successMsg.innerHTML = `
                    <h3 style="font-family: var(--font-headings); color: var(--color-gold); margin-bottom: 12px; font-size: 1.8rem;">Enquiry Received!</h3>
                    <p style="margin-bottom: 20px; font-size: 0.95rem; font-family: var(--font-body); line-height: 1.6;">Thank you for reaching out. A representative from Palak & Arya's team will contact you within 2 hours.</p>
                    <button class="btn btn-primary" id="close-success-btn" style="width: 120px;">Done</button>
                `;
                
                document.body.appendChild(successMsg);
                enquiryForm.reset();
                btn.disabled = false;
                btn.textContent = originalText;
                
                document.getElementById('close-success-btn').addEventListener('click', () => {
                    successMsg.remove();
                });
            }, 1500);
        });
    }
    
    // 5. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            siteNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu on link click
        const navLinks = siteNav.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
});
