import { Home, User } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import './SidebarLayout.css';
import UsuariosPanel from '../components/panel/UsuariosPanel';

export function SidebarLayout() {
  return (
    <div className="layout">

      {/* 🔵 SIDEBAR IZQUIERDA */}
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

      {/* 🟢 CONTENIDO */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 🟣 PANEL USUARIOS */}
      <UsuariosPanel />

    </div>
  );
}