import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { MdManageSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { DomainContractContext } from '../filedrag/dragelistener';
import { ADomainContext } from '../../page/auction/AuctionInfo';
import { useLocation } from "react-router-dom";

const AuctionInfoSearch = () => {
    const [domain,setDomain] = useContext(ADomainContext)
    const [_domain,_setDomain] = useState(domain)
    const [verify,setVerify] = useState(false)
    const {contractInstance} = useContext(DomainContractContext)
    const location = useLocation()

    useEffect(()=>{
        location.state && _setDomain(location.state)
        const verifyValidity = async ()=>{           
           let atN = await contractInstance.getAuctionName(_domain)
           let at =  await contractInstance.auctions(atN)            
            if(at[0]){
                setVerify(!at[7] )
            }else{
                setVerify(at[7] )
            }
        }
        _domain && verifyValidity()
    },[_domain, contractInstance])
  return (
    <Form className='filter-form'>
        <h2><MdManageSearch/>查询拍卖是否进行中</h2>
        
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
            1.在当前拍卖中可以查看以往历史拍卖中所有的加注信息。
            </p>
        </Row>
        <Row>
            <p>
            2.拍卖结束后由最后的最高出价人进行拍卖结算。
            </p>
        </Row>
        <Row>
            <p>
            3.加价后自动将本次拍卖添加进'我的拍卖'中。
            </p>
        </Row>
        </Form.Group>
        <FormGroup>
            <Form.Label>
                域名是否拍卖中：{verify?'拍卖中':'未拍卖'}
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

export default AuctionInfoSearch;
