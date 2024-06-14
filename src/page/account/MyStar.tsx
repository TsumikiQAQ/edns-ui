import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { AccoutInfoContext, DomainContractContext } from "../../components/filedrag/dragelistener"
import { ethers } from "ethers"
import { DateTime } from 'luxon';
import { useNavigate } from "react-router-dom";
import RequestDomainTransferModal from "./RequestDomainTransferModal";

export function convertTimestampToDateString(timestamp: number): string {
    // 将Solidity时间戳乘以1000，转换为毫秒
    const milliseconds = timestamp * 1000;
    // 使用luxon库创建日期对象
    const date = DateTime.fromMillis(milliseconds);
    // 格式化日期为'YYYY-MM-DD'格式
    const formattedDate = date.toFormat('yyyy-MM-dd-HH:mm:ss');
    return formattedDate;
}
const DomainsInfo =({domain,getDomains,navigate,getAuction,handleRequestDomain}:{domain:any,getDomains:any,navigate:any,getAuction:any,handleRequestDomain:any})=>{
    const [domainInfo,setDomainInfo] = useState<any>([]) 
    const [auctionInfo,setAuctionInfo] = useState<any>([]) 
    const [ifhover,setIfhover] = useState(false)
    
    
    useEffect(()=>{
        const getInfo = async ()=>{
           await getDomains(domain).then((result:any)=>{
            setDomainInfo(result)
           })
           await getAuction(domain).then((result:any)=>{
            setAuctionInfo(result)
           })
        }
        getInfo()
    },[])
    
    return domainInfo[0] ?<Row role="button" 
    className={`AuctionInfosList ${ifhover?'AuctionInfosList-hover':''}`} 
    key={domain}
    onMouseEnter={()=>{setIfhover(true)}}
    onMouseLeave={()=>{setIfhover(false)}}
    // onClick={auctionInfo[0] ?( ()=>navigate({ pathname: "/auction/auctionInfo"},{state:auctionInfo[0]})):(()=>navigate({ pathname: "/auction/createAuction"},{state:domain}))}
    >
       { domainInfo.length>1 &&
       <>
        <Col >{domain}</Col>
        <Col >{domainInfo[1].substring(0,7)}</Col>
        <Col >{1 +' ETH'}</Col>
        <Col >{Number(domainInfo[5])+' 次'}</Col>
        <Col >{auctionInfo[0]? "拍卖中" : "未拍卖"}</Col>
        <Col><Button onClick={()=>handleRequestDomain(domain)}>求购</Button></Col>
        </>
        }
    </Row>:<Row role="button" 
    className={`AuctionInfosList ${ifhover?'AuctionInfosList-hover':''}`} 
    key={domain}
    onMouseEnter={()=>{setIfhover(true)}}
    onMouseLeave={()=>{setIfhover(false)}}
    onClick={auctionInfo[0] ?( ()=>navigate({ pathname: "/auction/auctionInfo"},{state:auctionInfo[0]})):(()=>navigate({ pathname: "/auction/createAuction"},{state:domain}))}
    >
       { domainInfo.length>1 &&
       <>
        <Col >{domain}</Col>
        <Col >{domainInfo[1].substring(0,7)}</Col>
        <Col >{ethers.formatEther(domainInfo[4])+' ETH'}</Col>
        <Col >{Number(domainInfo[5])+' 次'}</Col>
        <Col >{auctionInfo[0]?"拍卖中":'未注册'}</Col>
        <Col>还未注册</Col>
        </>
        }
    </Row>
}
const MyStarPage = () =>{
    const [domainNames,setDomainNames] = useState<any>([])
    const {contractInstance} = useContext(DomainContractContext)
    const   {accoutInfo} = useContext(AccoutInfoContext)
    const navigate = useNavigate();
    const [selectedDomain,setSelectedDomain] = useState<any>()
    const [show,setShow] = useState(false)
    const requestDomainTransfer = async(dm:any,price:any)=>{
        return await contractInstance.requestDomainTransfer(dm,price,{value:ethers.parseEther(price.toString())})
    }
    const onHide=()=>{
        setShow(false)
    }
    const handleRequestDomain=(dm:any)=>{
        setSelectedDomain(dm)
        setShow(true)
      }
    const getDomains = async (dm:any)=>{
        return await contractInstance.getDomain(dm)
    }
    const getAuction = async (dm:any)=>{
        let atN = await contractInstance.getAuctionName(dm)
        let at =  await contractInstance.auctions(atN)            
        return at
    }
    function uniqueArray(arr:any) {
        return Array.from(new Set(arr));
      }
    useEffect(()=>{        
        if(accoutInfo){
            let arr = uniqueArray(accoutInfo[4])
            setDomainNames(arr) 
        }
                      
    },[accoutInfo])
    return(
        <Container>
            <Row className="AuctionInfoList">
                <Col >收藏域名</Col>
                <Col >所属用户</Col>
                <Col >当前价格</Col>
                <Col >竞拍次数</Col>
                <Col >当前状态</Col>
                <Col >前往求购</Col>
            </Row>
            {domainNames.map((item:any)=>{

                return <DomainsInfo domain={item} getDomains={getDomains} navigate={navigate} getAuction={getAuction} handleRequestDomain={handleRequestDomain}/>
            })}
        <RequestDomainTransferModal show={show} onHide={onHide} selectDomain={selectedDomain} requestDomainTransfer={requestDomainTransfer} />
        </Container>
    )
}
export default MyStarPage