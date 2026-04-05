import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersList } from '../features/users/usersSlice';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { formatDate } from '../utils/formatters';
import '../styles/UsersPage.css';

export default function UsersPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { list: users, loading, error, total, currentPage: statePage } =
    useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersList({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  if (loading && users.length === 0) {
    return (
      <div className="users-page">
        <Topbar />
        <Loader message="Loading users..." />
      </div>
    );
  }

  return (
    <div className="users-page">
      <Topbar />
      <div className="users-main">
        <Sidebar />
        <main className="users-content">
          <div className="content-header">
            <h1>Users</h1>
            <p>Manage all users in your system</p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {users.length === 0 && !loading ? (
            <EmptyState
              icon="👥"
              title="No Users"
              message="There are no users in the system yet."
            />
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Join Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="name-cell">
                        <span className="user-avatar-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                        {user.name}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{formatDate(user.joinDate)}</td>
                      <td>
                        <span className={`status ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(totalPages, prev + 1)
                    )
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
