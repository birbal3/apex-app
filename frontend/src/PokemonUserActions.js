import { 
    GetUserRequest,
    GetUserSuccess,
    GetUserFailure,
    AddUserRequest,
    AddUserSuccess,
    AddUserFailure,
    AddPokemonRequest,
    AddPokemonSuccess,
    AddPokemonFailure,
    DeleteUserRequest,
    DeleteUserSuccess,
    DeleteUserFailure,
    DeleteAllUsersRequest,
    DeleteAllUsersSuccess,
    DeleteAllUsersFailure,
 } from "./PokemonUserReducer";

 export const addUser = (owner,name,ability,positionX,positionY,speed,direction)=>async (dispatch)=>{
    try {
        dispatch(AddUserRequest());

        const response = await fetch(
            "https://apex-app.onrender.com/api/v1/addpokemonuser",
            {
                method:"PUT",
                body:JSON.stringify({owner,name,ability,positionX,positionY,speed,direction}),
                headers:{
                    "Content-Type":"application/json",
                }
            }
        )

        const jsonData = await response.json();

        if(!response.ok){
            throw new Error(jsonData.message)
        }

        dispatch(AddUserSuccess(jsonData.message))
        

    } catch (error) {
        dispatch(AddUserFailure(error.message))
    }
}

export const fetchAllUsers = ()=>async (dispatch)=>{
    try {
        dispatch(GetUserRequest())
        const response = await fetch("https://apex-app.onrender.com/api/v1/getallusers",
            {
                method:"GET",
            }
        )

        const jsonData = await response.json();

        if(!response.ok){
            throw new Error(jsonData.message)
        }

        dispatch(GetUserSuccess(jsonData.users))

    } catch (error) {
        dispatch(GetUserFailure(error.messsage))
    }
}

export const addPokemon = (id,name,ability)=>async (dispatch)=>{
    try {
        dispatch(AddPokemonRequest())

        const response = await axios.put("https://apex-app.onrender.com/api/v1/addpokemontouser",
            {
                method:"PUT",
                body:JSON.stringify({id,name,ability}),
                headers:{
                    "Content-Type":"application/json",
                }
            }
        )

        const jsonData = await response.json();

        if(!response.ok){
            throw new Error(jsonData.message)
        }
        dispatch(AddPokemonSuccess(jsonData.message))

    } catch (error) {
        dispatch(AddUserFailure(error.message))
    }
}

export const deleteUser = (id)=>async (dispatch)=>{
    try {
        dispatch(DeleteUserRequest())

        const response = await fetch("https://apex-app.onrender.com/api/v1/removeuser",
            {
                method:"DELETE",
                body:JSON.stringify({id}),
                headers:{
                    "Content-Type":"application/json",
                }
            }
        )

        const jsonData = await response.json();

        if(!response.ok){
            throw new Error(jsonData.message)
        }

        dispatch(DeleteUserSuccess(jsonData.message))

    } catch (error) {
        dispatch(DeleteUserFailure(error.message))
    }
}

export const deleteAllUsers = ()=>async (dispatch)=>{
    try {
        dispatch(DeleteAllUsersRequest())

        const response = await fetch("https://apex-app.onrender.com/api/v1/removealluser",
            {
                method:"DELETE",
            }
        )

        const jsonData = await response.json();

        if(!response.ok){
            throw new Error(jsonData.message)
        }

        dispatch(DeleteAllUsersSuccess(jsonData.message))

    } catch (error) {
        dispatch(DeleteAllUsersFailure(error.message))
    }
}