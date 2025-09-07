// Auth Store - handles user authentication state
import { defineStore } from 'pinia'
import apiClient from '../plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    userRole: (state) => state.user?.role || null,
    userName: (state) => state.user ? `${state.user.first_name || ''} ${state.user.last_name || ''}`.trim() || state.user.email : null,
  },

  actions: {
    // Set loading state
    setLoading(loading) {
      this.loading = loading
    },

    // Set error
    setError(error) {
      this.error = error
    },

    // Clear error
    clearError() {
      this.error = null
    },

    // Set user data
    setUser(user) {
      this.user = user
      this.isAuthenticated = !!user
    },

    // Clear user data
    clearUser() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('authToken')
    },

    // Check if user is authenticated (call on app init)
    async checkAuth() {
      this.setLoading(true)
      this.clearError()

      try {
        // If using token-based auth
        const token = localStorage.getItem('authToken')
        if (!token) {
          this.clearUser()
          return false
        }

        // Verify token with backend
        const response = await apiClient.get('/auth/verify')
        this.setUser(response.data.user)
        return true
      } catch (error) {
        console.warn('Auth check failed:', error.message)
        this.clearUser()
        return false
      } finally {
        this.setLoading(false)
      }
    },

    // Login with email/password
    async login(credentials) {
      this.setLoading(true)
      this.clearError()

      try {
        const response = await apiClient.post('/auth/login', credentials)
        const { user, token } = response.data

        if (token) {
          localStorage.setItem('authToken', token)
        }
        
        this.setUser(user)
        return { success: true, user }
      } catch (error) {
        const message = error.response?.data?.message || 'Login failed'
        this.setError(message)
        return { success: false, error: message }
      } finally {
        this.setLoading(false)
      }
    },

    // Register new user
    async register(userData) {
      this.setLoading(true)
      this.clearError()

      try {
        const response = await apiClient.post('/auth/register', userData)
        const { user, token } = response.data

        if (token) {
          localStorage.setItem('authToken', token)
        }

        this.setUser(user)
        return { success: true, user }
      } catch (error) {
        const message = error.response?.data?.message || 'Registration failed'
        this.setError(message)
        return { success: false, error: message }
      } finally {
        this.setLoading(false)
      }
    },

    // Logout
    async logout() {
      this.setLoading(true)

      try {
        // Call logout endpoint if using token-based auth
        await apiClient.post('/auth/logout')
      } catch (error) {
        console.warn('Logout API call failed:', error.message)
      } finally {
        this.clearUser()
        this.setLoading(false)
        
        // Redirect to login page
        if (window.location.pathname !== '/users/sign_in') {
          window.location.href = '/users/sign_in'
        }
      }
    },

    // Update user profile
    async updateProfile(userData) {
      this.setLoading(true)
      this.clearError()

      try {
        const response = await apiClient.patch('/auth/profile', userData)
        this.setUser(response.data.user)
        return { success: true, user: response.data.user }
      } catch (error) {
        const message = error.response?.data?.message || 'Profile update failed'
        this.setError(message)
        return { success: false, error: message }
      } finally {
        this.setLoading(false)
      }
    },

    // Reset password
    async resetPassword(email) {
      this.setLoading(true)
      this.clearError()

      try {
        await apiClient.post('/auth/reset-password', { email })
        return { success: true, message: 'Password reset email sent' }
      } catch (error) {
        const message = error.response?.data?.message || 'Password reset failed'
        this.setError(message)
        return { success: false, error: message }
      } finally {
        this.setLoading(false)
      }
    },

    // Check if user has specific role
    hasRole(role) {
      return this.user?.role === role
    },

    // Check if user has any of the specified roles
    hasAnyRole(roles) {
      return roles.includes(this.user?.role)
    }
  }
})
