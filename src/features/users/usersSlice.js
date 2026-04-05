import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from './usersService';

const initialState = {
  list: [],
  selectedUser: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching users list
 */
export const fetchUsersList = createAsyncThunk(
  'users/fetchList',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      return await usersService.fetchUsers(page, limit);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

/**
 * Async thunk for fetching a single user
 */
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await usersService.fetchUserById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    // Handle fetchUsersList
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.users;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
        state.pageSize = action.payload.limit;
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchUserById
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
