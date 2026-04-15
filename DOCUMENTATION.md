# Pythonpedia Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development](#development)
3. [Content Guidelines](#content-guidelines)
4. [Deployment](#deployment)

## Project Overview

Pythonpedia is a documentation portal for Python, hosted on GitHub Pages. It provides comprehensive documentation for:

- Python Standard Library
- Popular frameworks (Django, Flask, FastAPI, etc.)
- Best practices and patterns
- Common pitfalls
- Code standards

## Development

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Setup

```bash
npm install
```

### Development Server

```bash
npm run serve
```

Starts development server at `http://localhost:8080`

### Build

```bash
npm run build
```

Generates static site in `_site/` directory

### Watch Mode

```bash
npm run dev
```

Runs development server with file watching

## Content Guidelines

### Markdown Files

All content files use Markdown with YAML frontmatter:

```markdown
---
layout: base.njk
title: Page Title
description: Page description for SEO
language: en
python_version_introduced: "3.8"
python_version_deprecated: null
tags: ["tag1", "tag2"]
synonyms: ["alternative", "term"]
related: ["related-page"]
---

# Content

Page content in Markdown format.
```

### Frontmatter Fields

- `layout`: Template to use (usually `base.njk`)
- `title`: Page title
- `description`: Meta description for SEO
- `language`: Content language (`en` or `ru`)
- `python_version_introduced`: Python version when feature was introduced
- `python_version_deprecated`: Python version when feature was deprecated (if applicable)
- `tags`: Array of tags for categorization
- `synonyms`: Array of alternative search terms
- `related`: Array of related page URLs

### General Guidelines

- Use semantic HTML
- Follow accessibility best practices
- Optimize for performance
- Write self-documenting code
- Keep functions small and focused

## Deployment

### GitHub Pages

The project uses GitHub Actions for automatic deployment:

1. Push to `main` branch
2. GitHub Actions builds the site
3. Site is deployed to GitHub Pages

### Manual Deployment

```bash
npm run build
# Copy _site/ contents to your hosting provider
```

## Search Index Generation

Search indices are generated automatically during build:

- One index per language (`search-index-en.json`, `search-index-ru.json`)
- Includes synonym expansion
- Stored in `_site/` directory

## Localization

### Adding New Language (may need adding new button to choose languages in future)

1. Create `content/{lang}/` directory
2. Add language to `languages` array in `.eleventy.js`
3. Update navigation and site data
4. Create translated content files

### Translation Guidelines

- Maintain same file structure as English version
- Keep frontmatter structure consistent
- Translate content, not code examples
- Update synonyms for language-specific terms

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines

## License

MIT License - see [LICENSE](LICENSE) for details

## Disclaimer

This site is not affiliated with pythonpedia.in, parbhat.github.io/Python-Pedia, or any other similar sites
