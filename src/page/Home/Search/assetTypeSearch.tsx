import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { SiNamecheap } from "react-icons/si";
import { RiAuctionFill } from "react-icons/ri";
import { MdWorkHistory } from "react-icons/md";
import { Link } from "react-router-dom";

const AssetTypeSearchPage = () => {
    const [className, setClassName] = useState('')
    useEffect(() => {
        const url = window.location.href.split('/')        
        if (url[3] == "homePage") {
            setClassName('')
        } else (
            setClassName(url[3])
        )
    },[className])
    return (
        <Container className="AssetTypeSearch">
            <Card>
                <Card.Body className="AssetType-Choose">
                    <Link to={"/homePage"} className={className == '' ? 'active' : 'normol'} >
                        <SiNamecheap />
                    </Link>
                    <Link to={"/auction"} className={className == 'auction' ? 'active' : 'normol'} >
                        <RiAuctionFill />
                    </Link>
                    <Link to={"/account"} className={className == 'account' ? 'active' : 'normol'} >
                    <MdWorkHistory />
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default AssetTypeSearchPage