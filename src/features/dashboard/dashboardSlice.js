import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardService from './dashboardService';

const initialState = {
  stats: {
    totalUsers: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    monthlyGrowth: 0,
  },
  revenueChart: [],
  recentUsers: [],
  loadingStats: false,
  loadingRevenue: false,
  loadingRecentUsers: false,
  error: null,
};

/**
 * Async thunk for fetching dashboard stats
 */
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchStats();
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch dashboard stats'
      );
    }
  }
);

/**
 * Async thunk for fetching revenue chart
 */
export const fetchRevenueChart = createAsyncThunk(
  'dashboard/fetchRevenueChart',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchRevenueChart();
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch revenue chart'
      );
    }
  }
);

/**
 * Async thunk for fetching recent users
 */
export const fetchRecentUsers = createAsyncThunk(
  'dashboard/fetchRecentUsers',
  async (limit = 5, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchRecentUsers(limit);
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch recent users'
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Handle fetchDashboardStats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loadingStats = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loadingStats = false;
        state.error = action.payload;
      });

    // Handle fetchRevenueChart
    builder
      .addCase(fetchRevenueChart.pending, (state) => {
        state.loadingRevenue = true;
        state.error = null;
      })
      .addCase(fetchRevenueChart.fulfilled, (state, action) => {
        state.loadingRevenue = false;
        state.revenueChart = action.payload;
      })
      .addCase(fetchRevenueChart.rejected, (state, action) => {
        state.loadingRevenue = false;
        state.error = action.payload;
      });

    // Handle fetchRecentUsers
    builder
      .addCase(fetchRecentUsers.pending, (state) => {
        state.loadingRecentUsers = true;
        state.error = null;
      })
      .addCase(fetchRecentUsers.fulfilled, (state, action) => {
        state.loadingRecentUsers = false;
        state.recentUsers = action.payload;
      })
      .addCase(fetchRecentUsers.rejected, (state, action) => {
        state.loadingRecentUsers = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
