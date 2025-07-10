import React from 'react'
import {Routes ,BrowserRouter,Route  } from "react-router-dom"
//import {Login} from "../components/login/login"
import {Principal} from "@/components/principal/principal"
import {Registro} from "../components/registro/registro"
import {Login} from "@/components/login/login"
import {SidebarLayout} from "@/layouts/SidebarLayout.jsx";
import {Profile} from "@/components/profile/profile.jsx";
//import {map} from "lodash"
export function Navigation(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SidebarLayout/>}>
                    <Route index element={<Principal/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                 </Route>   
                
                <Route path='/registro' element={<Registro/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}