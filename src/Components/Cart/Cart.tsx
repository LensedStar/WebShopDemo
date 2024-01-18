import React, {useEffect, useState} from "react";
import {useAppSelector,useAppDispatch} from "../../store/hooks";
import {plusAmount,minusAmount,removeItem,removeAllItems} from "../../store/slices/cartSlice";
import {fetchAddress} from "../../store/slices/addressSlice";
import {putOrder} from "../../store/slices/orderSlice";
import AddressForm from "../AddressForm/AddressForm";
import "./Card.scss"


type OrderItems = {
    item_Lookup:string,
    quantity: number,
    total_Amount: number,
    amount: number,
    name: string,
    order_Lookup:string
}

export default function Cart(){
    const store = useAppSelector(state => state.cart.items)
    const dispatch = useAppDispatch()
    const token = useAppSelector(store=>store.token.token)
    const address = useAppSelector(store=>store.address.addressList)


    const [addressId,setAddressId] = useState<string|null>(null)

    useEffect(() => {
        if(token) {
            dispatch(fetchAddress(token))
        }
    }, [dispatch,token]);

    console.log(address)


    const handlePlus = (id:string) =>{
        dispatch(plusAmount(id))
    }
    const handleMinus = (id:string) =>{
        dispatch(minusAmount(id))
    }

    const handleRemove = (id:string) =>{
        dispatch(removeItem(id))
    }

    const handleOrder = ()=>{
        if (token && addressId) {
            Object.values(store).forEach((item)=>{
                console.log(item)
                const orderData : OrderItems = {
                    item_Lookup:item.key,
                    quantity: item.quantity,
                    total_Amount:item.amount,
                    amount:(item.amount*100/item.quantity*100)/100,
                    name: item.name,
                    order_Lookup:addressId
                    }
              dispatch(putOrder({
                  order:orderData,
                  token:token
              }))
            })
            dispatch(removeAllItems())
        }
        else {
            alert("Select address first!")
        }
        }
    return(
        <div className="cartContainer">
            <h1>Your cart</h1>
            <div className="cartlist">
            {Object.keys(store).length ?
                    Object.values(store).map(item=>{
                        const {name, amount, key, quantity,id} = item
                        return(
                            <div key={key} className="cartItem">
                                <p>Name:{name}</p>
                                <p>Amount:{amount}</p>
                                <p>Quantity:{quantity}</p>
                                <div>
                                    <button onClick={()=>handlePlus(id)}>+</button>
                                    <button onClick={()=>handleMinus(id)}>-</button>
                                </div>
                                <div>
                                    <button onClick={()=>handleRemove(id)}>Remove</button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <h1>Your cart is empty!</h1>
            }
            </div>
            <div >
                {<button className="orderButton" disabled={!Object.keys(store).length} onClick={()=>handleOrder()}>Order</button>}
            </div>
            <div className="orderAddress">
                <h1>Select Address Details</h1>
                <div className="addressList">
                    {address ?
                            address.map(ad=>{
                                const {
                                    ship_To_Address
                                    ,ship_To_Name,
                                    ship_To_City,
                                    ship_To_Post_Code,
                                    key,
                                    id} = ad
                                return(
                                    <div className={key === addressId ? "addressDetailsSelected" : "addressDetails"} key={key}>
                                        <div>{ship_To_Address}</div>
                                        <div>{ship_To_Name}</div>
                                        <div>{ship_To_Post_Code}</div>
                                        <div>{ship_To_City}</div>
                                        <button onClick={()=>setAddressId(key)}> Select Address</button>
                                    </div>
                            )})
                        :
                        <h1>You dont have any saved address</h1>
                    }
                </div>
                <AddressForm />
            </div>
        </div>
    )
}