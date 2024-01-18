
const BASE_API = "http://webshopdemo.devweb.b-s.si/api"

const API_MAP = {
    token:`${BASE_API}/WebShopDemo/Account/Authenticate`,
    items:`${BASE_API}/public/WebShopDemo/pub/FLB/Item/`,
    orders:`${BASE_API}/public/WebShopDemo/pub/FLB/Order/`,
    deleteAddress:`${BASE_API}/public/WebShopDemo/pub/FLB/Order/`,
    putOrder:`${BASE_API}/public/WebShopDemo/pub/FLB/Order`,
    putItemOrder:`${BASE_API}/public/WebShopDemo/pub/FLB/Order Item`
}

export default API_MAP