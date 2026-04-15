(function() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", function() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  navMenu.addEventListener("click", function(e) {
    if (e.target.tagName === "A") {
      menuToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("active");
    }
  });
})();
