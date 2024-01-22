import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import API_MAP from "../../APIMAP";



type initialStateType = {
    token:string | null,
    loading:boolean
}


export const fetchToken = createAsyncThunk<string>(
    "token/fetch",
    async ()=>{
        const response = await axios.post(API_MAP.token,
            {email:"admin@local",password:"Admin"})
        const responseData =  await response.data
        return responseData.token
    }
)

const initialState : initialStateType = {
    token:null,
    loading:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchToken.fulfilled,(state,action)=>{
                state.token = action.payload
                state.loading = false
            })
            .addCase(fetchToken.rejected,(state)=>{
                state.loading = false
                throw new Error("Something went wrong")
            })
            .addCase(fetchToken.pending,(state)=>{
                state.loading = true
            })
    }
})

export default authSlice.reducer