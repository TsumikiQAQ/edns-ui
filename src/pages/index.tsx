import React from "react"
import { HashRouter as Router,Route,Routes, Navigate } from "react-router-dom"

import HomePage from "./Home"
export const PageIndex = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="test/*" element={<TestPage />} /> */}
                <Route path="*" element={<Navigate to='/' replace/>}/>
            </Routes>
        </Router>
    )
}