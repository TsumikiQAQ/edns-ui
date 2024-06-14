import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { MdManageSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { DomainContractContext } from '../filedrag/dragelistener';


const ConfigForm = ({domain,setDomain}:{domain:any,setDomain:any}) => {
    const [_domain,_setDomain] = useState<any>('')
    const [verify,setVerify] = useState(false)
    const [price,setPrice] = useState<any>(1)
    const {contractInstance} = useContext(DomainContractContext)
  const handleClick = async ()=>{
    setDomain(_domain)
    price !== 1 && await contractInstance.setRegistrationPrice(price)
  }
    useEffect(()=>{
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
      <h2><MdManageSearch/>拍卖相关配置</h2>
      <Form.Group controlId="Price">
        <Form.Label>设置所有拍卖起拍价</Form.Label>
        <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>域名</Form.Label>
        <Form.Control type="text" value={_domain} onChange={e => _setDomain(e.target.value)}>
        </Form.Control>
      </Form.Group>
        <FormGroup>
            <Form.Label>
                域名是否拍卖中：{verify?'拍卖中':'未拍卖'}
            </Form.Label>
        </FormGroup>
      <Button disabled={!verify} onClick={()=>{
        handleClick()
        }}>
      <IoFilterOutline />确定
      </Button>
    </Form>
  );
};

export default ConfigForm;
