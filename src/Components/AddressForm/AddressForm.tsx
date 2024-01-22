
import React from "react";
import {useForm,SubmitHandler} from "react-hook-form";
import {usePutNewAddressMutation} from "../../store/services/api";
import "./AdressFormStyle.scss"

type Inputs = {
    address: string,
    code: string,
    name: string,
    city: string
}

export default function AddressForm(){
    const {
        register,
        handleSubmit
    } = useForm<Inputs>()

    const [mutator] = usePutNewAddressMutation()

    const onSubmit:SubmitHandler<Inputs> = (data,event) =>{
        event?.preventDefault()
        const {address,code,name,city} = data
        mutator({
            ship_To_Address:address,
            ship_To_Post_Code:code,
            ship_To_Name:name,
            ship_To_City:city,
        })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="orderFormInput">
                <p>Address</p>
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

