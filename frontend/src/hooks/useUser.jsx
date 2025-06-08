import {createUser} from "../api/users"

export function useUser(){
    const getMe=async()=>{
        const response= null
        return response
    }
     const userCreate=async(data)=>{
        const response= await createUser(data)
        return response
    }
    return {
        getMe,
        userCreate
    }
}