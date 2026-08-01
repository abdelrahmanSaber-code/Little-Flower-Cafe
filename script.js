/* =====================================================================
   LITTLE FLOWER CAFE — SCRIPT
   Small, focused behaviors only:
     1. Mobile nav toggle
     2. Sticky header shadow on scroll
     3. Scroll-cue button scrolls to the next section
     4. Menu category filter tabs
     5. Scroll-reveal animation via IntersectionObserver
     6. Footer year
   No frameworks — everything is plain DOM APIs so it's easy to read
   and easy to lift pieces out of.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile nav toggle ---------- */
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu after tapping a link, so users land on the
    // section instead of staring at an open menu.
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Sticky header shadow on scroll ---------- */
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set initial state in case the page loads mid-scroll

  /* ---------- 3. Scroll-cue button ---------- */
  const scrollCue = document.getElementById('scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const nextSection = document.getElementById('story');
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- 4. Menu category filter tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update tab visual + a11y state
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // Show/hide menu items that match the selected category
      items.forEach((item) => {
        const matches = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });

  /* ---------- 5. Scroll-reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once, then stop watching
          }
        });
      },
      { threshold: 0.2 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers: just show everything immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 6. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
