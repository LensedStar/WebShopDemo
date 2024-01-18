import {configureStore} from "@reduxjs/toolkit";
import itemsSlice from "./slices/itemsSlice";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
    reducer:{
        token:authSlice,
        items:itemsSlice,
        address:addressSlice,
        cart:cartSlice,
        orders:orderSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch