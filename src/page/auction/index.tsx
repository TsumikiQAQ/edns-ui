import { Navigate, Route, Routes } from "react-router-dom"
import AuctionNavPage from "./AuctionNav"
import MyAuctionPage from "./MyAuction"
import CreateAuctionPage from "./CreateAuction" 
import AuctionInfoPage from "./AuctionInfo"
import React from "react"
const AuctionPage=()=>{
    return(
        <AuctionNavPage>
        <Routes>
        <Route path="/" element={<MyAuctionPage />} children={<Route path="/auction/myAuction" element={<MyAuctionPage />}></Route>}/>
        <Route path="/myAuction" element={<MyAuctionPage />}></Route>
        <Route path="/createAuction" element={<CreateAuctionPage />}></Route> 
        <Route path="/auctionInfo" element={<AuctionInfoPage />}></Route> 
        </Routes>
        </AuctionNavPage>
    )
}
export default AuctionPage