import React from "react";
import {useAppDispatch} from "../../store/hooks";
import {useAppSelector} from "../../store/hooks";
import {addItem} from "../../store/slices/cartSlice";
import { useGetAllItemsQuery } from "../../store/services/api";

import "./ItemsStyle.scss"


type CartItem = {
    name:string,
    amount:number,
    key:string,
    quantity:number,
    id:string,
}

function Items () {
    const token = useAppSelector(state => state.auth.token)
    const dispatch = useAppDispatch()
    const {data, error, isLoading } = useGetAllItemsQuery()



    if(error){
        console.log(data,error)
    }
    const handleAddToCart = (item:CartItem) =>{
        dispatch(addItem(item))
    }

    return(
        <div className="ItemContainer">
            <h1>Item List</h1>
        <div className="itemList">
            {isLoading ?
                <h1>Loading...</h1>
                : data ?
                data.map(item=>{
                    const {key,name,description,amount,id} = item
                    return(
                        <div key={key} >
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <p>{amount}</p>
                                <button onClick={()=>handleAddToCart({
                                    name:name,
                                    amount:parseInt(amount),
                                    key:key,
                                    quantity:1,
                                    id:id,

                                })}>Add to cart</button>

                        </div>
                    )
                }): error ? <h1>Something wrong</h1>
            : null}
        </div>
        </div>
    )
}

export default Items