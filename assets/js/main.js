document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle (Dark/Light Mode) ---
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      document.documentElement.classList.toggle('dark');
      
      // Update icon based on mode
      const isLight = document.documentElement.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      
      themeToggleBtns.forEach(b => {
        b.innerHTML = isLight 
          ? '<i class="fa-solid fa-moon text-slate-800"></i>' 
          : '<i class="fa-solid fa-sun text-yellow-400"></i>';
      });
    });
    
    // Set initial icon
    const isLight = document.documentElement.classList.contains('light-mode');
    btn.innerHTML = isLight 
      ? '<i class="fa-solid fa-moon text-slate-800"></i>' 
      : '<i class="fa-solid fa-sun text-yellow-400"></i>';
  });

  // --- Mobile Navigation Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      }
    });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));

  // --- Set Active Nav Link based on URL ---
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll('.nav-link');
  const navLength = navLinks.length;
  for (let i = 0; i < navLength; i++) {
    if (navLinks[i].href === currentLocation) {
      navLinks[i].classList.add("active");
    }
  }
  // --- RTL Toggle ---
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  
  const savedDir = localStorage.getItem('dir');
  if (savedDir === 'rtl') {
    document.documentElement.dir = 'rtl';
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.classList.remove('rtl');
  }

  const updateRTLButtons = (dir) => {
    rtlToggleBtns.forEach(b => {
      b.innerHTML = `<span class="text-xs font-bold">${dir === 'rtl' ? 'LTR' : 'RTL'}</span>`;
    });
  };

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRTL = document.documentElement.dir === 'rtl';
      const newDir = isRTL ? 'ltr' : 'rtl';
      document.documentElement.dir = newDir;
      if (newDir === 'rtl') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
      localStorage.setItem('dir', newDir);
      updateRTLButtons(newDir);
    });
    
    // Set initial text
    const currentDir = document.documentElement.dir || 'ltr';
    btn.innerHTML = `<span class="text-xs font-bold">${currentDir === 'rtl' ? 'LTR' : 'RTL'}</span>`;
  });

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.id = 'scroll-to-top';
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
