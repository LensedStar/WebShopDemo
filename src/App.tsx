import React, {useEffect, useState,createContext} from 'react';
import {Provider} from "react-redux";
import {store} from "./store/store";
import Items from "./Components/Items/Items";
import {useAppDispatch} from "./store/hooks";
import {fetchToken} from "./store/slices/authSlice";
import Cart from "./Components/Cart/Cart";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import "./AppStyle.scss"


function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchToken())
    }, []);
  return (
      <div className="app">
      <Provider store={store}>
          <Items />
          <Cart />
          <OrderHistory />
      </Provider>
      </div>
  );
}

export default App;
