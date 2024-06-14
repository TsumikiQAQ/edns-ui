import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { AccoutInfoContext, DomainContractContext } from "../../components/filedrag/dragelistener"
import { ethers } from "ethers"
import { DateTime } from 'luxon';
import { useNavigate } from "react-router-dom";

export function convertTimestampToDateString(timestamp: number): string {
    // 将Solidity时间戳乘以1000，转换为毫秒
    const milliseconds = timestamp * 1000;
    // 使用luxon库创建日期对象
    const date = DateTime.fromMillis(milliseconds);
    // 格式化日期为'YYYY-MM-DD'格式
    const formattedDate = date.toFormat('yyyy-MM-dd-HH:mm:ss');
    return formattedDate;
}
const AuctionsInfo =({domain,getAuctions,navigate}:{domain:any,getAuctions:any,navigate:any})=>{
    const [auctionInfo,setAuctionInfo] = useState<any>([]) 
    const [ifhover,setIfhover] = useState(false)
    useEffect(()=>{
        const getInfo = async ()=>{
           await getAuctions(domain).then((result:any)=>{
            setAuctionInfo(result)
           })
        }
        getInfo()
    },[])
    return <Row role="button" 
    className={`AuctionInfosList ${ifhover?'AuctionInfosList-hover':''}`} 
    key={domain}
    onMouseEnter={()=>{setIfhover(true)}}
    onMouseLeave={()=>{setIfhover(false)}}
    onClick={auctionInfo[7] ?()=>{alert('拍卖已结束')}:( ()=>navigate({ pathname: "/auction/auctionInfo"},{state:auctionInfo[0]}))}
    >
       { auctionInfo.length>1 &&
       <>
        <Col>{auctionInfo[0]}</Col>
        <Col>{auctionInfo[1].substring(0,7)}</Col>
        <Col>{auctionInfo[2].substring(0,7)}</Col>
        <Col xs={2}>{convertTimestampToDateString(Number(auctionInfo[3]))}</Col>
        <Col xs={2}>{convertTimestampToDateString(Number(auctionInfo[4]))}</Col>
        <Col>{ethers.formatEther(auctionInfo[5])+' ETH'}</Col>
        <Col>{ethers.formatEther(auctionInfo[6])+' ETH'}</Col>
        <Col>{auctionInfo[7]?"是":"否"}</Col>
        </>
        }
        
    </Row>
}
const MyAuctionPage = () =>{
    const [domainNames,setDomainNames] = useState<any>([])
    const {contractInstance} = useContext(DomainContractContext)
    const   {accoutInfo} = useContext(AccoutInfoContext)
    const navigate = useNavigate();

    const getAuctions = async (dm:any)=>{
        return await contractInstance.auctions(dm)
    }
    function uniqueArray(arr:any) {
        return Array.from(new Set(arr));
      }
    useEffect(()=>{
        if(accoutInfo){
            let arr = uniqueArray(accoutInfo[5])
            setDomainNames(arr) 
        }
                      
    },[accoutInfo])
    return(
        <Container>
            <Row className="AuctionInfoList">
                <Col>竞拍域名</Col>
                <Col>发起用户</Col>
                <Col>中标用户</Col>
                <Col xs={2}>开始时间</Col>
                <Col xs={2}>结束时间</Col>
                <Col>起拍价格</Col>
                <Col>最后一次加价</Col>
                <Col>是否结束</Col>
            </Row>
            {domainNames.map((item:any)=>{

                return <AuctionsInfo domain={item} getAuctions={getAuctions} navigate={navigate}/>
            })}
        </Container>
    )
}
export default MyAuctionPage