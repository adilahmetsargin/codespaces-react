/**
 * Mock Server Implementation
 * 
 * This file simulates backend API responses with realistic delays.
 * Design principle: Can be completely removed and replaced with real API calls
 * without changing Redux logic or UI components.
 * 
 * Each mock endpoint returns: { success: boolean, data?: any, error?: string }
 */

// Simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// Mock Data
// ============================================

const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    joinDate: '2023-01-15',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    joinDate: '2023-02-20',
    status: 'active',
    role: 'User',
  },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    joinDate: '2023-03-10',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    joinDate: '2024-01-05',
    status: 'active',
    role: 'User',
  },
  {
    id: 5,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    joinDate: '2024-02-12',
    status: 'active',
    role: 'Moderator',
  },
];

const mockRevenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Aug', revenue: 68000 },
  { month: 'Sep', revenue: 74000 },
  { month: 'Oct', revenue: 79000 },
  { month: 'Nov', revenue: 85000 },
  { month: 'Dec', revenue: 92000 },
];

const mockAuthUser = {
  id: 1,
  name: 'John Admin',
  email: 'admin@example.com',
  role: 'Admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
};

// ============================================
// Mock API Endpoints
// ============================================

/**
 * POST /auth/login
 * Simulates user login
 */
export const mockLogin = async (email, password) => {
  await delay(800); // Simulate network latency

  // Simple validation
  if (!email || !password) {
    return {
      success: false,
      error: 'Email and password are required',
    };
  }

  if (email === 'admin@example.com' && password === 'password') {
    const token = 'mock-jwt-token-' + Date.now();
    return {
      success: true,
      data: {
        user: mockAuthUser,
        token,
      },
    };
  }

  return {
    success: false,
    error: 'Invalid email or password',
  };
};

/**
 * GET /dashboard/stats
 * Returns KPI statistics for the dashboard
 */
export const mockGetDashboardStats = async () => {
  await delay(600);

  return {
    success: true,
    data: {
      totalUsers: 1250,
      totalRevenue: 524000,
      activeSubscriptions: 890,
      monthlyGrowth: 12.5,
    },
  };
};

/**
 * GET /dashboard/revenue
 * Returns revenue chart data
 */
export const mockGetRevenueChart = async () => {
  await delay(700);

  return {
    success: true,
    data: mockRevenueData,
  };
};

/**
 * GET /users
 * Returns list of users with pagination support
 */
export const mockGetUsers = async (page = 1, limit = 10) => {
  await delay(500);

  const start = (page - 1) * limit;
  const paginatedUsers = mockUsers.slice(start, start + limit);

  return {
    success: true,
    data: {
      users: paginatedUsers,
      total: mockUsers.length,
      page,
      limit,
      hasMore: start + limit < mockUsers.length,
    },
  };
};

/**
 * GET /users/:id
 * Returns a single user
 */
export const mockGetUserById = async (id) => {
  await delay(400);

  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  return {
    success: true,
    data: user,
  };
};

/**
 * GET /dashboard/recent-users
 * Returns the most recent users (for dashboard widget)
 */
export const mockGetRecentUsers = async (limit = 5) => {
  await delay(500);

  const recentUsers = mockUsers.slice(0, limit);

  return {
    success: true,
    data: recentUsers,
  };
};

// Export all mock functions for easy access
export default {
  mockLogin,
  mockGetDashboardStats,
  mockGetRevenueChart,
  mockGetUsers,
  mockGetUserById,
  mockGetRecentUsers,
};
