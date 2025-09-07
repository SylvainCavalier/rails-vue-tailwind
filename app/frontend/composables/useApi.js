// Composable for API operations
import { computed } from 'vue'
import { useApiStore } from '../stores/api'

export function useApi() {
  const apiStore = useApiStore()

  // Reactive state
  const loading = computed(() => apiStore.isLoading)
  const error = computed(() => apiStore.error)
  const hasError = computed(() => apiStore.hasError)

  // Check if specific operation is loading
  const isLoading = (operation) => computed(() => apiStore.isLoadingOperation(operation))

  // API methods
  const get = async (url, config) => {
    try {
      const response = await apiStore.get(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const post = async (url, data, config) => {
    try {
      const response = await apiStore.post(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const put = async (url, data, config) => {
    try {
      const response = await apiStore.put(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const patch = async (url, data, config) => {
    try {
      const response = await apiStore.patch(url, data, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const del = async (url, config) => {
    try {
      const response = await apiStore.delete(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Utility methods
  const clearError = () => apiStore.clearError()

  // CRUD operations helper
  const useCrud = (resourceName) => {
    const list = async (params = {}) => {
      return get(`/${resourceName}`, { params })
    }

    const show = async (id) => {
      return get(`/${resourceName}/${id}`)
    }

    const create = async (data) => {
      return post(`/${resourceName}`, data)
    }

    const update = async (id, data) => {
      return patch(`/${resourceName}/${id}`, data)
    }

    const destroy = async (id) => {
      return del(`/${resourceName}/${id}`)
    }

    return {
      list,
      show,
      create,
      update,
      destroy,
      isLoading: isLoading(`${resourceName}-crud`)
    }
  }

  return {
    // State
    loading,
    error,
    hasError,
    isLoading,

    // Methods
    get,
    post,
    put,
    patch,
    delete: del,
    clearError,

    // Helpers
    useCrud
  }
}
