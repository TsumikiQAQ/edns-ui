import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { AccoutInfoContext, DomainContractContext } from "../../components/filedrag/dragelistener"
import { ethers } from "ethers"
import { DateTime } from 'luxon';
import { useNavigate } from "react-router-dom";
import SetDomainContentModal from "./SetDomainContentModal";

export function convertTimestampToDateString(timestamp: number): string {
    // 将Solidity时间戳乘以1000，转换为毫秒
    const milliseconds = timestamp * 1000;
    // 使用luxon库创建日期对象
    const date = DateTime.fromMillis(milliseconds);
    // 格式化日期为'YYYY-MM-DD'格式
    const formattedDate = date.toFormat('yyyy-MM-dd-HH:mm:ss');
    return formattedDate;
}

const DomainsInfo =({domain,getDomains,navigate,getAuction,setSelectDomain,setShow,address}:{domain:any,getDomains:any,navigate:any,getAuction:any,setSelectDomain:any,setShow:any,address:any})=>{
    const [domainInfo,setDomainInfo] = useState<any>([]) 
    const [auctionInfo,setAuctionInfo] = useState<any>([]) 
    const [ifhover,setIfhover] = useState(false)

    const setContent = ()=>{
        setSelectDomain(domain)
        setShow(true)
    }
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
    if(domainInfo[0] && domainInfo[1] === address){return <Row
    className={`AuctionInfosList ${ifhover?'AuctionInfosList-hover':''}`} 
    key={domain}
    onMouseEnter={()=>{setIfhover(true)}}
    onMouseLeave={()=>{setIfhover(false)}}
    >
       <>
        <Col>{domain}</Col>
        <Col role="button" onClick={setContent}>{domainInfo[2]}</Col>
        <Col role="button" onClick={setContent}>{domainInfo[3]}</Col>
        <Col>{ethers.formatEther(domainInfo[4]) +' ETH'}</Col>
        <Col>{Number(domainInfo[5])+' 次'}</Col>
        <Col >{auctionInfo[0]? "拍卖中" : "未拍卖"}</Col>
        <Col >{domainInfo[6]+' 人'}</Col>
        <Col >{auctionInfo[0]?<Button onClick={()=>{
                    navigate({ pathname: "/auction/auctionInfo"},{state:domain})

        }}>查看拍卖</Button > : <Button onClick={()=>{
                    navigate({ pathname: "/auction/createAuction"},{state:domain})
        }}>发起拍卖</Button>}</Col>
        </>
    </Row>}else{
        return <></>
    }
}
const MyDomainsPage = () =>{
    const [domainNames,setDomainNames] = useState<any>([])
    const {contractInstance} = useContext(DomainContractContext)
    const   {accoutInfo} = useContext(AccoutInfoContext)
    const [show,setShow] = useState(false)
    const [selectDomain,setSelectDomain] = useState('')
    
    const onHide = ()=>{
        setShow(false)
    }
    const setDomainContent = async (doamin:any,content:any,ip:any)=>{
        await contractInstance.setDomainContent(doamin,content,ip)
    }
    const navigate = useNavigate();

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
            let arr = uniqueArray(accoutInfo[3])
            setDomainNames(arr) 
        }
                      
    },[accoutInfo])
    return(
        <Container>
            <Row className="AuctionInfoList">
                <Col>竞拍域名</Col>
                <Col>绑定IP</Col>
                <Col>域名内容</Col>
                <Col>当前价格</Col>
                <Col>拍卖次数</Col>
                <Col>当前状态</Col>
                <Col>收藏人数</Col>
                <Col>前往拍卖</Col>
            </Row>
            {domainNames[0] && domainNames.map((item:any)=>{
                return <DomainsInfo domain={item} getDomains={getDomains} navigate={navigate} getAuction={getAuction} setSelectDomain={setSelectDomain} setShow={setShow} address={contractInstance.runner.address}/>
            })}
            <SetDomainContentModal show={show} onHide={onHide} selectDomain={selectDomain}  setDomainContent={setDomainContent}/>
        </Container>
    )
}
export default MyDomainsPage