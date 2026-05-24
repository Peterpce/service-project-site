# Community Service Portal

A responsive Node.js and Express web application built with EJS templating. This portal connects users with local organizations, ongoing service projects, and structured volunteer categories.

## Project Features
* **Dynamic Templating:** Utilizes EJS architecture with modular partials (`header.ejs`, `footer.ejs`) to maintain a clean, reusable UI structure.
* **Structured Routing:** Organized pages for Home, Organizations, Service Projects, and a newly implemented **Service Project Categories** page.
* **Professional, Accessible Design:** Built with modern CSS (Flexbox/Grid), incorporating responsive layouts for mobile and desktop screens while adhering to color-contrast accessibility standards.

## Code Architecture & Standards
This project strictly adheres to modern JavaScript standards required for development:
* **ECMAScript Modules (ESM):** Uses standard `import`/`export` syntax rather than CommonJS `require()`.
* **Asynchronous Operations:** Implements modern `async`/`await` patterns for handling control flows cleanly.
* **Modern Functions:** Built completely using standard arrow notation syntax (`const functionName = async () => {}`).
* **Data Security:** Data outputs leverage EJS escaping structures (`<%= %>`) rather than unescaped tags (`<%- %>`) to safeguard against cross-site scripting vulnerabilities.
* **Variable Management:** Adheres to strict block-scoped variable declarations (`const` preferred) using clean `camelCase` naming conventions.

## Deployment Details
* **Local Development:** Hosted locally using a Node.js development server runtime environment.
* **Production Deployment:** Fully configured and deployed to **Render.com**.
* **Security Guardrails:** Critical local environment flags and sensitive variables are isolated via `.env` configurations and explicitly blacklisted from version control tracking using a strict `.gitignore` file.

---

## Live Links
* **GitHub Repository:** [Insert your GitHub URL here]
* **Live Deployed Site:** [Insert your Render deployment URL here]