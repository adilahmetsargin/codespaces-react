import { mockLogin } from '../../services/mockServer';

/**
 * Auth Service
 * Handles all authentication-related API calls
 * 
 * Design principle: By centralizing API calls here, we can easily replace
 * mockLogin with real API endpoints without changing Redux or UI components
 */

export const authService = {
  /**
   * Login service
   * Calls mock or real backend
   */
  login: async (email, password) => {
    const result = await mockLogin(email, password);

    if (result.success) {
      // Store auth data in localStorage
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  },

  /**
   * Logout service
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
