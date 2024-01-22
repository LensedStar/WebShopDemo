import React, {useState} from "react";

import {useGetAllOrdersQuery,useGetAllAddressesQuery,useDeleteOrderMutation} from "../../store/services/api";

import "./OrderHistoryStyle.scss"

export default function OrderHistory(){
    const [filterParam,setFilterParam] = useState<string>("")

    const {isLoading,data,error} = useGetAllOrdersQuery(filterParam)

    const {data:addressData} = useGetAllAddressesQuery()

    const [mutator] = useDeleteOrderMutation()

    return(
        <div className="orderHistoryContainer">
            <select onChange={event=>setFilterParam(event.target.value)}>
                {addressData && addressData.map(address=>{
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
                data ?
                    data.map(order=>{
                        const {key,name,amount,quantity,id} = order
                        return(
                            <div className="orderHistoryItem" key={key}>
                                <p>Name:{name}</p>
                                <p>Amount:{amount}</p>
                                <p>Quantity:{quantity}</p>
                                <button onClick={()=>mutator(id)}>Delete</button>
                            </div>
                        )
                    })
                        :
                    isLoading ? <h1>loading...</h1>
                        :
                    error ? <h1>Error!</h1>
                        :
                    <h2>You dont have any order yet</h2>
            }
        </div>
        </div>
    )
}