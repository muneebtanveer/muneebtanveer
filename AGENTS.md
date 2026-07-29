# AGENTS.md — Architecture & Engineering Guide

This document provides context for AI agents working on this codebase in future sessions.

## 🏗️ Project Architecture

This project is a high-performance single-page static application designed for GitHub Pages or Netlify deployment. It requires zero compilation or build pipelines.

### Directory Layout

```
/
├── index.html        # Main semantic single-page layout containing all 7 core sections + CRO calculator
├── css/
│   └── styles.css    # Single CSS file with design tokens, glassmorphism, responsive grid & keyframes
├── js/
│   └── main.js       # Lightweight Vanilla JS for scroll triggers, nav, copy-to-clipboard & form handling
├── README.md         # Project overview and local execution guide
└── AGENTS.md         # Developer & AI agent architectural documentation
```

## 🎨 Design System & Conventions

- **Color Palette**:
  - Dark base background: `#07090e` with radial background gradients.
  - Card background: Glassmorphism `rgba(15, 23, 42, 0.65)` with `backdrop-filter: blur(16px)`.
  - Primary Accent: Shopify Green (`#95bf47`) with hover `#a3d14e`.
  - Secondary Accents: Vibrant Cyan (`#38bdf8`), Emerald (`#34d399`), and Indigo (`#818cf8`).
- **Typography**: `Inter` (sans-serif) + `JetBrains Mono` for code snippets and metrics.
- **Icons**: Hand-crafted inline SVG icons embedded directly into HTML/CSS for sub-millisecond load performance.

## ⚡ Key Non-Obvious Decisions

1. **No External Framework Dependencies**: Frameworks like React or Vue were deliberately avoided to maintain sub-second First Contentful Paint (FCP) and Time to Interactive (TTI), which aligns with the core brand identity of a Shopify Speed & CRO Specialist.
2. **Netlify Forms Integration**: The contact form includes `data-netlify="true"` and a honeypot `bot-field` to handle form submissions without backend server infrastructure.
3. **IntersectionObserver Animations**: Visual elements use `.fade-in-up` class triggers managed by an IntersectionObserver in `js/main.js` with fallback for legacy browsers.
