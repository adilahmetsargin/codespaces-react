import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </Link>

        <Link to="/users" className="nav-item">
          <span className="nav-icon">👥</span>
          <span>Users</span>
        </Link>

        <Link to="#" className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
