import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import APIMAP from "../../APIMAP";

type Item = {
    name: string,
    amount: string,
    description: string,
    eTag: string,
    id: string,
    key: string
}
type ItemsInitialState = {
    list: Item[] | null
}

export const fetchItems = createAsyncThunk<Item[],string>(
    "items/fetch",
        async (token)=>{
         const response = await fetch(APIMAP.items,{
             headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    )
       return (await response.json())
    }
    )




const initialState : ItemsInitialState ={list:null}

const itemsSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchItems.fulfilled,(store,action)=>{
                store.list = action.payload
            })
    }
})

export default itemsSlice.reducer