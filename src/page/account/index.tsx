import { Navigate, Route, Routes } from "react-router-dom"

import React from "react"
import MarketPage from "./marktPage"
import AccountNavPage from "./AccountNav"
import MyStarPage from "./MyStar"
import MyDomainsPage from "./MyDomain"
import MyrequestPage from "./Myrequest"
const AuctionPage=()=>{
    return(
        <AccountNavPage>
        <Routes>
        <Route path="/" element={<MarketPage />} children={<Route path="/account/market" element={<MarketPage />}></Route>}/>
        <Route path="/market" element={<MarketPage />}></Route>
        <Route path="/mystar" element={<MyStarPage />}></Route>
        <Route path="/mydomain" element={<MyDomainsPage />}></Route>
        <Route path="/myrequest" element={<MyrequestPage />}></Route>
        </Routes>
        </AccountNavPage>
    )
}
export default AuctionPage