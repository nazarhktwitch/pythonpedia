const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("_data");
  eleventyConfig.addPassthroughCopy("assets/js/service-worker.js");

  // Watch for changes in assets
  eleventyConfig.addWatchTarget("assets");

  // Markdown options - using default markdown-it
  // Can be extended later with markdown-it plugins if needed

  // Filters
  eleventyConfig.addFilter("dateDisplay", require("./filters/date-display.js"));

  // Shortcodes
  eleventyConfig.addShortcode("toc", function(headings) {
    if (!headings || headings.length === 0) return "";
    let html = "<nav class=\"toc\" aria-label=\"Table of contents\"><ul>";
    headings.forEach(heading => {
      const id = heading.text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      html += `<li><a href="#${id}">${heading.text}</a></li>`;
    });
    html += "</ul></nav>";
    return html;
  });

  // Add global data
  eleventyConfig.addGlobalData("synonyms", require("./_data/synonyms.json"));

  // Configure Nunjucks to find .njk layouts
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: false
  });

  // Collections for all languages
  const languages = ["en", "ru"];

  languages.forEach(lang => {
    eleventyConfig.addCollection(`stdlib_${lang}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob(`content/${lang}/stdlib/**/*.md`);
    });

    eleventyConfig.addCollection(`frameworks_${lang}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob(`content/${lang}/frameworks/**/*.md`);
    });

    eleventyConfig.addCollection(`practices_${lang}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob(`content/${lang}/practices/**/*.md`);
    });

    eleventyConfig.addCollection(`standards_${lang}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob(`content/${lang}/standards/**/*.md`);
    });

    eleventyConfig.addCollection(`all_${lang}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob(`content/${lang}/**/*.md`);
    });
  });

  // Generate search index
  eleventyConfig.on("eleventy.after", async function() {
    try {
      const lunr = require("lunr");
      const synonyms = require("./_data/synonyms.json");

      languages.forEach(lang => {
        const contentDir = path.join(__dirname, "content", lang);
        const outputDir = path.join(__dirname, "_site");
        const indexPath = path.join(outputDir, `search-index-${lang}.json`);

        if (!fs.existsSync(contentDir)) return;

        const files = [];
        function walkDir(dir, fileList = []) {
          if (!fs.existsSync(dir)) return fileList;
          const dirFiles = fs.readdirSync(dir);
          dirFiles.forEach(file => {
            const filePath = path.join(dir, file);
            try {
              const stat = fs.statSync(filePath);
              if (stat.isDirectory()) {
                walkDir(filePath, fileList);
              } else if (file.endsWith(".md")) {
                fileList.push(filePath);
              }
            } catch (e) {
              // Skip files that can't be read
            }
          });
          return fileList;
        }
       
        const mdFiles = walkDir(contentDir);
        mdFiles.forEach(filePath => {
          try {
            const content = fs.readFileSync(filePath, "utf-8");
            const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
            const body = frontmatter ? content.replace(/^---\n[\s\S]*?\n---\n/, "") : content;
           
            let title = path.basename(filePath, ".md");
            let url = filePath.replace(contentDir, "").replace(/\\/g, "/").replace(/\.md$/, "");
            if (url.endsWith("/index")) url = url.replace("/index", "/");
            if (!url.startsWith("/")) url = `/${lang}${url}`;

            if (frontmatter) {
              const fm = frontmatter[1];
              const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)["']?/);
              if (titleMatch) title = titleMatch[1];
            }
           
            // Expand synonyms in content
            let expandedContent = body;
            Object.keys(synonyms).forEach(key => {
              const syns = synonyms[key];
              syns.forEach(syn => {
                const regex = new RegExp(`\\b${syn}\\b`, "gi");
                expandedContent = expandedContent.replace(regex, `${syn} ${key}`);
              });
            });

            files.push({
              title: title,
              url: url,
              content: body + " " + expandedContent
            });
          } catch (e) {
            // Skip files that can't be processed
          }
        });

        if (files.length === 0) return;

        const idx = lunr(function() {
          this.ref("url");
          this.field("title", { boost: 10 });
          this.field("content");

          files.forEach(doc => {
            this.add(doc);
          });
        });
       
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
       
        fs.writeFileSync(indexPath, JSON.stringify({
          index: idx.toJSON(),
          documents: files
        }));
      });
    } catch (error) {
      console.error("Error generating search index:", error);
    }
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },    
    templateFormats: ["md","njk","html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  }
};
