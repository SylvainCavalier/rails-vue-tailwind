# README

# Rails + Vue 3 Monolith Boilerplate

This repository is a personal boilerplate for building modern **Single Page Applications (SPA)** 
using a **Rails monolith** with **Vue 3**, powered by **Vite**.

It provides a clean and minimal setup for quickly starting new projects using:

- **Ruby on Rails 7.1**
- **Vite** as a frontend builder
- **Vue.js 3** as the frontend framework
- **Vue Router** for SPA navigation
- **Pinia** as the state management store
- **Tailwind CSS** for styling

## Features

- Rails backend with integrated Vue frontend
- SPA routing with Vue Router
- Modular store using Pinia
- Hot-reload with Vite during development
- Production-ready Vite build integration
- Tailwind preconfigured
- Clean file structure: Vue components in `app/frontend`, Rails views fallback to `spa#index`

## Installation

```bash
bundle install
yarn install
bin/rails db:setup
bin/dev # Or run foreman if you use Procfile.dev

**## Folder Structure**

app/
├── controllers/
│   └── spa_controller.rb   # Serves the SPA entrypoint
├── views/
│   └── spa/
│       └── index.html.erb  # Mount point for Vue app
frontend/
├── entrypoints/
│   └── application.js      # Main JS entrypoint for Vite
├── components/
│   └── App.vue             # Root Vue component
├── pages/
│   └── Dashboard.vue       # Example page
├── router/
│   ├── index.js            # Vue Router config
│   └── routes.js           # Route definitions
├── stores/
│   └── counterStore.js     # Example Pinia store
└── styles/
    └── application.css     # Tailwind base CSS

**## Auth**
This template does not include authentication yet — feel free to add Devise or Clearance depending on your needs.

**## Notes**
	•	This is a monolithic Rails app (i.e., not API-only).
	•	Frontend lives inside the Rails app, no separate Node server needed.
	•	Vue and Rails share the same domain, simplifying sessions and cookies.

⸻

Feel free to fork !
Maintainer: @SylvainCavalier
