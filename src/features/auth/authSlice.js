import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: authService.getCurrentUser() || null,
  isLoading: false,
  error: null,
  isAuthenticated: authService.isAuthenticated(),
};

/**
 * Async thunk for login
 * Handles the async login operation and automatically updates the state
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password },
    { rejectWithValue }
  ) => {
    try {
      const result = await authService.login(email, password);

      if (!result.success) {
        return rejectWithValue(result.error);
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'An error occurred during login'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Handle loginUser pending
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    // Handle loginUser fulfilled
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });

    // Handle loginUser rejected
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
