import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query";
type Item = {
    name: string,
    amount: string,
    description: string,
    eTag: string,
    id: string,
    key: string
}


const baseURL = "http://webshopdemo.devweb.b-s.si/api"
export const api = createApi({
    reducerPath:"api/createApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://webshopdemo.devweb.b-s.si/api",
    }),
    endpoints: (builder) => ({
        getAllItems: builder.query<Item[],string>({
            query: (items) => `FLB/items`,
        })})})


