import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../styles/Topbar.css';

export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">SaaS Dashboard</h1>
      </div>

      <div className="topbar-right">
        <div className="user-menu">
          {user && (
            <>
              <img
                src={user.avatar}
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-role">{user.role}</div>
              </div>
            </>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
