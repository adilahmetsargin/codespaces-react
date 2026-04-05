import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  fetchRevenueChart,
  fetchRecentUsers,
} from '../features/dashboard/dashboardSlice';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import StatsCards from '../features/dashboard/components/StatsCards';
import RevenueChart from '../features/dashboard/components/RevenueChart';
import RecentUsersTable from '../features/dashboard/components/RecentUsersTable';
import Loader from '../components/Loader';
import '../styles/DashboardPage.css';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const {
    stats,
    revenueChart,
    recentUsers,
    loadingStats,
    loadingRevenue,
    loadingRecentUsers,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    // Fetch all dashboard data on component mount
    dispatch(fetchDashboardStats());
    dispatch(fetchRevenueChart());
    dispatch(fetchRecentUsers(5));
  }, [dispatch]);

  if (error) {
    return (
      <div className="dashboard-page">
        <Topbar />
        <div className="dashboard-error">
          <h2>Error loading dashboard</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Topbar />
      <div className="dashboard-main">
        <Sidebar />
        <main className="dashboard-content">
          <div className="content-header">
            <h1>Dashboard</h1>
            <p>Welcome to your SaaS Dashboard</p>
          </div>

          {/* KPI Stats Cards */}
          <section className="dashboard-section">
            <StatsCards stats={stats} loading={loadingStats} />
          </section>

          {/* Charts and Tables Grid */}
          <div className="dashboard-grid">
            {/* Revenue Chart */}
            <section className="dashboard-section">
              {loadingRevenue ? (
                <Loader message="Loading chart..." />
              ) : (
                <RevenueChart data={revenueChart} loading={false} />
              )}
            </section>

            {/* Recent Users Table */}
            <section className="dashboard-section">
              {loadingRecentUsers ? (
                <Loader message="Loading users..." />
              ) : (
                <RecentUsersTable
                  users={recentUsers}
                  loading={false}
                />
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
