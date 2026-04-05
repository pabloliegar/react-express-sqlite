import { useEffect, useState } from "react";
import { socket } from "@/socket";
import "./panel.css";
import { useAuth } from "@/hooks/useAuth";

export default function UsuariosPanel() {
  const { auth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    socket.emit("login", auth?.me?.[0]?.id);
  }, [auth]);

  useEffect(() => {
    socket.on("usuarios", (data) => {
      setUsuarios(data);
    });

    return () => socket.off("usuarios");
  }, []);

  return (
    <div className="usuarios-content">
      <h3>Usuarios</h3>

      {usuarios.length === 0 && (
        <p style={{ color: "#aaa" }}>No hay usuarios</p>
      )}

      {usuarios.map((user) => (
        <div key={user.id} className="user">
          <span>{user.nombre}</span>
          <span className={user.conectado ? "online" : "offline"}>
            {user.conectado ? "🟢" : "🔴"}
          </span>
        </div>
      ))}
    </div>
  );
}