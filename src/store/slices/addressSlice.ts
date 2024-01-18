import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API_MAP from "../../APIMAP";

type OrderType = {
    ship_To_Address: string,
    ship_To_Post_Code: string,
    ship_To_Name: string,
    ship_To_City: string,
    eTag: string,
    id: string,
    key: string
}

type PutOrderType = {
    ship_To_Address: string,
    ship_To_Post_Code: string,
    ship_To_Name: string,
    ship_To_City: string,
}

type PutOrderParamType = {
    orders:PutOrderType,
    token:string
}


type initialStateType ={
    addressList:OrderType[] | null,
    loading:boolean,
    error:boolean
}

export const fetchAddress = createAsyncThunk<OrderType[],string>(
    "address/fetch",
    async (token) =>{
        const response = await fetch(API_MAP.orders,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        )
        return (await response.json())
    }
)

export const putAddress = createAsyncThunk<OrderType,PutOrderParamType>(
    "address/put",
    async (order)=>{
        const response = await fetch(API_MAP.putOrder,{
            method:"PUT",
            headers: {
                "Authorization": `Bearer ${order.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order.orders)
        })
        return await response.json()
    }
)


const initialState:initialStateType = {
    addressList:null,
    loading:false,
    error:false
}

const addressSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAddress.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchAddress.fulfilled,(state, action)=>{
                state.loading = false
               if(action.payload.length){
                   state.addressList = action.payload
               }
            })
            .addCase(fetchAddress.rejected,(state)=>{
                state.loading = false
                state.error = true
                alert("Something wrong!")
            })
            .addCase(putAddress.pending,state => {
                state.loading = true
            })
            .addCase(putAddress.fulfilled,(state,action)=>{
                if(state.addressList) {
                    state.addressList = [...state.addressList, action.payload]
                }else {
                    state.addressList = [action.payload]
                }
                state.loading = false
            })
    }
})

export default addressSlice.reducer