import React, {useEffect} from "react";
import {fetchItems} from "../../store/slices/itemsSlice"
import {useAppDispatch,useAppSelector} from "../../store/hooks";
import {addItem} from "../../store/slices/cartSlice";

import "./ItemsStyle.scss"


type CartItem = {
    name:string,
    amount:number,
    key:string,
    quantity:number,
    id:string,
}

function Items () {
    const token = useAppSelector(state => state.token.token)
    const items = useAppSelector(state => state.items.list)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (token){
            console.log(token)
        dispatch(fetchItems(token))
            }
    }, [token]);

    const handleAddToCart = (item:CartItem) =>{
        console.log(item)
        dispatch(addItem(item))
    }

    return(
        <div className="ItemContainer">
            <h1>Item List</h1>
        <div className="itemList">
        {
            items ?
                items.map(item=>{
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
                })
                :
                <h1>Loading...</h1>
        }
        </div>
        </div>
    )
}

export default Items