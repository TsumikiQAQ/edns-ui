import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { MdManageSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { CDomainContext } from '../../page/auction/CreateAuction';
import { DomainContractContext } from '../filedrag/dragelistener';
import { useLocation } from "react-router-dom";

const AuctionSearch = () => {
    const [domain,setDomain] = useContext(CDomainContext)
    const [_domain,_setDomain] = useState(domain)
    const [verify,setVerify] = useState(false)
    const {contractInstance} = useContext(DomainContractContext)
    const location = useLocation()

    useEffect(()=>{
        location.state && _setDomain(location.state)
        const verifyValidity = async ()=>{
           let dm =  await contractInstance.getDomain(_domain)
           
           let atN = await contractInstance.getAuctionName(_domain)
           let at =  await contractInstance.auctions(atN)
           
            if(at[7]){
                setVerify(false)
            }else{
                dm[0] ?setVerify(dm[1] == contractInstance.runner.address)
                :setVerify(dm[1] !== contractInstance.runner.address)
            }
        }
        _domain && verifyValidity()
    },[_domain, contractInstance])
  return (
    <Form className='filter-form'>
        <h2><MdManageSearch/>验证拍卖合法性</h2>
        
      <Form.Group controlId="type">
        <Form.Label>域名</Form.Label>
        <Form.Control type="text" value={_domain} onChange={e => _setDomain(e.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="notice">
        <Form.Label>
            提示：
        </Form.Label>
        <Row>
            <p>
            1.域名注册后，只有域名拥有者才能发起拍卖。
            </p>
        </Row>
        <Row>
            <p>
            2.未注册域名已被发起拍卖也会导致验证不通过。
            </p>
        </Row>
        </Form.Group>
        <FormGroup>
            <Form.Label>
                是否允许发起拍卖：{verify?'允许':'不允许'}
            </Form.Label>
        </FormGroup>
      <Button disabled={!verify} onClick={()=>{
        setDomain(_domain)
        }}>
      <IoFilterOutline />确定
      </Button>
    </Form>
  );
};

export default AuctionSearch;
