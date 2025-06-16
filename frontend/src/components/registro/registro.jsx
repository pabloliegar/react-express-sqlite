import React ,{useState}from "react";
import "./registro.css"
import {useUser} from "@/hooks/useUser"
import {Link} from "react-router-dom"
export function Registro(){
    const {userCreate}=useUser()
    const [form, setform] = useState({
        nombre: '',
        email: '',
        contrasena: '',
        avatar: ''
    })
    const handleChange = e => {
        setform({ ...form, [e.target.name]: e.target.value });
  };
   const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newUser = await userCreate(form);
      console.log('Usuario creado:', newUser);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };
    return(
        <>
            <form className="formulario" onSubmit={handleSubmit}>
                        <input type="txt" placeholder="nombre" name="nombre" value={form.nombre} onChange={handleChange} />
                        <input type="email" placeholder="correo electronico" name="email"  value={form.email} onChange={handleChange}/>
                        <input type="password" placeholder="contraseña"  name="contrasena"  value={form.contrasena} onChange={handleChange}/>
                        <Link to="/login" className="registro-link">
                            volver al login
                        </Link>
                        <button >Regístrarse</button>
                      
                     
                      </form>  
        </>
    )

}