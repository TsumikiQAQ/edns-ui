import { createContext, useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import BidHistoryTable from "./BidHistoryTable";
import { useLocation, useNavigate } from "react-router-dom";
import CreateAuctionModal from "./CreateAuctionModal";
import SubmitAuctionModal from "./SubmitAuctionModal";
import { DomainContractContext } from '../../components/filedrag/dragelistener';
import { ethers } from "ethers";
import AuctionSearch from "../../components/searchFilter";

export const CDomainContext = createContext<any>({})
const CreateAuctionPage = () =>{
        const [show1,setShow1] =useState(false)
        const [show2,setShow2] =useState(false)
        const [domain,setDomain] = useState('')
        const location = useLocation()
        const [currentPrice, setCurrentPrice] = useState(1); 
        const {contractInstance} = useContext(DomainContractContext)
        const [duration,setDuration] = useState(3600*12)
        const [startPrice,setStartPrice] = useState(1)
        const [minBidPrice,setMinBidPrice] = useState(0.1)
        const navigate = useNavigate();
        useEffect(()=>{
            const getInfo = async ()=>{
                
                let sp = await contractInstance.registrationPrice() 
                let mp = await contractInstance.minBidPrice(domain)
                sp && setStartPrice(sp)
                mp && setMinBidPrice(mp)
            }
            domain && getInfo()
        },[domain])
        useEffect(()=>{
            setDomain(location.state)
        },[])
        const submitAuction = async ()=>{
            const tx = await contractInstance.startAuction(domain,duration,currentPrice,{value:ethers.parseEther(currentPrice.toString())})
            await tx.wait()
            navigate({ pathname: "/auction/auctionInfo"},{state:domain})
        }
        return(
            <Container className="CreateAuctionPage">
            <Row>
                <CDomainContext.Provider value={[domain,setDomain]}>
                <Col xs={5}>
                <AuctionSearch />
                </Col>
                </CDomainContext.Provider>
                <Col>
                <Row className="Auction-title">
                <Col>
                {domain ?
                <>
                <Row><h2>{domain}</h2></Row>
                <Row><h5>当前拍卖</h5></Row>
                </>:
                <>
                <Row><h2>请选择参与拍卖的域名</h2></Row>
                </>
                }
                </Col>
                <Col>
                    <Row className="BidValue">
                    <Col>最低起拍价：<span>{currentPrice}{' ETH'}</span></Col>
                    </Row>
                    <Row className="btnrow">
                        <Col>
                        <Button onClick={()=>{
                            setShow1(!show1)
                        }}>加价！</Button>
                        
                        <Button onClick={()=>{
                            setShow2(!show2)
                        }}>起拍！</Button>
                        
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
            <Row className="Auction-history">
                <Row className="Auction-history-Title"><Col>注意事项</Col></Row>
                <Row>
                <Container className="BidHistoryInfoList">
        <Card className="BidHistoryInfoList-title">
        <Row>
              <Col xs={4}>默认起拍价</Col>
              <Col xs={4}>最小加价金额</Col>
              <Col xs={4}>拍卖最少持续时间</Col>
        </Row>
        </Card>
        <Card className="BidHistoryInfoList-title">
        <Row>
              <Col xs={4}>{' (' + (startPrice === 1? 1:ethers.formatEther(startPrice)) + '  ETH)'}</Col>
              <Col xs={4}>{' (' + (minBidPrice === 0.1? 0.1 : ethers.formatEther(minBidPrice)) + '  ETH)'}</Col>
              <Col xs={4}>{' (12 h)'}</Col>
        </Row>
        </Card>
      
    </Container>
                </Row>
            </Row>
            <CreateAuctionModal show={show1} onHide={()=>setShow1(!show1)} Price={{currentPrice, setCurrentPrice}} time={{duration,setDuration}}/>
            <SubmitAuctionModal show={show2} onHide={()=>setShow2(!show2)} Price={{currentPrice, setCurrentPrice}} time={{duration,setDuration}} submitAuction={submitAuction}/>
                </Col>
            </Row>
            </Container>
        )
}
export default CreateAuctionPage