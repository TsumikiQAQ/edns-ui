import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import DrageListener from "../components/filedrag/dragelistener"

import HomePage from "./Home"
import AuctionPage from "./auction"
import AccountPage from "./account"
import ConfigPage from "./config"
export const PageIndex = () => {
    return (
        <DrageListener>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/homePage"/>} />
                    <Route path="/homePage/*" element={<HomePage />} />
                    <Route path="/account/*" element={<AccountPage />} />
                    <Route path="/auction/*" element={<AuctionPage />} />
                    <Route path="/config/*" element={<ConfigPage />} />
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
            </Router>
        </DrageListener>
    )
}