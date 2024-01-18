import React, {useEffect} from "react";
import {useForm,SubmitHandler} from "react-hook-form";
import {useAppDispatch} from "../../store/hooks";
import {useAppSelector} from "../../store/hooks";
import {putAddress,fetchAddress} from "../../store/slices/addressSlice";
import "./AdressFormStyle.scss"

type Inputs = {
    address: string,
    code: string,
    name: string,
    city: string
}

export default function AddressForm(){
    const token = useAppSelector(state => state.token.token)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit
    } = useForm<Inputs>()


    const onSubmit:SubmitHandler<Inputs> = (data,event) =>{
        event?.preventDefault()
        if (token) {
            dispatch(putAddress({
                orders: {
                    ship_To_Address: data.address,
                    ship_To_Post_Code: data.code,
                    ship_To_Name: data.name,
                    ship_To_City: data.city,
                },
                token: token
            }))
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="orderFormInput">
                <p>Adress</p>
                <input type="text" {...register("address",{required:true})}/>
            </div>
            <div className="orderFormInput">
                <p>Post number</p>
                <input type="number" {...register("code",{required:true})}/>
            </div>
            <div className="orderFormInput">
                <p>Name</p>
                <input type="text" {...register("name",{required:true})}/>
            </div>
            <div className="orderFormInput">
                <p>City</p>
                <input type="text" {...register("city",{required:true})}/>
            </div>
            <button className="submitButton" type="submit">Submit</button>
        </form>
    )
}