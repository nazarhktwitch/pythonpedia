(function() {
  // Load Prism.js for syntax highlighting
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  }

  // Add copy button to code blocks
  document.querySelectorAll("pre code").forEach(function(codeBlock) {
    const pre = codeBlock.parentElement;
    if (pre.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.setAttribute("aria-label", "Copy code");
    button.textContent = "Copy";

    button.addEventListener("click", function() {
      const text = codeBlock.textContent;
      navigator.clipboard.writeText(text).then(function() {
        button.textContent = "Copied!";
        setTimeout(function() {
          button.textContent = "Copy";
        }, 2000);
      });
    });

    pre.style.position = "relative";
    pre.appendChild(button);
  });
})();
