import { mockGetUsers, mockGetUserById } from '../../services/mockServer';

/**
 * Users Service
 * Handles all user-related API calls
 */

export const usersService = {
  /**
   * Fetch list of users with pagination
   */
  fetchUsers: async (page = 1, limit = 10) => {
    const result = await mockGetUsers(page, limit);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },

  /**
   * Fetch a single user by ID
   */
  fetchUserById: async (id) => {
    const result = await mockGetUserById(id);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },
};

export default usersService;
