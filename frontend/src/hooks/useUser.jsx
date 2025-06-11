import {createUser,getMeApi} from "../api/users"

export function useUser(){
    const getMe=async(token)=>{
        
        const response=  await getMeApi(token)
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