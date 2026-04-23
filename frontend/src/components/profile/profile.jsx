import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import "./Profile.css";

export function Profile() {
  const { auth } = useAuth();
  const { deleteUser } = useUser();
  const user = auth?.me?.[0];

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      // 🔴 Aquí iría tu llamada a la API
      console.log("Cuenta eliminada");

      // ejemplo:
      borrar()
    }
  };
  async function borrar() {
    await deleteUser(auth.token);
      window.location.href = "/login";
  }
  if (!user) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Perfil de Usuario</h1>

        <div className="profile-item">
          <span>Nombre</span>
          <p>{user.nombre}</p>
        </div>

        <div className="profile-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="profile-item">
          <span>Registro</span>
          <p>
            {new Date(user.fecha_registro).toLocaleDateString()}
          </p>
        </div>

        {/* 🔴 BOTÓN ELIMINAR */}
        <button className="delete-btn" onClick={handleDeleteAccount}>
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}