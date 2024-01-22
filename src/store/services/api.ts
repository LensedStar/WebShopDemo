import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import {Item,AddressType,NewAddress,PutOrder,AddressResponse,Order,OrdersType} from "./apiTypes";

import API_MAP from "../../APIMAP";


export const Api = createApi({
    reducerPath: "services/itemsApi",
    tagTypes:['Address','Orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_MAP.baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers; // You need to return the modified headers object
        },
    }),
    endpoints: (builder) => ({
        getAllItems: builder.query<Item[], void>({
            query: () => `Item/`,
        }),
        getAllAddresses: builder.query<AddressType[], void>({
            query: () => `Order/`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Address' as const, id })), 'Address']
                    : ['Address'],
        }),
        putNewAddress: builder.mutation<AddressResponse,NewAddress>({
            query: (address ) => ({
                url: `Order/`,
                method: "PUT",
                body: address,
            }),
            invalidatesTags:["Address"]
        }),
        deleteAddress: builder.mutation<void,string>({
            query: ( id) => ({
                url: `Order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["Address"]
        }),
        getAllOrders:builder.query<Order[],string | "">({
            query:(id:string | "")=>({
                url: !id ? "Order Item/" : `Order Item?$filter=order_Lookup eq ${id}`,
                providesTags:(result:Order[]) =>
                    result
                        ? [
                            ...result.map(({ id }) => ({ type: "Orders" as const, id })),
                            { type: 'Orders', id: 'LIST' },
                        ]
                        : [{ type: 'Orders', id: 'LIST' }],
            })
        }
        ),
        putOrder:builder.mutation<OrdersType,PutOrder>({
            query:(order)=>({
            url:"Order Item",
            method:"PUT",
            body:order
         }),
            invalidatesTags:[{type:"Orders",id:"LIST"}]
        }),
        deleteOrder:builder.mutation<void,string>({
            query:(id)=>({
                url:`Order Item/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Orders"]
        })
    }),
});

export const {
    useGetAllItemsQuery,
    useGetAllAddressesQuery,
    usePutNewAddressMutation,
    useDeleteAddressMutation,
    useGetAllOrdersQuery,
    usePutOrderMutation,
    useDeleteOrderMutation}
    = Api;
