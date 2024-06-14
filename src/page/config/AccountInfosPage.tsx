import { ethers } from "ethers";
import { useState, useContext, useEffect } from "react";
import { Container, Row, Col,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DomainContractContext, AccoutInfoContext } from "../../components/filedrag/dragelistener";
import { convertTimestampToDateString } from "../auction/MyAuction";

const AccountInfos =({account,handleAdmin}:{account:any,handleAdmin:any})=>{
    const [ifhover,setIfhover] = useState(false)
    return <Row role="button" 
    className={`AuctionInfosList ${ifhover?'AuctionInfosList-hover':''}`} 
    key={account[0]}
    onMouseEnter={()=>{setIfhover(true)}}
    onMouseLeave={()=>{setIfhover(false)}}
    >
       
        <Col >{account[0]}</Col>
        <Col >{account[1]}</Col>
        <Col >{convertTimestampToDateString(Number(account[2]))}</Col>
        <Col >{account[3].length+' 个'}</Col>
        <Col >{account[4].length+' 个'}</Col>
        <Col >{account[5].length+' 个'}</Col>
        <Col><Button onClick={()=>handleAdmin(account[0])}>转让</Button></Col>
    </Row>
}
const AccountInfosPage =()=>{
    const [accountInfos,setAccountInfos] = useState<any>([])
    const {contractInstance} = useContext(DomainContractContext)



    const handleAdmin = async (user:any)=>{
        await contractInstance.changeAdmin(user)
    }
    useEffect(()=>{        
        const getInfo = async()=>{
            await  contractInstance.getAllAccounts().then((result:any)=>{
                setAccountInfos(result)
            })
        }
        contractInstance && getInfo()     
    },[contractInstance])
    return(
        <Container>
            <Row className="AuctionInfoList">
                <Col >用户名</Col>
                <Col >币种</Col>
                <Col >注册时间</Col>
                <Col >注册域名</Col>
                <Col >收藏域名</Col>
                <Col >参与拍卖</Col>
                <Col >转让权限</Col>
            </Row>
            {accountInfos.map((item:any)=>{
                return <AccountInfos account={item} handleAdmin={handleAdmin}/>
            })}
        </Container>
    )
}
export default AccountInfosPage