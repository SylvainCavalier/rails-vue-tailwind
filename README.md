# Rails + Vue 3 + Tailwind Production-Ready Boilerplate

A comprehensive **Rails monolith** boilerplate for building modern **Single Page Applications (SPA)** with **Vue 3**, **Vite**, and **Tailwind CSS**.

This is a **production-ready** setup that includes authentication, security, job processing, and all the essential gems you need to build real applications.

## 🚀 Quick Demo (No Database Required)

```bash
git clone [your-repo]
cd rails-vue-tailwind
bundle install && yarn install

# Demo mode - see it working immediately
SKIP_DB_CHECKS=true rails server
```

Open http://localhost:3000 to see the dashboard with Axios + Pinia examples!

## 🛠️ Tech Stack

### Backend
- **Ruby on Rails 7.1** with PostgreSQL
- **Good Job** for background jobs (no Redis needed)
- **Devise** for authentication (ready to configure)
- **Pundit** for authorization
- **Pagy** for pagination

### Frontend  
- **Vue 3** with Composition API
- **Vite** for lightning-fast builds
- **Pinia** for state management
- **Axios** pre-configured with CSRF
- **Tailwind CSS** for styling
- **Vue Router** for SPA navigation

### Security & Performance
- **Rack::Attack** for rate limiting  
- **SecureHeaders** with CSP configuration
- **InvisibleCaptcha** for spam protection
- **Paper Trail** for model versioning
- **Image Processing** for Active Storage

## ✨ Features

### 🎯 Ready-to-Use Components
- **Axios + Pinia integration** with CSRF protection
- **Authentication system** ready (Devise pre-configured)
- **Authorization** with Pundit policies
- **Rate limiting** and security headers
- **Background jobs** with Good Job (PostgreSQL-based)
- **Email preview** in development (Letter Opener)

### 🔧 Developer Experience  
- **Hot-reload** with Vite during development
- **Vue DevTools** support with Pinia stores
- **API-first** approach with dedicated composables
- **Error handling** and loading states built-in
- **Clean architecture** with stores, composables, and components

### 🛡️ Production Ready
- **Security headers** configured (CSP, HSTS, etc.)
- **Rate limiting** for APIs and auth endpoints  
- **CSRF protection** for all requests
- **Spam protection** with invisible captcha
- **SEO ready** with meta-tags gem

## 📦 Installation

### Quick Start (Demo Mode)
```bash
git clone [your-repo]
cd rails-vue-tailwind
bundle install && yarn install

# Start without database (demo mode)
SKIP_DB_CHECKS=true rails server
```

### Full Setup (With Database)
```bash
# 1. Install PostgreSQL (if not already installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# 2. Remove demo mode
rm config/initializers/disable_db_checks.rb

# 3. Setup PostgreSQL
rails db:create

# 4. Install gems (optional, see GEMS_SETUP.md)
rails generate devise:install
rails generate devise User  
rails generate good_job:install
rails db:migrate

# 5. Start normally
rails server
```

📖 **Detailed Setup:** See [README_GEMS_SETUP.md](README_GEMS_SETUP.md) and [README_DEVISE_INTEGRATION.md](README_DEVISE_INTEGRATION.md)
## 📁 Project Structure

```
app/
├── controllers/
│   ├── application_controller.rb  # Pundit + Pagy included
│   └── spa_controller.rb          # Serves the SPA entrypoint
├── frontend/
│   ├── components/
│   │   └── App.vue                # Root Vue component
│   ├── composables/
│   │   ├── useApi.js              # API calls with Axios
│   │   └── useAuth.js             # Authentication helpers
│   ├── entrypoints/
│   │   └── application.js         # Main entrypoint + Pinia setup
│   ├── pages/
│   │   └── Dashboard.vue          # Example page with demos
│   ├── plugins/
│   │   └── axios.js               # Axios + CSRF configuration
│   ├── router/
│   │   ├── index.js               # Vue Router config
│   │   └── routes.js              # Route definitions
│   ├── stores/
│   │   ├── api.js                 # API store with loading states
│   │   ├── auth.js                # Authentication store
│   │   └── counter.js             # Example store
│   └── styles/
│       └── application.css        # Tailwind base
├── helpers/
│   └── application_helper.rb      # Pagy::Frontend included
└── views/
    └── spa/
        └── index.html.erb         # Vue app mount point

config/
├── initializers/
│   ├── good_job.rb               # Background jobs config
│   ├── pagy.rb                   # Pagination config  
│   ├── rack_attack.rb            # Rate limiting rules
│   ├── secure_headers.rb         # Security headers + CSP
│   └── disable_db_checks.rb     # Demo mode (remove for production)
└── database.yml                 # PostgreSQL configuration
```
## 🔐 Authentication & Security

This boilerplate includes **Devise** pre-configured but not installed by default. When you're ready:

```bash
rails generate devise:install
rails generate devise User
rails db:migrate
```

Security features included:
- **CSRF protection** for all Axios requests
- **Rate limiting** on login/registration endpoints  
- **Content Security Policy** configured for Vue + Vite
- **Secure headers** (HSTS, X-Frame-Options, etc.)
- **Invisible captcha** for form protection

## 💡 Usage Examples

### Making API Calls
```javascript
// In any Vue component
import { useApi } from '@/composables/useApi'

const api = useApi()
const users = await api.get('/users')
```

### State Management  
```javascript  
// Using Pinia stores
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
await auth.login({ email: '...', password: '...' })
```

### CRUD Operations
```javascript
// Built-in CRUD helpers
const usersCrud = api.useCrud('users')
const newUser = await usersCrud.create({ name: 'John' })
```

## 📚 Documentation

- **[README_GEMS_SETUP.md](README_GEMS_SETUP.md)** - Detailed gem configuration  
- **[README_DEVISE_INTEGRATION.md](README_DEVISE_INTEGRATION.md)** - Authentication setup
- **[README_AXIOS_PINIA_SETUP.md](README_AXIOS_PINIA_SETUP.md)** - Frontend architecture

## 🏗️ Architecture Notes

- **Monolithic Rails app** (not API-only) with SPA frontend
- **Single domain** for Vue and Rails (simplified sessions/cookies)
- **PostgreSQL** for both app data and background jobs
- **No separate Node server** needed - everything runs through Rails
- **Vite integration** with hot-reload in development

---

## 🚀 Ready to Build Amazing Apps!

This boilerplate gives you everything you need to build modern, secure, and scalable Rails applications with Vue.js.

**Fork it, customize it, and start building!** 

Maintainer: [@SylvainCavalier](https://github.com/SylvainCavalier)
