import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import API_MAP from "../../APIMAP";

type initialStateType = {
    token:string | null
}


export const fetchToken = createAsyncThunk<string>(
    "token/fetch",
    async ()=>{
        const response = await axios.post(API_MAP.token,
            {email:"admin@local",password:"Admin"})
        const responseData =  await response.data
        console.log(responseData.token)
        return responseData.token
    }
)

const initialState : initialStateType = {
    token:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchToken.fulfilled,(state,action)=>{
                state.token = action.payload
            })
    }
})

export default authSlice.reducer