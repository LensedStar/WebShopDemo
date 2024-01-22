import React, {useEffect} from 'react';
import Items from "./Components/Items/Items";
import {useAppDispatch,useAppSelector} from "./store/hooks";
import {fetchToken} from "./store/slices/authSlice";
import Cart from "./Components/Cart/Cart";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import "./AppStyle.scss"


function App() {
    const auth = useAppSelector(store=>store.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchToken())
    }, []);


  return (
      <>
          { auth.loading ?
              <h1>Loading</h1>
              :
              auth.token ?
      <div className="app">
          <Items />
          <Cart />
          <OrderHistory />
      </div> :
                  <h1>Error</h1>
          }
      </>
  );
}

export default App;
