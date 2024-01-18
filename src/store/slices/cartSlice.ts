import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type ActionType = {
        name: string,
        quantity: number,
        key: string,
        amount:number,
        id:string
}

type Product =
    {
    name:string,
    amount:number
    key:string
    quantity:number
    id:string
    }

type Cart = {
    items:Record<string, Product>
}

const initialState:Cart = {
    items:{}
}


const cardSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem:(store,action:PayloadAction<ActionType>)=>{
            const { id } = action.payload
            const itemToAdd = store.items[id]

            if(itemToAdd){
                store.items[id].quantity += 1
                store.items[id].amount  += action.payload.amount
            }
            else{
                store.items[id] = action.payload
            }
        },
        removeItem:(store,action:PayloadAction<string>)=>{
            delete store.items[action.payload]
        },
        plusAmount:(store,action :PayloadAction<string>)=>{
            const id = action.payload
            store.items[id].quantity += 1
            store.items[id].amount += store.items[id].amount
        },
        minusAmount:(store,action:PayloadAction<string>)=> {
            const id = action.payload
            const quantity = store.items[id].quantity
            if (quantity > 1) {
                store.items[id].quantity -= 1
            } else {
                delete store.items[id]
            }
        },
        removeAllItems:(store) =>{
            store.items = {}
        }
    }
}
)


export const {addItem,
    removeItem,
    plusAmount,
    minusAmount,
    removeAllItems} = cardSlice.actions
export default cardSlice.reducer