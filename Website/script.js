// DOM Elements and initialization
document.addEventListener('DOMContentLoaded', function() {
  // Get all DOM elements
  const video = document.getElementById('heroVideo');
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const moreWorksBtn = document.querySelector('.more-works-btn');
  const hiddenWorks = document.querySelector('.hidden-works');
  let lastScroll = window.scrollY;

  // Video event listeners
  video.addEventListener('error', function(e) {
    console.error('Error loading video:', e);
  });
  
  video.addEventListener('loadeddata', function() {
    console.log('Video loaded successfully');
  });

  // Handle More Works button
  if (moreWorksBtn && hiddenWorks) {
    moreWorksBtn.addEventListener('click', function() {
      if (!hiddenWorks.classList.contains('show')) {
        hiddenWorks.style.display = 'grid';
        setTimeout(() => {
          hiddenWorks.classList.add('show');
        }, 10);
      } else {
        hiddenWorks.classList.remove('show');
        setTimeout(() => {
          hiddenWorks.style.display = 'none';
        }, 500); // Match transition duration
      }
      
      this.classList.toggle('active');
      
      // Update button text
      const btnText = this.querySelector('span');
      btnText.textContent = hiddenWorks.classList.contains('show') ? 'Show Less' : 'More Works';
      
      if (!hiddenWorks.classList.contains('show')) {
        // Smooth scroll back to main portfolio section
        setTimeout(() => {
          document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }

  // Handle video play/pause functionality
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
      const portfolioVideo = this.closest('.video-container').querySelector('video');
      if (portfolioVideo.paused) {
        // Pause all other videos first
        document.querySelectorAll('.portfolio-video').forEach(v => v.pause());
        portfolioVideo.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        portfolioVideo.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  });

  // Mobile menu toggle functionality
  function toggleMenu() {
    const isOpen = navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  }

  navToggle.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Navigation background change on scroll
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.style.background = currentScroll > 50 
      ? 'rgba(10,10,10,0.95)' 
      : 'transparent';
      
    // Hide nav on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.portfolio-item, .service-item').forEach(item => {
    observer.observe(item);
  });

  // Map zoom controls (CSS transform scale on iframe)
  const mapEl = document.querySelector('.site-map');
  const zoomInBtn = document.querySelector('.map-zoom-in');
  const zoomOutBtn = document.querySelector('.map-zoom-out');
  if (mapEl && zoomInBtn && zoomOutBtn) {
    let scale = 1;
    const minScale = 0.9;
    const maxScale = 1.6;
    const step = 0.1;

    function applyScale() {
      mapEl.style.transform = `scale(${scale})`;
      zoomOutBtn.disabled = scale <= minScale + 0.001;
      zoomInBtn.disabled = scale >= maxScale - 0.001;
      const disabledStyle = 'opacity:0.5;cursor:not-allowed;';
      zoomInBtn.style.cssText = zoomInBtn.disabled ? disabledStyle : '';
      zoomOutBtn.style.cssText = zoomOutBtn.disabled ? disabledStyle : '';
    }

    zoomInBtn.addEventListener('click', () => {
      scale = Math.min(maxScale, +(scale + step).toFixed(2));
      applyScale();
    });

    zoomOutBtn.addEventListener('click', () => {
      scale = Math.max(minScale, +(scale - step).toFixed(2));
      applyScale();
    });

    applyScale();
  }

  // Removed temporary mobile viewport height adjustment
});