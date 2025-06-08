import React , { useState, useEffect, createContext} from "react"
import {setToken, getToken, removeToken} from "../api/token"
import {useUser} from "../hooks/useUser"

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,

});

export function AuthProvider(props){
    const {children} =props;
    const [auth ,setAuth] = useState(undefined)
    const {getME} = useUser()

    useEffect( ()=>{
       (async ()=>{
        const token = getToken();
        if(token){
           const me = await getME(token)
           setAuth({token,me})
        }else{
            setAuth(null)
        }
       })(); 
       // eslint-disable-next-line
    }, []);
    const login = async (token) => {
        setToken(token)
        const me = await getME(token)
        setAuth({token, me})
    };

    const logout = () => {
        if(auth){
            removeToken();
            setAuth(null);
        }
    }
    const valueContext = {
        auth,
        login,
        logout,
    };
    if (auth===undefined) return null;
    return(
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}