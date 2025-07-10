// SidebarLayout.jsx
import React from 'react';
import { Home, User } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import './SidebarLayout.css'; // Asegúrate de crear e importar este archivo

export function SidebarLayout () {
  return (
    <div className="layout">
      <aside className="sidebar">
        <nav className="nav">
          <Link to="/" className="nav-link">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/profile" className="nav-link">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};


