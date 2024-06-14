import { useContext, useEffect, useState } from "react"
import { TopNavProps } from "../interface/layout"
import LoginForm from "../../page/User/login"
import { AiOutlineUser } from "react-icons/ai";
import { Button,Modal,Form } from "react-bootstrap";
import { LoginFormContext } from ".";
import { MdDns } from "react-icons/md";
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';

import DomainContractJson from "../../contract/DomainRegistry.sol/DomainRegistry.json"
import { DomainContractContext,AccoutInfoContext } from "../filedrag/dragelistener";

const TopNav = ({ logged }) => {
    const   {contractInstance, setContractInstance} = useContext(DomainContractContext)
    const   {accoutInfo,setAccoutInfo} = useContext(AccoutInfoContext)
    const [show,setShow] = useState(false)
    const [registerName,setRegisterName] = useState('')
    const [currency,setCurrency] = useState('')
    const onHide = ()=>{
      setShow(false)
    }

    const registerAccount = async ()=>{
      if(contractInstance){
        if(registerName && currency){
        await contractInstance.registerAccount(registerName,currency)
        setShow(false)
      }else{
        alert('用户名或币种不能为空')
      }}
    }
    const initialize = async () => {
        try {
          // 连接到 MetaMask 提供的以太坊节点
          if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, DomainContractJson.abi , signer);
            setContractInstance(contract);
          } else {
            console.error('MetaMask not detected. Please install MetaMask and connect to an Ethereum network.');
          }
        } catch (error) {
          console.error('Error initializing contract interaction:', error);
        }
     };
     useEffect(()=>{
      const getInfo = async ()=>{
        if(contractInstance){
          await contractInstance.getAccountInfo().then((result)=>{
            setAccoutInfo(result)
          }).catch(()=>{
            setShow(true)
          })
        }
      }
      getInfo()
     },[contractInstance])

   
    const handleLogin = (e) => {
        e.preventDefault()
        initialize();
    }
    return (
        <div className="TopNav">
            <a className="logo" href="/">
                <h3><MdDns></MdDns>B-DNS</h3>
            </a>
            <Button className="Btn-login">
                <a href="#" onClick={handleLogin}><AiOutlineUser /><strong>{accoutInfo?`${accoutInfo[0]}`:'连接网站'}</strong></a>
            </Button>
            <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>注册合约账户</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="AccountName">
        <Form.Label>用户名</Form.Label>
          <Form.Control
            type="text"
            onChange={(e)=>{setRegisterName(e.target.value)}}
          />
        </Form.Group>
        <Form.Group controlId="currency">
        <Form.Label>设置币种</Form.Label>
          <Form.Control
            type="text"
            onChange={(e)=>{setCurrency(e.target.value)}}
          />
        </Form.Group>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" onClick={registerAccount}>
          确认
        </Button>
      </Modal.Footer>
    </Modal>
        </div>
    )
}
export default TopNav