# Devise Integration Guide (Inertia)

Authentication uses plain Devise sessions (cookie-based). No tokens, no `localStorage`:
Inertia requests are same-origin and carry the session cookie and the CSRF token automatically.

## 1. Install

```bash
rails generate devise:install
rails generate devise User
rails db:migrate
```

## 2. Make Devise Inertia-friendly

In `config/initializers/devise.rb`:

```ruby
# Inertia visits are XHR requests: without this, failed logins return a bare 401
# instead of redirecting back with a flash message.
config.http_authenticatable_on_xhr = false
config.navigational_formats = ["*/*", :html]
```

## 3. Routes and controllers

```ruby
# config/routes.rb
devise_for :users, controllers: {
  sessions: "users/sessions",
  registrations: "users/registrations"
}
```

```ruby
# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
  def new
    render inertia: "users/sessions/new"
  end
end
```

Failed logins are handled by Devise's failure app: it redirects back to `new` with
`flash[:alert]`, which Inertia exposes as `page.flash.alert`.

```ruby
# app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
  def new
    render inertia: "users/registrations/new"
  end

  def create
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      redirect_to after_sign_up_path_for(resource), notice: "Welcome!"
    else
      redirect_to new_user_registration_path, inertia: { errors: resource.errors }
    end
  end
end
```

## 4. Vue pages

```vue
<!-- app/frontend/pages/users/sessions/new.vue -->
<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

const form = useForm({ email: '', password: '', remember_me: false })

const submit = () => {
  // Devise expects params nested under `user`
  form.transform((data) => ({ user: data })).post('/users/sign_in', {
    onFinish: () => form.reset('password'),
  })
}
</script>

<template>
  <Head title="Sign in" />
  <form @submit.prevent="submit">
    <input v-model="form.email" type="email" autocomplete="email" />
    <input v-model="form.password" type="password" autocomplete="current-password" />
    <button type="submit" :disabled="form.processing">Sign in</button>
  </form>
</template>
```

Registration follows the same pattern; validation errors are available as
`form.errors.email` (array of messages, see `errorValueType` in `types/globals.d.ts`).

Sign out:

```vue
<Link href="/users/sign_out" method="delete" as="button">Sign out</Link>
```

## 5. Share the current user and protect pages

```ruby
# app/controllers/application_controller.rb
before_action :authenticate_user!
inertia_share auth: -> { { user: current_user&.as_json(only: %i[id email]) } }
```

Skip it on public controllers with `skip_before_action :authenticate_user!`.
Then uncomment `SharedProps` in `app/frontend/types/index.ts` and `sharedPageProps`
in `app/frontend/types/globals.d.ts`: `page.props.auth.user` is now typed everywhere.

## 6. Already configured

- **Rack::Attack**: rate limiting on `/users/sign_in` (by IP and email, JSON bodies included),
  `/users/password` and `/users/sign_up`.
- **SecureHeaders**: CSP allows Devise forms and OAuth redirects (`:devise_forms` override).
- **Letter Opener**: Devise emails open in the browser in development.

For production emails, add to `config/environments/production.rb`:

```ruby
config.action_mailer.default_url_options = { host: "your-domain.com", protocol: "https" }
config.action_mailer.delivery_method = :smtp
```

## 7. Testing

```ruby
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "password123" }
  end
end
```

```ruby
# spec/support/devise.rb
RSpec.configure do |config|
  config.include Devise::Test::IntegrationHelpers, type: :request
  config.include Devise::Test::IntegrationHelpers, type: :system
end
```

Then `sign_in create(:user)` in request and system specs.
