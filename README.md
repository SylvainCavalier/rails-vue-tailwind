# Rails + Inertia + Vue 3 + Tailwind Boilerplate

Rails monolith with a Vue 3 frontend, glued together by [Inertia.js](https://inertia-rails.dev).
Rails controllers render Vue pages directly with props: no JSON API, no client-side router,
no state store for server data. You get SPA navigation with classic Rails controllers,
sessions and redirects.

## Quick start

```bash
bundle install && npm install

# Demo mode (no database required)
SKIP_DB_CHECKS=true foreman start -f Procfile.dev
```

Open http://localhost:3000.

### Full setup (with database)

```bash
rm config/initializers/disable_db_checks.rb
bin/rails db:create
foreman start -f Procfile.dev
```

Optional gems setup (Devise, GoodJob, PaperTrail...): see [README_GEMS_SETUP.md](README_GEMS_SETUP.md)
and [README_DEVISE_INTEGRATION.md](README_DEVISE_INTEGRATION.md).

## Stack

**Backend:** Rails 8.1, PostgreSQL, inertia_rails, Devise (not generated), Pundit, GoodJob, Pagy,
PaperTrail, pg_search, friendly_id, Rack::Attack, SecureHeaders
**Frontend:** Vue 3.5 + TypeScript, Inertia.js 3, Vite 8, Tailwind CSS 4
**Tests:** RSpec + factory_bot + Capybara/Selenium (back), Vitest + Vue Test Utils (front)
**Requires:** Ruby 3.4.8, Node 22.x

## How it works

```ruby
# config/routes.rb
resources :projects

# app/controllers/projects_controller.rb
class ProjectsController < ApplicationController
  def index
    render inertia: { projects: Project.all.as_json(only: %i[id name]) }
  end

  def create
    project = Project.new(project_params)
    if project.save
      redirect_to projects_path, notice: "Project created"
    else
      redirect_to new_project_path, inertia: { errors: project.errors }
    end
  end
end
```

```vue
<!-- app/frontend/pages/projects/index.vue (path inferred from controller/action) -->
<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

defineProps<{ projects: { id: number; name: string }[] }>()
</script>

<template>
  <Link v-for="project in projects" :key="project.id" :href="`/projects/${project.id}`">
    {{ project.name }}
  </Link>
</template>
```

```vue
<!-- app/frontend/pages/projects/new.vue -->
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

const form = useForm({ name: '' })
const submit = () => form.transform((data) => ({ project: data })).post('/projects')
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" />
    <p v-if="form.errors.name">{{ form.errors.name.join(', ') }}</p>
    <button :disabled="form.processing">Save</button>
  </form>
</template>
```

- **Flash** (`notice`, `alert`) is shown by `layouts/AppLayout.vue` (default persistent layout).
- **CSRF** is handled automatically (XSRF-TOKEN cookie).
- **Authorization**: Pundit errors redirect back with an `alert` flash.
- **Shared props** (current user...): `inertia_share` in `ApplicationController`, typed in
  `app/frontend/types/globals.d.ts`.

## Commands

```bash
foreman start -f Procfile.dev   # Rails + Vite dev servers

bundle exec rspec               # Backend + system specs
npm test                        # Vitest unit tests
npm run check                   # TypeScript (vue-tsc)
npm run lint                    # ESLint
bundle exec rubocop             # RuboCop
bundle exec brakeman            # Security analysis
```

## Project structure

```
app/
├── controllers/
│   ├── application_controller.rb   # Pundit, Pagy, Inertia shared data, error redirects
│   └── home_controller.rb          # Example Inertia page
└── frontend/
    ├── entrypoints/
    │   ├── application.ts          # createInertiaApp (pages, default layout, title)
    │   └── application.css         # Tailwind
    ├── layouts/AppLayout.vue       # Default persistent layout (flash messages)
    ├── components/                 # Reusable components (+ *.spec.ts Vitest specs)
    ├── pages/                      # One folder per controller, one file per action
    └── types/                      # Shared TS types + Inertia global typing
spec/
├── requests/                       # Controller + Inertia props specs
└── system/                         # End-to-end specs (headless Chrome)
```

## Deployment

- **Heroku / Scalingo:** add the Node.js buildpack before the Ruby one so Vite can build
  assets during `assets:precompile`.
- **Docker:** the `Dockerfile` installs Node at build time only.

Maintainer: [@SylvainCavalier](https://github.com/SylvainCavalier)
