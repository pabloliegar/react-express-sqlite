import { Home, User, Menu, Users } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import './SidebarLayout.css';
import { useAuth } from '@/hooks/useAuth';
import UsuariosPanel from '../components/panel/UsuariosPanel';

export function SidebarLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    setLeftOpen(false);
    setRightOpen(false);
    window.location.href = "/";
  }
  return (
    <div className="layout">

      {/* 🔘 BOTONES MÓVIL */}
      <button
        className="menu-btn left"
        onClick={() => {
          setLeftOpen(!leftOpen);
          setRightOpen(false);
        }}
      >
        <Menu size={24} />
      </button>

      <button
        className="menu-btn right"
        onClick={() => {
          setRightOpen(!rightOpen);
          setLeftOpen(false);
        }}
      >
        <Users size={24} />
      </button>

      {/* 🔵 SIDEBAR */}
      <aside className={`sidebar ${leftOpen ? 'open' : ''}`}>
        <nav className="nav">
          <Link to="/" className="nav-link" onClick={() => setLeftOpen(false)}>
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link to="/profile" className="nav-link" onClick={() => setLeftOpen(false)}>
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* 🔥 WRAPPER DERECHO (CLAVE) */}
      <div className="content-wrapper">

        {/* 🟢 CONTENIDO */}
        <main className="main-content">
          <Outlet />
        </main>

        {/* 🟣 PANEL */}
        <aside className={`usuarios-panel ${rightOpen ? 'open' : ''}`}>
          <UsuariosPanel />
        </aside>

      </div>

    </div>
  );
}