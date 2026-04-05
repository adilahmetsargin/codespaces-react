import { formatDate } from '../../../utils/formatters';
import '../../../styles/RecentUsersTable.css';

export default function RecentUsersTable({ users, loading }) {
  if (loading) {
    return (
      <div className="table-container">
        <div className="table-header skeleton"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="table-row skeleton"></div>
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="table-container">
        <p className="empty-message">No recent users</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h3 className="table-title">Recent Users</h3>
      <table className="table">
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
    </div>
  );
}
