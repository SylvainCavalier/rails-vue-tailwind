# Axios + Pinia Configuration

This boilerplate includes a complete Axios configuration with Pinia for robust state and API management.

## Architecture

### 🗂️ File Structure

```
app/frontend/
├── plugins/
│   └── axios.js                 # Axios configuration with CSRF
├── stores/
│   ├── api.js                   # Store for API calls
│   ├── auth.js                  # Store for authentication
│   └── counter.js               # Simple store example
├── composables/
│   ├── useApi.js                # Composable for APIs
│   └── useAuth.js               # Composable for auth
└── entrypoints/
    └── application.js           # Entry point with initialization
```

## ✅ Included Features

### Axios Configuration
- **CSRF Token** automatic for Rails
- **Interceptors** for logging and error handling
- **Timeout** configured (10s)
- **Base URL** adapted according to environment
- **JWT Token** support for authentication

### Pinia Stores
- **API Store**: Centralized API call management with loading states
- **Auth Store**: Complete authentication (login, register, logout)
- **Error Handling**: Automatic error management

### Vue 3 Composables
- **useApi()**: Simple interface for API calls
- **useAuth()**: Authentication management
- **CRUD helpers**: Ready methods for CRUD operations

## 🚀 Usage

### Simple API Calls

```vue
<script setup>
import { useApi } from '@/composables/useApi'

const api = useApi()

// GET request
const fetchUsers = async () => {
  try {
    const users = await api.get('/users')
    console.log(users)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// POST request
const createUser = async (userData) => {
  const user = await api.post('/users', userData)
  return user
}
</script>
```

### Using Stores

```vue
<script setup>
import { useApiStore } from '@/stores/api'
import { useAuthStore } from '@/stores/auth'

const apiStore = useApiStore()
const authStore = useAuthStore()

// Check loading states
console.log(apiStore.loading) // Global loading
console.log(apiStore.isLoadingOperation('users-list')) // Specific operation

// Authentication
const login = async () => {
  const result = await authStore.login({
    email: 'user@example.com',
    password: 'password'
  })
  
  if (result.success) {
    console.log('Logged in:', result.user)
  }
}
</script>
```

### CRUD Operations

```vue
<script setup>
import { useApi } from '@/composables/useApi'

const api = useApi()
const usersCrud = api.useCrud('users')

// List all users
const users = await usersCrud.list()

// Get specific user
const user = await usersCrud.show(1)

// Create user
const newUser = await usersCrud.create({ email: 'test@example.com' })

// Update user
const updatedUser = await usersCrud.update(1, { name: 'New Name' })

// Delete user
await usersCrud.destroy(1)
</script>
```

### Authentication Management

```vue
<script setup>
import { useAuth } from '@/composables/useAuth'

const auth = useAuth()

// Login
const handleLogin = async () => {
  const result = await auth.login({
    email: email.value,
    password: password.value
  })
  
  if (result.success) {
    router.push('/dashboard')
  }
}

// Check auth status
console.log(auth.isAuthenticated.value)
console.log(auth.user.value)
console.log(auth.userRole.value)

// Role checking
if (auth.hasRole('admin')) {
  // Admin only code
}
</script>
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# API Configuration
API_BASE_URL=http://localhost:3000/api
API_TIMEOUT=10000

# Authentication
JWT_SECRET=your_jwt_secret_here
```

### Rails Backend

Add these routes in `config/routes.rb`:

```ruby
namespace :api, defaults: { format: :json } do
  namespace :auth do
    post 'login'
    post 'register'
    post 'logout'
    get 'verify'
    patch 'profile'
    post 'reset-password'
  end
  
  # Your other API routes
  resources :users
end
```

### Base API Controller

```ruby
# app/controllers/api/base_controller.rb
class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_api_user!
  
  protected
  
  def authenticate_api_user!
    token = request.headers['Authorization']&.split(' ')&.last
    @current_user = User.find_by(auth_token: token) if token
    
    render json: { error: 'Unauthorized' }, status: 401 unless @current_user
  end
end
```

## 🎛️ Customization

### Adding a New Store

```javascript
// stores/products.js
import { defineStore } from 'pinia'
import { useApiStore } from './api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    currentProduct: null
  }),

  actions: {
    async fetchProducts() {
      const apiStore = useApiStore()
      const response = await apiStore.get('/products')
      this.products = response.data
    }
  }
})
```

### Adding a New Composable

```javascript
// composables/useProducts.js
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products'

export function useProducts() {
  const store = useProductsStore()
  
  return {
    products: computed(() => store.products),
    fetchProducts: store.fetchProducts
  }
}
```

## 🔐 Security

### CSRF Protection
- ✅ CSRF token automatically added
- ✅ Configuration compatible with Rails

### JWT Authentication
- ✅ Token stored in localStorage
- ✅ Automatic addition in headers
- ✅ Automatic removal on logout/401

### Error Handling
- ✅ Automatic handling of 401/403/422/500 errors
- ✅ Automatic redirection to login if not authenticated
- ✅ Error logging in console

## 📊 Loading States

```vue
<template>
  <!-- Global loading -->
  <div v-if="api.loading.value">Loading...</div>
  
  <!-- Specific operation loading -->
  <button :disabled="api.isLoading('users-create').value">
    {{ api.isLoading('users-create').value ? 'Creating...' : 'Create User' }}
  </button>
</template>
```

## 🐛 Debug

### Console Logs
All API calls are logged in console with:
- 🚀 Outgoing requests
- ✅ Successful responses  
- ❌ Errors

### Vue DevTools
- All Pinia stores are visible in Vue DevTools
- States and mutations tracked in real-time

## 🚀 Deployment

### Production
- Base URL adapts automatically
- Less verbose logs in production
- HTTPS enforced via secure_headers

This configuration gives you a solid foundation to develop Rails + Vue.js applications with modern state management and robust API calls!
