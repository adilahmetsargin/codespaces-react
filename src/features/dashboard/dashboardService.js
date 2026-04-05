import {
  mockGetDashboardStats,
  mockGetRevenueChart,
  mockGetRecentUsers,
} from '../../services/mockServer';

/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */

export const dashboardService = {
  /**
   * Fetch dashboard statistics (KPIs)
   */
  fetchStats: async () => {
    const result = await mockGetDashboardStats();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },

  /**
   * Fetch revenue chart data
   */
  fetchRevenueChart: async () => {
    const result = await mockGetRevenueChart();
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },

  /**
   * Fetch recent users
   */
  fetchRecentUsers: async (limit = 5) => {
    const result = await mockGetRecentUsers(limit);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  },
};

export default dashboardService;
