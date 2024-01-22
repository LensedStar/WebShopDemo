export  type Item = {
    name: string;
    amount: string;
    description: string;
    eTag: string;
    id: string;
    key: string;
};

export type AddressType = {
    ship_To_Address: string;
    ship_To_Post_Code: string;
    ship_To_Name: string;
    ship_To_City: string;
    eTag: string;
    id: string;
    key: string;
};

export type NewAddress = {
    ship_To_Address: string
    ship_To_Post_Code: string
    ship_To_Name: string
    ship_To_City: string
}

export type PutOrder ={
    item_Lookup: string,
    quantity: number,
    total_Amount: number,
    amount: number,
    name: string,
    order_Lookup: string
}

export type AddressResponse = {
    ship_To_Address: string
    ship_To_Post_Code: string
    ship_To_Name: string
    ship_To_City: string
    eTag: string
    id: string
    key: string
}

export type Order ={
    item_Lookup: string
    quantity: number
    total_Amount: number
    amount: number
    name: string
    order_Lookup: string
    eTag: string
    id: string
    key: string
}

export type OrdersType = {
    item_Lookup: string,
    quantity: number,
    total_Amount: number,
    amount: number,
    name: string,
    order_Lookup: string,
    eTag: string,
    id: string,
    key: string
}
