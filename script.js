document.addEventListener('DOMContentLoaded', () => {

    // --- Image Slider Setup ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
  
    if (slides.length > 0) {
      setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 4000); 
    }
  
    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const answer = i.querySelector('.faq-answer');
          if (answer) answer.style.maxHeight = null;
        });
        
        // Open the clicked one if it wasn't already open
        if (!isActive) {
          item.classList.add('active');
          const answer = item.querySelector('.faq-answer');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        }
      });
    });
  
    // --- Element Selectors ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const privacyModal = document.getElementById('privacyModal');
    const inquiryForm = document.getElementById('inquiryForm');
    const formAlert = document.getElementById('formAlert');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Privacy Buttons
    const privacyBtn = document.getElementById('privacyBtn');
    const privacyBtnMobile = document.getElementById('privacyBtnMobile');
    const privacyFooterBtn = document.getElementById('privacyFooterBtn');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
  
    // --- Mobile Drawer Toggle Logic ---
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        const bars = menuToggle.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('open')) {
          bars[0].style.transform = 'rotate(-45deg) translate(-5px, 5px)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    }
  
    // --- Privacy Modal Open & Close Functions ---
    const toggleModal = (show) => {
      if (privacyModal) {
        if (show) {
          privacyModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        } else {
          privacyModal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      }
    };
  
    [privacyBtn, privacyBtnMobile, privacyFooterBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (mobileMenu) mobileMenu.classList.remove('open');
          toggleModal(true);
        });
      }
    });
  
    [closeModal, closeModalBtn].forEach(btn => {
      if (btn) btn.addEventListener('click', () => toggleModal(false));
    });
  
    if (privacyModal) {
      privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) toggleModal(false);
      });
    }
  
    // --- Contact Form Submission Framework ---
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
  
        const recipientEmail = "mujahedahmed028@gmail.com";
        const emailSubject = "USA Career Link - Submit Inquiry";
        const emailBody = `New Inquiry Details:\n------------------------------------------\nFull Name: ${fullName}\nEmail: ${email}\nDirect Phone: ${phone}\n\nMessage:\n${message}\n------------------------------------------\nSent automatically via USA Career Link.`;
  
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
        if (formAlert) {
          formAlert.classList.remove('hidden');
        }
  
        setTimeout(() => {
          window.location.href = mailtoUrl;
          inquiryForm.reset();
          if (formAlert) formAlert.classList.add('hidden');
        }, 800);
      });
    }
  
    // --- Viewport Scroll Tracker for Active Nav Highlighting & Scroll To Top Button ---
    const targetSections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.desktop-nav .nav-link');
  
    window.addEventListener('scroll', () => {
      // 1. Scroll To Top Logic
      if (scrollToTopBtn) {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.remove('hidden');
        } else {
          scrollToTopBtn.classList.add('hidden');
        }
      }
  
      // 2. Nav Highlighting Logic
      let currentActiveId = '';
      const scrollPosition = window.scrollY + 200; 
  
      targetSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentActiveId = section.getAttribute('id');
        }
      });
  
      navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}` || link.getAttribute('href') === `index.html#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    });
  
    // --- Scroll to Top Button Action ---
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
  });