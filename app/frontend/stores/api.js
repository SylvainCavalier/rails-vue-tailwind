// API Store - handles loading states and common API operations
import { defineStore } from 'pinia'
import apiClient from '../plugins/axios'

export const useApiStore = defineStore('api', {
  state: () => ({
    loading: false,
    error: null,
    loadingStates: {}, // Track loading for specific operations
  }),

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    isLoadingOperation: (state) => (operation) => !!state.loadingStates[operation],
  },

  actions: {
    // Set global loading state
    setLoading(loading) {
      this.loading = loading
    },

    // Set loading state for specific operation
    setOperationLoading(operation, loading) {
      if (loading) {
        this.loadingStates[operation] = true
      } else {
        delete this.loadingStates[operation]
      }
    },

    // Set error state
    setError(error) {
      this.error = error
      if (error) {
        console.error('API Error:', error)
      }
    },

    // Clear error
    clearError() {
      this.error = null
    },

    // Generic API call wrapper
    async apiCall(operation, apiFunction) {
      this.setOperationLoading(operation, true)
      this.clearError()

      try {
        const result = await apiFunction()
        return result
      } catch (error) {
        this.setError(error.response?.data?.message || error.message)
        throw error
      } finally {
        this.setOperationLoading(operation, false)
      }
    },

    // Common HTTP methods with automatic loading/error handling
    async get(url, config = {}) {
      return this.apiCall(`get-${url}`, () => apiClient.get(url, config))
    },

    async post(url, data = {}, config = {}) {
      return this.apiCall(`post-${url}`, () => apiClient.post(url, data, config))
    },

    async put(url, data = {}, config = {}) {
      return this.apiCall(`put-${url}`, () => apiClient.put(url, data, config))
    },

    async patch(url, data = {}, config = {}) {
      return this.apiCall(`patch-${url}`, () => apiClient.patch(url, data, config))
    },

    async delete(url, config = {}) {
      return this.apiCall(`delete-${url}`, () => apiClient.delete(url, config))
    },

    // Bulk operations
    async bulkOperation(operation, items, apiFunction) {
      this.setOperationLoading(operation, true)
      this.clearError()

      const results = []
      const errors = []

      try {
        for (const item of items) {
          try {
            const result = await apiFunction(item)
            results.push({ item, result, success: true })
          } catch (error) {
            errors.push({ item, error, success: false })
          }
        }

        if (errors.length > 0) {
          this.setError(`${errors.length} operations failed`)
        }

        return { results, errors, hasErrors: errors.length > 0 }
      } finally {
        this.setOperationLoading(operation, false)
      }
    }
  }
})
