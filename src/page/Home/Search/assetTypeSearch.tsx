import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { SiNamecheap } from "react-icons/si";
import { RiAuctionFill } from "react-icons/ri";
import { MdWorkHistory } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";

import { Link } from "react-router-dom";
import { DomainContractContext } from "../../../components/filedrag/dragelistener";

const AssetTypeSearchPage = () => {
    const [className, setClassName] = useState('')
    const [show,setShow] = useState(false)
    const {contractInstance} = useContext(DomainContractContext)
    useEffect(()=>{
        const getInfo = async()=>{
            let adminaddress = await contractInstance.admin()
            contractInstance.runner.address == adminaddress && setShow(true)
        }
        contractInstance && getInfo()
    },[contractInstance])
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
                    {show && <Link to={"/config"} className={className == 'config' ? 'active' : 'normol'} >
                    <AiFillSetting />
                    </Link>}
                </Card.Body>
            </Card>
        </Container>
    )
}
export default AssetTypeSearchPage