# 🚀 Quick Start Reference

## Installation & Run (Copy-Paste)

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start development server
npm start

# 3. Open browser to http://localhost:3000
```

## Demo Login
```
Email:    admin@example.com
Password: password
```

## Build for Production
```bash
npm run build
```

## 📁 Key Files Reference

| What You Need | Location |
|---|---|
| **Add Redux Data** | `src/features/*/yourfeature.Slice.js` |
| **Add API Calls** | `src/features/*/yourfeatureService.js` |
| **Add Mock Data** | `src/services/mockServer.js` |
| **Add Page** | Create in `src/pages/YourPage.jsx` |
| **Add Shared Component** | Create in `src/components/YourComponent.jsx` |
| **Add Styles** | Create CSS in `src/styles/YourComponent.css` |
| **Add Routes** | Edit `src/App.jsx` |
| **Add Navigation** | Edit `src/components/Sidebar.jsx` |

## 🔄 Full Data Flow Example

```
User clicks button
          ↓
dispatch(fetchDashboardStats())  [in component]
          ↓
Redux Thunk: fetchDashboardStats.js
          ↓
dashboardService.fetchStats()  [in service]
          ↓
mockGetDashboardStats()  [in mockServer]
          ↓
Returns mock data with delay
          ↓
Redux Reducer updates state
          ↓
Component selector: useSelector(state => state.dashboard)
          ↓
Component re-renders with new data
```

## 🎯 To Replace Mock APIs with Real Backend

1. **Update API URL** in `src/services/apiClient.js`
   ```javascript
   baseURL: 'https://your-real-api.com',
   ```

2. **Update Services** in `src/features/*/Service.js`
   ```javascript
   // Before: const result = await mockGetData();
   // After: const response = await apiClient.get('/endpoint');
   ```

3. **Remove mockServer** from imports

**That's it!** Redux doesn't change, components don't change.

## Redux Patterns You'll See

### 1. Create Async Thunk
```javascript
export const fetchData = createAsyncThunk(
  'feature/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await service.getData();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### 2. Add Extra Reducers
```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchData.pending, (state) => { state.loading = true; })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
```

### 3. Use in Component
```javascript
const dispatch = useDispatch();
const { data, loading, error } = useSelector(state => state.feature);

useEffect(() => {
  dispatch(fetchData());
}, [dispatch]);

if (loading) return <Loader />;
if (error) return <p>Error: {error}</p>;
return <div>{/* render data */}</div>;
```

## Project Structure (Visual)

```
src/
├── app/
│   ├── store.js           ← Redux store
│   └── rootReducer.js     ← Combine all reducers
├── features/
│   ├── auth/              ← Login/auth logic
│   ├── dashboard/         ← Dashboard feature
│   │   ├── dashboardSlice.js
│   │   ├── dashboardService.js
│   │   └── components/    ← Dashboard components
│   └── users/             ← Users feature
├── services/
│   ├── apiClient.js       ← Axios setup (CHANGE THIS FOR REAL API)
│   └── mockServer.js      ← Mock API (DELETE THIS WHEN USING REAL API)
├── pages/                 ← Full page components
├── components/            ← Shared components
├── styles/                ← CSS files
├── utils/                 ← Helper functions
└── App.jsx                ← Routing
```

## Common Commands

| What | Command |
|---|---|
| Start dev server | `npm start` |
| Build for prod | `npm run build` |
| Run tests | `npm test` |
| Clear node_modules | `rm -rf node_modules && npm install` |

## State Shape (Redux DevTools)

```javascript
store = {
  auth: {
    user: { id, name, email, role },
    isAuthenticated: boolean,
    isLoading: boolean,
    error: null | string
  },
  dashboard: {
    stats: { totalUsers, totalRevenue, activeSubscriptions, monthlyGrowth },
    revenueChart: Array,
    recentUsers: Array,
    loadingStats: boolean,
    loadingRevenue: boolean,
    loadingRecentUsers: boolean,
    error: null | string
  },
  users: {
    list: Array,
    selectedUser: null | object,
    total: number,
    currentPage: number,
    pageSize: number,
    loading: boolean,
    error: null | string
  }
}
```

## Debugging Tips

1. **Check Redux State**
   - Install Redux DevTools extension
   - Open DevTools (F12) → Redux tab
   - Watch state changes in real-time

2. **Check Network**
   - Open DevTools → Network tab
   - Verify mock API calls have 400-800ms delay
   - Check response payload

3. **Check Console**
   - Look for any error messages
   - Redux warnings are helpful

4. **Component Not Updating?**
   - Verify you're using `useSelector` hook
   - Check Redux state has the data
   - Verify component is re-rendering

## Files NOT to Edit (Generated/Auto)

- `node_modules/` - Don't touch
- `dist/` - Build output
- `.git/` - Git stuff
- `vite.config.js` - Build config (usually)

## Files TO Focus On

- `src/features/` - Add your business logic here
- `src/services/mockServer.js` - Replace with real API
- `src/components/` - Add new components here
- `src/pages/` - Add new pages here

## Portfolio Presentation Talking Points

✅ **"Enterprise Architecture"** - Clean layer separation
✅ **"Mock to Real API"** - Easy migration without code changes
✅ **"Best Practices"** - Redux Toolkit, async thunks, error handling
✅ **"Production Ready"** - Builds and deploys successfully
✅ **"Scalable"** - New developers can follow the pattern

---

**Need more details?** Read:
- [README.md](./README.md) - Full feature list
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Deep dive into design
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Step-by-step tutorials
