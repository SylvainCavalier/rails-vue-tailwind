# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**This repository is a boilerplate / starter template**, meant to be cloned as a starting point for new projects. It must remain generic and reusable.

Rails 8.1 monolith with a Vue 3 + TypeScript frontend connected through **Inertia.js** (inertia_rails 3 / @inertiajs/vue3 3). Rails controllers render Vue pages directly with props: there is **no JSON API, no Vue Router, no Pinia, no Axios**. Vite builds the frontend.

## Important: Boilerplate Rules

- **Do NOT run `bundle install` or `npm install`** unless explicitly asked. Dependency changes should only update the Gemfile/package.json, not the lock files.
- **Do NOT run database commands** (`db:create`, `db:migrate`, `db:seed`, etc.) — there is no database to operate on.
- **Do NOT run the dev server, tests, or linters** unless explicitly asked.
- **Keep everything generic**: avoid adding project-specific code, hardcoded values, or opinionated configurations that would limit reuse.

## Common Commands

```bash
bin/dev                         # Rails (localhost:3000) + Vite dev server (HMR)
RAILS_PORT=3001 VITE_RUBY_PORT=3037 bin/dev  # Run alongside another app
SKIP_DB_CHECKS=true rails s     # Demo mode, no database

bundle exec rspec                       # All Ruby specs (request + system)
bundle exec rspec spec/requests/home_spec.rb:6
npm test                                # Vitest (app/frontend/**/*.spec.ts)
npm run check                           # vue-tsc type check
npm run lint / npm run lint:fix         # ESLint (Vue + TS)
bundle exec rubocop [-a]
bundle exec brakeman && bundle exec bundler-audit
bundle exec annotaterb models           # After migrations
```

## Architecture

### Request flow
1. A route maps to a regular controller action (`config/routes.rb`).
2. The action calls `render inertia: { ...props }`. The component path is inferred as `<controller_path>/<action>` → `app/frontend/pages/<controller_path>/<action>.vue`.
3. First load: full HTML with page data embedded. Next visits (`<Link>`, `router.visit`, `useForm`): XHR returning JSON page objects, no full reload.
4. Mutations (`post/patch/delete`) end with a **redirect** (never `render json:`). Validation errors: `redirect_to ..., inertia: { errors: record.errors }`. Success messages: `notice:` / `alert:` flash.

### Frontend (`app/frontend/`)
- `entrypoints/application.ts` — `createInertiaApp` (pages dir, default layout, title, form defaults)
- `entrypoints/application.css` — Tailwind 4
- `layouts/AppLayout.vue` — default persistent layout, renders flash via `components/FlashMessages.vue`
- `pages/<controller>/<action>.vue` — one page per controller action, props typed with `defineProps<{...}>()`
- `components/` — reusable components, Vitest specs next to them (`*.spec.ts`)
- `types/index.ts` — shared TS types; `types/globals.d.ts` — Inertia typing (`flashDataType`, `errorValueType`, `sharedPageProps`)
- Import alias: `@/` → `app/frontend/`

### Backend
- `ApplicationController`: Pundit, Pagy, `inertia_share` (shared props), Pundit/CSRF errors → redirect back with `alert`
- `config/initializers/inertia_rails.rb`: asset versioning (`ViteRuby.digest`), Inertia v3 options, history encryption in prod
- Auth: Devise sessions (not generated). See `README_DEVISE_INTEGRATION.md`. Never use tokens/localStorage.
- Background jobs: GoodJob (PostgreSQL, no Redis). Rate limiting: `config/initializers/rack_attack.rb`. Security headers/CSP: `config/initializers/secure_headers.rb`.

## Conventions to follow

**Controller → page:**
```ruby
def index
  @pagy, projects = pagy(:offset, Project.order(:name))
  render inertia: {
    projects: projects.as_json(only: %i[id name]),   # always whitelist attributes sent to the client
    pagination: @pagy.data_hash
  }
end
```

**Form page:**
```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
const form = useForm({ name: '' })
const submit = () => form.transform((data) => ({ project: data })).post('/projects')
</script>
```
`form.errors.name` is a `string[]` (Rails `errors` hash).

**Rules:**
- Props are snake_case (as sent by Rails). Never send whole models: use `as_json(only: ...)` or a serializer.
- Type every page's props with `defineProps<{...}>()`; add shared shapes to `types/index.ts`.
- `<script setup lang="ts">` everywhere; `import type` for type-only imports.
- Page titles with `<Head title="..." />`.
- Navigation with `<Link>` / `router`, never `window.location` or `<a>` for internal links.
- Authorization in controllers with Pundit (`authorize record`), not in Vue.
- Tests: request spec for each controller action (`expect(inertia).to render_component(...)` / `have_props(...)`, helpers from `inertia_rails/rspec`), system spec for critical flows, Vitest for components with logic.

## Key Dependencies

**Backend:** Rails 8.1, PostgreSQL, inertia_rails, Devise, Pundit, GoodJob, Pagy, PaperTrail
**Frontend:** Vue 3.5, TypeScript 6, @inertiajs/vue3 3, Vite 8, Tailwind CSS 4
**Tests:** RSpec, factory_bot, shoulda-matchers, Capybara + Selenium, Vitest + Vue Test Utils
**Requires:** Ruby 3.4.8, Node 22.x
