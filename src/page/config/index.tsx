import { Navigate, Route, Routes } from "react-router-dom"

import React from "react"
import AccountInfosPage from "./AccountInfosPage"
import AuctionInfosPage from "./AuctionInfosPage"
import ConfigNav from "./ConfigNav"

const ConfigPage=()=>{
    return(
        <ConfigNav>
        <Routes>
        <Route path="/" element={<AccountInfosPage />} children={<Route path="/account/market" element={<AccountInfosPage />}></Route>}/>
        <Route path="/accountInfo" element={<AccountInfosPage />}></Route>
        <Route path="/auctionInfo" element={<AuctionInfosPage />}></Route>

        </Routes>
        </ConfigNav>
    )
}
export default ConfigPage