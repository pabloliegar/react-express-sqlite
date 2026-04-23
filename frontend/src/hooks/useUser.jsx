import {createUser,getMeApi,deleteUserApi} from "../api/users"

export function useUser(){
    const getMe=async(token)=>{
        
        const response=  await getMeApi(token)
        return response
    }
     const userCreate=async(data)=>{
        const response= await createUser(data)
        return response
    }
    const deleteUser=async(token)=>{
        const response= await deleteUserApi(token)
        return response
    }
    return {
        getMe,
        userCreate,
        deleteUser
    }
}