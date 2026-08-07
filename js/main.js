/* ME Pilates Institute - Interactive Actions & Fallbacks */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Pre-fill Enquiry Form based on URL Query Parameters (Register Now clicks)
    const urlParams = new URLSearchParams(window.location.search);
    const interest = urlParams.get('interest');
    const interestDropdown = document.getElementById('interest');
    
    if (interestDropdown && interest) {
        // Try to find direct option match
        let matchedOption = Array.from(interestDropdown.options).find(opt => 
            opt.value === interest || opt.value.toLowerCase() === interest.toLowerCase()
        );
        
        // Try partial match if no direct match
        if (!matchedOption) {
            matchedOption = Array.from(interestDropdown.options).find(opt => 
                interest.toLowerCase().includes(opt.value.toLowerCase()) ||
                opt.value.toLowerCase().includes(interest.toLowerCase())
            );
        }
        
        // Fallbacks for category routing
        if (!matchedOption) {
            if (interest.includes('yoga') || interest.includes('traditional') || interest.includes('power') || interest.includes('bungee') || interest.includes('aerial') || interest.includes('wheel') || interest.includes('belt') || interest.includes('chair') || interest.includes('iyengar') || interest.includes('circuit')) {
                matchedOption = Array.from(interestDropdown.options).find(opt => 
                    opt.value === 'classes' || opt.value === 'aerial'
                );
            } else {
                matchedOption = Array.from(interestDropdown.options).find(opt => 
                    opt.value === 'classes' || opt.value === 'reformer'
                );
            }
        }
        
        if (matchedOption) {
            interestDropdown.value = matchedOption.value;
        }
    }
    
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
    
    // 4. Enquiry Form Submission - Redirect to WhatsApp
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather input fields
            const nameInput = enquiryForm.querySelector('[name="name"]') || enquiryForm.querySelector('[name="fullName"]');
            const phoneInput = enquiryForm.querySelector('[name="phone"]');
            const emailInput = enquiryForm.querySelector('[name="email"]');
            const interestSelect = enquiryForm.querySelector('[name="interest"]');
            const contactTimeSelect = enquiryForm.querySelector('[name="contactTime"]');
            const messageInput = enquiryForm.querySelector('[name="message"]');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const interest = interestSelect ? interestSelect.options[interestSelect.selectedIndex].text : '';
            const contactTime = contactTimeSelect ? contactTimeSelect.options[contactTimeSelect.selectedIndex].text : '';
            const message = messageInput ? messageInput.value.trim() : '';
            
            // Format WhatsApp Message
            let waMessage = `*New Enquiry - ME Pilates Institute*\n\n`;
            waMessage += `• *Name:* ${name}\n`;
            waMessage += `• *Phone:* ${phone}\n`;
            waMessage += `• *Email:* ${email}\n`;
            waMessage += `• *Interested In:* ${interest}\n`;
            if (contactTime) {
                waMessage += `• *Preferred Contact Time:* ${contactTime}\n`;
            }
            if (message) {
                waMessage += `• *Message/Goals:* ${message}\n`;
            }
            
            const btn = enquiryForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Connecting...';
            
            // Trigger WhatsApp Redirect
            const waUrl = `https://api.whatsapp.com/send?phone=918077978450&text=${encodeURIComponent(waMessage)}`;
            
            // Show custom premium redirect confirmation modal
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
            successMsg.style.background = '#111d15';
            successMsg.style.padding = '32px';
            successMsg.style.borderRadius = '16px';
            successMsg.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
            successMsg.innerHTML = `
                <h3 style="font-family: var(--font-headings); color: var(--color-gold); margin-bottom: 12px; font-size: 1.8rem;">Enquiry Form Ready</h3>
                <p style="margin-bottom: 20px; font-size: 0.95rem; font-family: var(--font-body); line-height: 1.6; color: rgba(255,255,255,0.85);">Opening WhatsApp to securely send your details to our front desk team.</p>
                <button class="btn btn-primary" id="close-success-btn" style="width: 120px; margin: 0 auto; display: block;">Okay</button>
            `;
            
            document.body.appendChild(successMsg);
            enquiryForm.reset();
            btn.disabled = false;
            btn.textContent = originalText;
            
            // Redirect
            window.open(waUrl, '_blank');
            
            document.getElementById('close-success-btn').addEventListener('click', () => {
                successMsg.remove();
            });
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
