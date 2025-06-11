import React from 'react'
import {Routes ,BrowserRouter,Route  } from "react-router-dom"
//import {Login} from "../components/login/login"
import {Principal} from "@/components/principal/principal"
import {Registro} from "../components/registro/registro"
//import {map} from "lodash"
export function Navigation(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Principal/>}/>
                <Route path='/registro' element={<Registro/>}/>
            </Routes>
        </BrowserRouter>
    )
}