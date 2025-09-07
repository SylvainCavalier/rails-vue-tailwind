// Composable for authentication
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  // Reactive state
  const user = computed(() => authStore.currentUser)
  const isAuthenticated = computed(() => authStore.isLoggedIn)
  const loading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)
  const hasError = computed(() => authStore.hasError)
  const userRole = computed(() => authStore.userRole)
  const userName = computed(() => authStore.userName)

  // Auth methods
  const login = async (credentials) => {
    return await authStore.login(credentials)
  }

  const register = async (userData) => {
    return await authStore.register(userData)
  }

  const logout = async () => {
    return await authStore.logout()
  }

  const checkAuth = async () => {
    return await authStore.checkAuth()
  }

  const updateProfile = async (userData) => {
    return await authStore.updateProfile(userData)
  }

  const resetPassword = async (email) => {
    return await authStore.resetPassword(email)
  }

  // Role checking
  const hasRole = (role) => authStore.hasRole(role)
  const hasAnyRole = (roles) => authStore.hasAnyRole(roles)

  // Utility methods
  const clearError = () => authStore.clearError()

  // Auth guards for router
  const requireAuth = () => {
    if (!isAuthenticated.value) {
      throw new Error('Authentication required')
    }
  }

  const requireRole = (role) => {
    requireAuth()
    if (!hasRole(role)) {
      throw new Error(`Role '${role}' required`)
    }
  }

  const requireAnyRole = (roles) => {
    requireAuth()
    if (!hasAnyRole(roles)) {
      throw new Error(`One of roles [${roles.join(', ')}] required`)
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    hasError,
    userRole,
    userName,

    // Methods
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    resetPassword,
    clearError,

    // Role checking
    hasRole,
    hasAnyRole,

    // Guards
    requireAuth,
    requireRole,
    requireAnyRole
  }
}
