Rails.application.routes.draw do
  root "home#index"

  # Each route maps to a controller action that renders an Inertia page.
  # For static pages without a controller: `inertia "about"` renders pages/about.vue.
end
