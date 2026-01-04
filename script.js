document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect with enhanced animation
  function typeWriter() {
    const typedTextElement = document.getElementById('typedText');
    const fullText = "Hi, I'm Jannatul Bakia";
    const speed = 100;
    let i = 0;
    
    typedTextElement.innerHTML = "";
    
    function type() {
      if (i < fullText.length) {
        const char = fullText.charAt(i);
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animation = 'fadeIn 0.1s ease';
        typedTextElement.appendChild(span);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing effect
  setTimeout(typeWriter, 500);

  // Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking on nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        // Close mobile menu if open
        nav.classList.remove('open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
        
        // Scroll to target
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Download Resume
  const downloadBtn = document.getElementById('downloadResume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Check if resume exists
      fetch('resume.pdf')
        .then(response => {
          if (response.ok) {
            // Create download link
            const link = document.createElement('a');
            link.href = 'resume.pdf';
            link.download = 'Jannatul_Bakia_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success feedback
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Resume Downloaded!';
            downloadBtn.style.background = '#10b981';
            
            setTimeout(() => {
              downloadBtn.innerHTML = originalText;
              downloadBtn.style.background = '';
            }, 2000);
          } else {
            // Resume not found
            downloadBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Resume Coming Soon!';
            downloadBtn.style.background = '#f59e0b';
            
            setTimeout(() => {
              downloadBtn.innerHTML = 'Download Resume <i class="fas fa-download"></i>';
              downloadBtn.style.background = '';
            }, 2000);
          }
        })
        .catch(() => {
          // Error handling
          downloadBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Resume Coming Soon!';
          downloadBtn.style.background = '#f59e0b';
          
          setTimeout(() => {
            downloadBtn.innerHTML = 'Download Resume <i class="fas fa-download"></i>';
            downloadBtn.style.background = '';
          }, 2000);
        });
    });
  }

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lbContent = document.getElementById('lbContent');
  const lbClose = document.getElementById('lbClose');

  // Show lightbox with image
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const imageSrc = this.getAttribute('data-image');
      if (imageSrc) {
        lbContent.innerHTML = `<img src="${imageSrc}" alt="Project Screenshot" />`;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  lbClose.addEventListener('click', () => {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  // Close lightbox on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Close lightbox when clicking outside
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Intersection Observer for scroll animations
  const animatedElements = document.querySelectorAll('.project-card, .profile-card, .edu-item, .contact-item');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });

  // Copy email functionality
  document.querySelectorAll('.email-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const email = link.getAttribute('data-email') || link.getAttribute('href').replace('mailto:', '');
      
      // Create temporary input element
      const tempInput = document.createElement('input');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      tempInput.setSelectionRange(0, 99999); // For mobile devices
      
      // Copy to clipboard
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          // Show tooltip
          const tooltip = document.createElement('div');
          tooltip.textContent = 'Email copied to clipboard!';
          tooltip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            animation: slideUp 0.3s ease;
          `;
          document.body.appendChild(tooltip);
          
          setTimeout(() => {
            tooltip.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => tooltip.remove(), 300);
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy email:', err);
        window.location.href = `mailto:${email}`;
      }
      
      document.body.removeChild(tempInput);
    });
  });

  // Add hover effect to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Form submission handling (if you add a contact form later)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Add form submission logic here
    });
  }

  // Initialize animations on page load
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Add CSS for dynamically created elements
const style = document.createElement('style');
style.textContent = `
  body.loaded .hero-image img {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;
document.head.appendChild(style);