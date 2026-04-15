(function () {
  let searchIndex = null;
  let searchDocuments = null;
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchButton = document.getElementById("search-button");

  // Detect language from data attribute or URL
  function detectLanguage() {
    const bodyLang = document.body.getAttribute("data-language");
    if (bodyLang && bodyLang !== "") return bodyLang;

    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang !== "en") return htmlLang;

    // Fallback: detect from URL path
    if (window.location.pathname.startsWith("/ru/") || window.location.pathname === "/ru") {
      return "ru";
    }
    return "en";
  }

  const currentLang = detectLanguage();

  if (!searchInput || !searchResults) return;

  // Load search index
  async function loadSearchIndex() {
    try {
      const response = await fetch(`/search-index-${currentLang}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      searchIndex = lunr.Index.load(data.index);
      searchDocuments = data.documents;
      console.log(`Search index loaded for language: ${currentLang}`, searchIndex);
    } catch (error) {
      console.warn("Failed to load search index for language:", currentLang, error);
      // Try fallback to English
      if (currentLang !== "en") {
        try {
          const response = await fetch("/search-index-en.json");
          if (response.ok) {
            const data = await response.json();
            searchIndex = lunr.Index.load(data.index);
            searchDocuments = data.documents;
          }
        } catch (e) {
          console.error("Failed to load fallback search index:", e);
        }
      }
    }
  }

  // Expand query with synonyms
  function expandQuery(query, synonyms) {
    const terms = query.toLowerCase().split(/\s+/);
    const expanded = [...terms];

    terms.forEach(term => {
      Object.keys(synonyms).forEach(key => {
        if (synonyms[key].includes(term) || term === key) {
          expanded.push(key, ...synonyms[key]);
        }
      });
    });

    return [...new Set(expanded)].join(" ");
  }

  // Perform search
  function performSearch(query) {
    if (!searchIndex || !searchDocuments || !query.trim()) {
      searchResults.innerHTML = "";
      searchResults.classList.remove("active");
      return;
    }

    try {
      const synonyms = window.synonyms || {};
      const expandedQuery = expandQuery(query, synonyms);

      let results;
      try {
        results = searchIndex.search(expandedQuery);
      } catch (e) {
        // If lunr query syntax error, try wildcard search
        results = searchIndex.search(query + "*");
      }

      const noResultsText = currentLang === "ru" ? "Ничего не найдено" : "No results found";

      if (results.length === 0) {
        searchResults.innerHTML = `<div class='search-no-results'>${noResultsText}</div>`;
        searchResults.classList.add("active");
        return;
      }

      let html = "<ul class='search-results-list'>";
      results.slice(0, 10).forEach(result => {
        const doc = searchDocuments.find(d => d.url === result.ref);
        if (!doc) return;

        // Clean up snippet - remove markdown syntax
        const cleanContent = doc.content
          .replace(/#{1,6}\s/g, "")
          .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
          .replace(/`([^`]+)`/g, "$1")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/---/g, "")
          .trim();
        const snippet = cleanContent.substring(0, 150) + "...";

        html += `
          <li class="search-result-item">
            <a href="${doc.url}">
              <h4>${doc.title}</h4>
              <p>${snippet}</p>
            </a>
          </li>
        `;
      });
      html += "</ul>";

      searchResults.innerHTML = html;
      searchResults.classList.add("active");
    } catch (error) {
      console.error("Search error:", error);
      const errorText = currentLang === "ru" ? "Ошибка поиска" : "Search error occurred";
      searchResults.innerHTML = `<div class='search-error'>${errorText}</div>`;
      searchResults.classList.add("active");
    }
  }

  // Debounce function
  let debounceTimer;
  function debounce(fn, delay) {
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Event listeners
  searchInput.addEventListener("input", debounce(function (e) {
    const query = e.target.value;
    if (query.length >= 2) {
      performSearch(query);
    } else {
      searchResults.innerHTML = "";
      searchResults.classList.remove("active");
    }
  }, 200));

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      searchResults.classList.remove("active");
      searchInput.blur();
    }
  });

  if (searchButton) {
    searchButton.addEventListener("click", function () {
      performSearch(searchInput.value);
    });
  }

  // Close search results when clicking outside
  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove("active");
    }
  });

  // Load index on page load
  loadSearchIndex();
})();
