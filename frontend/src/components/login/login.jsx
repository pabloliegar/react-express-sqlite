import React, { useState } from "react";
import "./login.css"
import {Link,useNavigate} from "react-router-dom"
import {useAuth} from "@/hooks/useAuth"
import {loginUser} from "@/api/users"
export function Login({ onSuccess }) {
const navigate = useNavigate();
  const {login} = useAuth()
   const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formValue);
      login(response);
      if (onSuccess) onSuccess(); // <- cierra el modal desde Principal
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Aquí puedes mostrar un mensaje al usuario
    }
  };
    return(
        <>
           <form className="formulario" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="correo electrónico"
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="contraseña"
        value={formValue.password}
        onChange={handleChange}
      />
            <Link to="/registro" className="registro-link">
                 No estás registrado? Regístrate
            </Link>
            <button >Acceder</button>
          
         
          </form>  

          
        </>
    )
    
}