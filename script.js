document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect
  function typeWriter(element, text, delay) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, delay);
      }
    }
    type();
  }

  const typedTextElement = document.getElementById('typedText');
  const fullText = "Hi, I’m Jannatul Bakia";
  typedTextElement.textContent = ""; // Clear initial text
  typeWriter(typedTextElement, fullText, 100); // 100ms delay between each character

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        nav.classList.remove('open');
        menuBtn.classList.remove('active');
      }
    });
  });

  // Download Resume
  document.getElementById('downloadResume').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'resume.pdf'; // Resume file
    link.download = 'Jannatul_Bakia_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lbContent = document.getElementById('lbContent');
  const lbClose = document.getElementById('lbClose');

  // Show lightbox with image
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
      const imageSrc = this.getAttribute('data-image');
      lbContent.innerHTML = `<img src="${imageSrc}" alt="Project Image" />`;
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  // Close lightbox
  lbClose.addEventListener('click', () => {
    lightbox.setAttribute('aria-hidden', 'true');
    lbContent.innerHTML = ''; // Clear content
  });

  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('section');
  const options = { root: null, threshold: 0.1 };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));

  // Copy email functionality
  document.querySelectorAll('.email-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default mailto action
      const email = link.getAttribute('data-email');
      
      // Copy email to clipboard
      navigator.clipboard.writeText(email).then(() => {
        alert(`Email address ${email} copied to clipboard!`);
      }).catch(err => {
        console.error('Could not copy email: ', err);
      });
    });
  });
});