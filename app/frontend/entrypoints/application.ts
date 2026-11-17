import { createInertiaApp } from '@inertiajs/vue3'

import AppLayout from '../layouts/AppLayout.vue'
import './application.css'

const appName = import.meta.env.VITE_APP_NAME ?? 'MyApp'

// Pages live in app/frontend/pages and are resolved from the component name
// sent by Rails (e.g. HomeController#index -> pages/home/index.vue).
createInertiaApp({
  pages: '../pages',
  title: (title) => (title ? `${title} - ${appName}` : appName),
  // Default persistent layout. A page can override it with defineOptions({ layout: ... }).
  layout: () => AppLayout,
  defaults: {
    form: {
      // Rails returns an array of messages per field (model.errors)
      withAllErrors: true,
    },
  },
  progress: {
    color: '#4f46e5',
  },
})
