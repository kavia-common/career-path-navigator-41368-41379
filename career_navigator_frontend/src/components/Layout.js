import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

function NavItem({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link ${isActive ? 'active' : ''}`
        }
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
      >
        {children}
      </NavLink>
    </li>
  );
}

// PUBLIC_INTERFACE
export function ProtectedLayout() {
  /** App shell with sidebar and topbar for authenticated sections */
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <Link to="/" className="brand-link">Career Navigator</Link>
        </div>
        <nav>
          <ul>
            <NavItem to="/">Dashboard</NavItem>
            <NavItem to="/roles">Career Roles</NavItem>
            <NavItem to="/competencies">Competencies</NavItem>
            <NavItem to="/recommendations">Recommendations</NavItem>
            <NavItem to="/resources">Resources</NavItem>
            <NavItem to="/jobs">Job Tracking</NavItem>
            <NavItem to="/progress">Progress</NavItem>
          </ul>
        </nav>
      </aside>
      <main className="main">
        <header className="topbar" aria-label="User and actions">
          <div className="grow" />
          <button
            className="btn subtle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          {user && (
            <div className="userbox">
              <span className="user-email" aria-label="Signed in user">
                {user.full_name || user.email}
              </span>
              <button className="btn danger" onClick={logout}>Logout</button>
            </div>
          )}
        </header>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
