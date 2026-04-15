(function() {
  // Load Prism.js for syntax highlighting
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  }

  // Add copy and "Try it" buttons to code blocks
  document.querySelectorAll("pre code").forEach(function(codeBlock) {
    const pre = codeBlock.parentElement;
    if (pre.querySelector(".code-buttons")) return;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "code-buttons";

    // Copy button
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.setAttribute("aria-label", "Copy code");
    copyButton.textContent = "Copy";

    copyButton.addEventListener("click", function() {
      const text = codeBlock.textContent;
      navigator.clipboard.writeText(text).then(function() {
        copyButton.textContent = "Copied!";
        setTimeout(function() {
          copyButton.textContent = "Copy";
        }, 2000);
      });
    });

    buttonsContainer.appendChild(copyButton);

    // Try it button
    if (codeBlock.classList.contains("language-python")) {
      const tryButton = document.createElement("button");
      tryButton.className = "try-button";
      tryButton.setAttribute("aria-label", "Try code in sandbox");
      tryButton.innerHTML = '<i class="fas fa-play"></i> Try it';

      tryButton.addEventListener("click", function() {
        const code = codeBlock.textContent;
        // Create or focus sandbox container
        let sandbox = document.querySelector(".sandbox-container");
        if (!sandbox) {
          sandbox = document.createElement("div");
          sandbox.className = "sandbox-container";
          codeBlock.parentElement.parentElement.appendChild(sandbox);
        }
        
        // Set code in sandbox editor if it exists, or trigger initialization
        const editor = sandbox.querySelector(".sandbox-editor");
        if (editor) {
          editor.value = code;
        } else {
          // Initialize sandbox if not already done
          if (typeof initSandbox === 'function') {
            initSandbox(sandbox, code);
          }
        }
        
        // Scroll to sandbox
        sandbox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });

      buttonsContainer.appendChild(tryButton);
    }

    pre.style.position = "relative";
    pre.appendChild(buttonsContainer);
  });
})();
