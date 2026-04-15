document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('global-sidebar');
  const overlay = document.getElementById('global-sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const closeBtn = document.getElementById('close-sidebar-btn');

  // Toggle sidebar
  const openSidebar = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Fast block scrolling on background
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', openSidebar);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Accordion Logic
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', function() {
      const parent = this.parentElement;
      const wasActive = parent.classList.contains('active');
      
      // Optional: Close other accordions
      // document.querySelectorAll('.accordion').forEach(a => a.classList.remove('active'));
      
      if (!wasActive) {
        parent.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      } else {
        parent.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Optional: automatically open the accordion that matches the current active page
  const currentPath = window.location.pathname;
  const allLinks = document.querySelectorAll('.accordion-content .sidebar-link, .accordion-content a');
  allLinks.forEach(link => {
    // Basic heuristics to match paths exactly or sub-paths
    if (link.getAttribute('href') === currentPath || (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
      link.classList.add('active');
      const accordionNode = link.closest('.accordion');
      if (accordionNode) {
        accordionNode.classList.add('active');
        accordionNode.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
      }
    }
  });

});
