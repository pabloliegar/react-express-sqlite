import React from "react";
import "./login.css"
import {Link} from "react-router-dom"
export function Login() {


    return(
        <>
          <form className="formulario">
            <input type="text" placeholder="correo electronico"/>
            <input type="password" placeholder="contraseña"/>
            <Link to="/registro" className="registro-link">
                 No estás registrado? Regístrate
            </Link>
            <button >Acceder</button>
          
         
          </form>  

          
        </>
    )
    
}