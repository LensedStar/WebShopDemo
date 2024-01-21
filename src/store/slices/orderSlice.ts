import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API_MAP from "../../APIMAP";

type OrdersType = {
    item_Lookup: string,
    quantity: number,
    total_Amount: number,
    amount: number,
    name: string,
    order_Lookup: string,
    eTag: string,
    id: string,
    key: string
}

type initialStateType = {
    orders:OrdersType[]|null
}

const initialState:initialStateType = {
    orders: null
}

type putOrderType = {
    order: {
        item_Lookup: string,
        quantity: number,
        total_Amount: number,
        amount: number,
        name: string,
        order_Lookup: string
    }
    token:string,
}



export const putOrder = createAsyncThunk<OrdersType,putOrderType>("order/put",
    async (orderItem)=>{
         const {order,token} = orderItem
        const response = await fetch(`${API_MAP.putItemOrder}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body:JSON.stringify(order)
        })
        return await response.json()
    })

export const fetchOrder = createAsyncThunk<OrdersType[],{token:string,param:string}>(
    "fetch/orders",
    async (params) =>{
        const orderLookup =params.param;
        if(orderLookup) {
            const response = await fetch(`${API_MAP.putItemOrder}?$filter=order_Lookup eq ${orderLookup}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${params.token}`,
                }
            })
            return await response.json()
        }else {
            const response = await fetch(`${API_MAP.putItemOrder}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${params.token}`,
                }
            })
            return await response.json()
        }
    }
)

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(putOrder.fulfilled,(state, action)=>{
                if(state.orders){
                state.orders = [...state.orders,action.payload]
                }else {
                    state.orders = [action.payload]
                }
        })
            .addCase(putOrder.rejected,()=>{
                throw new Error("Something went wrong")
            })

            .addCase(fetchOrder.fulfilled,(state,action)=>{
                state.orders = action.payload
        })
            .addCase(fetchOrder.rejected,()=>{
                throw new Error("Something went wrong")
            })
    }
})

export default orderSlice.reducer