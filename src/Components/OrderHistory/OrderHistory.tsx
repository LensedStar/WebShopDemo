import React, {useEffect, useState} from "react";
import {useAppDispatch,useAppSelector} from "../../store/hooks";
import {fetchOrder} from "../../store/slices/orderSlice";

import "./OrderHistoryStyle.scss"

export default function OrderHistory(){
    const orderHistory = useAppSelector(store=>store.orders.orders)
    const token = useAppSelector(store=>store.token.token)
    const address = useAppSelector(store=>store.address.addressList)
    const dispatch = useAppDispatch()

    const [filterParam,setFilterParam] = useState<string>("")

    useEffect(() => {
        if(token) {
            dispatch(fetchOrder({token:token,param:filterParam}))
        }
    }, [token,dispatch,filterParam]);



    return(
        <div className="orderHistoryContainer">
            <select onChange={event=>setFilterParam(event.target.value)}>
                {address && address.map(address=>{
                        const {key,ship_To_Address,ship_To_Post_Code} = address
                        return(
                            <option key={key} value={key}>{ship_To_Address},{ship_To_Post_Code}</option>
                        )
                    })
                }
                <option value="">All</option>
            </select>
        <div className="orderHistoryList">
            {
                orderHistory && orderHistory.length ?
                    orderHistory.map(order=>{
                        const {key,name,amount,quantity} = order
                        return(
                            <div className="orderHistoryItem" key={key}>
                                <p>Name:{name}</p>
                                <p>Amount:{amount}</p>
                                <p>Quantity:{quantity}</p>
                            </div>
                        )
                    }):
                    <h2>You dont have any order yet</h2>
            }
        </div>
        </div>
    )
}
