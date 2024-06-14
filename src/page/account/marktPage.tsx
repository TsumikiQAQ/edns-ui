import { Row, Col, Container } from "react-bootstrap"
import Layout from "../../components/Layout"
import { Auction } from "../interface";
import { createContext, useEffect, useState } from "react";
import { AuctionItemDetail, AuctionList, BidForm } from "../auction/AuctionNav";
import FilterComponent from "../../components/filter";
import ListComponent from "../../components/domainList";

export const FilterContext = createContext<any>('')
const MarketPage = () => {
    const [minPrice,setMinPrice] = useState()
    const [maxPrice,setMaxPrice] = useState()
    const [maxLength,setMaxLength] = useState()
    const [minLength,setMinLength] = useState()
    const [type, setType] = useState('');

    return (
            <Row>
                <FilterContext.Provider value={{
                    minPrice,setMinPrice,
                    maxPrice,setMaxPrice,
                    maxLength,setMaxLength,
                    minLength,setMinLength,
                    type, setType}
                }>
                <Col xs={5}>
                    <FilterComponent />
                    </Col>
                    <Col>
                    <ListComponent />
                </Col>
                </FilterContext.Provider>
            </Row>
    )
}
export default MarketPage

