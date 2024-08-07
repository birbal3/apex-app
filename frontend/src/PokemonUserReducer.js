import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const pokemonUserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        GetUserRequest:(state)=>{
            state.loading = true;
        },
        GetUserSuccess:(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        },
        GetUserFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        AddUserRequest:(state)=>{
            state.loading = true;
        },
        AddUserSuccess:(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        },
        AddUserFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        AddPokemonRequest:(state)=>{
            state.loading = true;
        },
        AddPokemonSuccess:(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        },
        AddPokemonFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        DeleteUserRequest:(state)=>{
            state.loading = true;
        },
        DeleteUserSuccess:(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        },
        DeleteUserFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        DeleteAllUsersRequest:(state)=>{
            state.loading = true;
        },
        DeleteAllUsersSuccess:(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        },
        DeleteAllUsersFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        ClearMessage:(state)=>{
            state.message = null
        },
        ClearError:(state)=>{
            state.error = null
        }
    }
})

export default pokemonUserSlice.reducer

export const {
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
    ClearError,
    ClearMessage
}  = pokemonUserSlice.actions