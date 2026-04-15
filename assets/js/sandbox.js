(function() {
  let pyodide = null;
  let pyodideLoading = false;
  const sandboxContainers = document.querySelectorAll(".sandbox-container");

  async function initPyodide() {
    if (pyodide) return pyodide;
    if (pyodideLoading) return null; // Avoid multiple parallel loads

    pyodideLoading = true;
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "sandbox-loading";
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initializing Python Runtime...';

    // Get all current and future sandboxes
    document.querySelectorAll(".sandbox-container").forEach(container => {
      const existing = container.querySelector(".sandbox-loading");
      if (!existing) {
        container.appendChild(loadingIndicator.cloneNode(true));
      }
    });

    try {
      if (typeof window.loadPyodide === "undefined") {
        // Fallback if script tag fails or not yet ready
        await new Promise((resolve) => {
           const check = () => {
             if (typeof window.loadPyodide !== "undefined") resolve();
             else setTimeout(check, 100);
           };
           check();
        });
      }

      pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
      });

      // Warm up
      await pyodide.loadPackage("micropip");

      document.querySelectorAll(".sandbox-container").forEach(container => {
        const loading = container.querySelector(".sandbox-loading");
        if (loading) loading.remove();
        const runBtn = container.querySelector(".sandbox-run");
        if (runBtn) runBtn.disabled = false;
      });

      pyodideLoading = false;
      return pyodide;
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      document.querySelectorAll(".sandbox-container").forEach(container => {
        const loading = container.querySelector(".sandbox-loading");
        if (loading) {
          loading.textContent = "Error: Could not load Python. Check your internet connection.";
          loading.className = "sandbox-error";
        }
      });
      pyodideLoading = false;
      return null;
    }
  }

  function createSandbox(container, initialCode = "") {
    const editor = document.createElement("textarea");
    editor.className = "sandbox-editor";
    editor.value = initialCode || "";
    editor.setAttribute("spellcheck", "false");
    editor.setAttribute("placeholder", "# Write your Python code here...\nprint('Hello, World!')");

    const output = document.createElement("div");
    output.className = "sandbox-output";

    const controls = document.createElement("div");
    controls.className = "sandbox-controls";

    const runButton = document.createElement("button");
    runButton.className = "sandbox-run";
    runButton.innerHTML = '<i class="fas fa-play"></i> Run';
    
    const clearButton = document.createElement("button");
    clearButton.className = "sandbox-clear";
    clearButton.innerHTML = '<i class="fas fa-eraser"></i> Clear';

    const resetButton = document.createElement("button");
    resetButton.className = "sandbox-reset";
    resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset';

    controls.appendChild(runButton);
    controls.appendChild(clearButton);
    controls.appendChild(resetButton);

    container.innerHTML = ""; // Clear any placeholder text
    container.appendChild(editor);
    container.appendChild(controls);
    container.appendChild(output);

    runButton.addEventListener("click", async function() {
      if (runButton.disabled) return;
      
      runButton.disabled = true;
      runButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Running...';
      
      if (!pyodide) {
        pyodide = await initPyodide();
        if (!pyodide) {
          runButton.disabled = false;
          runButton.innerHTML = '<i class="fas fa-play"></i> Run';
          return;
        }
      }

      const code = editor.value;
      output.innerHTML = "";
      output.className = "sandbox-output";

      try {
        // Redefine stdout/stderr for each run to capture it
        await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);
        
        await pyodide.runPythonAsync(code);
        
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");
        
        if (stderr) {
          output.textContent = stderr + (stdout ? "\\n" + stdout : "");
          output.className = "sandbox-output error";
        } else if (stdout) {
          output.textContent = stdout;
          output.className = "sandbox-output success";
        } else {
          output.textContent = "# Program finished with no output";
          output.className = "sandbox-output success";
        }
      } catch (error) {
        output.textContent = error.message;
        output.className = "sandbox-output error";
      } finally {
        runButton.disabled = false;
        runButton.innerHTML = '<i class="fas fa-play"></i> Run';
      }
    });

    clearButton.addEventListener("click", function() {
      output.innerHTML = "";
      output.className = "sandbox-output";
    });

    resetButton.addEventListener("click", function() {
      editor.value = initialCode;
      output.innerHTML = "";
      output.className = "sandbox-output";
    });
  }

  // Initialize sandboxes on page load
  if (sandboxContainers.length > 0) {
    sandboxContainers.forEach(container => {
      const code = container.getAttribute("data-code") || "";
      createSandbox(container, code);
    });
  }

  // Expose createSandbox globally so code-highlight.js can use it
  window.initSandbox = createSandbox;

  // Global lazy loader for any buttons with "sandbox-run" class
  document.addEventListener("click", async function(e) {
    if (e.target.closest(".sandbox-run") && !pyodide) {
      await initPyodide();
    }
  });

})();
