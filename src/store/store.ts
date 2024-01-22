import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";

import {Api} from "./services/api";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice,
        [Api.reducerPath]:Api.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(Api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch