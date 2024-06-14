import { Container, Row, Col, Button } from "react-bootstrap"
import BidHistoryTable from "./BidHistoryTable";
import { createContext, useContext, useEffect, useState } from "react";
import AuctionModal from "./AuctionModal";
import { useLocation } from "react-router-dom";
import { DomainContractContext } from "../../components/filedrag/dragelistener";
import { ethers } from "ethers";
import EndAuctionModal from "./EndAuctionModal";
import AuctionInfoSearch from "../../components/searchAuction";

export const ADomainContext = createContext<any>({})

const AuctionInfoPage = () =>{
    const {contractInstance} = useContext(DomainContractContext)
    const location = useLocation()
    const [show1,setShow1] =useState(false)
    const [show2,setShow2] =useState(false)
    const [domain,setDomain] = useState('')
    const [auction,setAuction]  = useState<any>()
    const [auctionBids,setAuctionBids] = useState<any>([])
    const [ip,setIp] = useState('')
    const [content,setContent] = useState('')
    const [currentPrice, setCurrentPrice] = useState(1); 
      
    const bid = async (price:number)=>{        
        await contractInstance.bid(domain,price,{value:ethers.parseEther(price.toString())}).catch(()=>{
            alert('拍卖已结束，请检查拍卖时间')
            setShow1(false)
        })        
    }
    const endAuction = async ()=>{
        await contractInstance.endAuction(domain,ip,content).catch(()=>{
            alert('只有中标账户拥有结算拍卖的权限，请检查账户地址，并确认拍卖是否结束')
            setShow2(false)
        })
    }

    useEffect(()=>{
        location.state && setDomain(location.state)
        const getInfo=async ()=>{
            let atN = await contractInstance.getAuctionName(domain)
            let at = await contractInstance.auctions(atN)
            let abs:any = []
            if(at[8]>0){
                abs = await contractInstance.getAuctionBids(domain)
            }
            setAuction(at)            
            setAuctionBids(abs)
            setCurrentPrice(Number(ethers.formatEther(at[6])))
        }
        domain && getInfo()
    },[domain,show1])
    
   
    return(
        <Container>
            <Row>
            <ADomainContext.Provider value={[domain,setDomain]}>
                <Col xs={5}>
                <AuctionInfoSearch/>
                </Col>
            </ADomainContext.Provider>
                <Col>
                <Row className="Auction-title">
            <Col>
            {
                domain ? 
                <>
                 <Row><h2>{domain}</h2></Row>
            <Row><h5>正在拍卖中！</h5></Row>
                </>:
                <>
                 <Row><h2>请先查询拍卖</h2></Row>
                </>
            }
           
            </Col>
            <Col>
                <Row className="BidValue">
                <Col>最后一次加价:
                {
                    domain && <span>{currentPrice}{" ETH"}</span>
                }
                
                </Col>
                </Row>
                <Row className="btnrow">
                    <Col>
                    <Button onClick={()=>{
                        setShow1(!show1)
                    }}>加价！</Button>
                    
                    <Button onClick={()=>{
                        setShow2(!show2)
                    }}>结算！</Button>
                    
                    </Col>
                    
                </Row>
            </Col>
        </Row>
        <Row className="Auction-history">
            <Row className="Auction-history-Title">竞标历史</Row>
            <Row>
            <BidHistoryTable bidHistory={auctionBids} />
            </Row>
        </Row>
                </Col>
            </Row>
        <AuctionModal show={show1} onHide={()=>setShow1(!show1)} Price={{currentPrice, setCurrentPrice}} ip={{ip,setIp}} content={{content,setContent}} bid={bid}/>
        <EndAuctionModal show={show2} onHide={()=>setShow2(!show2)} Price={{currentPrice, setCurrentPrice}} ip={{ip,setIp}} content={{content,setContent}} endAuction={endAuction}/>
        </Container>
    )
}
export default AuctionInfoPage