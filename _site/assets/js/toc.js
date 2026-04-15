(function() {
  function generateTOC() {
    const main = document.getElementById("main-content");
    if (!main) return;

    const headings = main.querySelectorAll("h2, h3");
    if (headings.length === 0) return;

    // Add IDs to headings
    headings.forEach(heading => {
      if (!heading.id) {
        const id = heading.textContent.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
        heading.id = id;
      }
    });

    // Generate TOC
    const toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "Table of contents");

    const tocList = document.createElement("ul");

    headings.forEach(heading => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = heading.tagName === "H3" ? "toc-h3" : "toc-h2";
      item.appendChild(link);
      tocList.appendChild(item);
    });

    toc.appendChild(tocList);
    
    // Insert TOC after first heading or at start of main
    const firstHeading = main.querySelector("h1, h2");
    if (firstHeading) {
      firstHeading.parentNode.insertBefore(toc, firstHeading.nextSibling);
    } else {
      main.insertBefore(toc, main.firstChild);
    }
  }

  // Generate TOC when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", generateTOC);
  } else {
    generateTOC();
  }
})();
