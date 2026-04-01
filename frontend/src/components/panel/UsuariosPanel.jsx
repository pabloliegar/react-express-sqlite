import { useEffect, useState } from "react";
import { socket } from "@/socket";
import "./panel.css";
import { useAuth } from "@/hooks/useAuth";
export default function UsuariosPanel() {
  const { auth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket.emit("login", auth?.me?.[0]?.id); // 👈 ID real del usuario
  }, []);
  useEffect(() => {
    socket.on("usuarios", (data) => {
      setUsuarios(data);
    });

    return () => socket.off("usuarios");
  }, []);

  return (
    <>
      {/* Botón hamburguesa */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Sidebar */}
       <div className={`usuarios-sidebar ${open ? "open" : ""}`}>
        <h3>Usuarios</h3>

        {usuarios.map((user) => (
          <div key={user.id} className="user">
            <span>{user.nombre}</span>
            <span className={user.conectado ? "online" : "offline"}>
              {user.conectado ? "🟢" : "🔴"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}