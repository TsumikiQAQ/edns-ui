import ConfigForm from "../../components/ConfigForm"
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { MdManageSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { DomainContractContext } from "../../components/filedrag/dragelistener";

const AuctionInfosPage =()=>{
    const [domain,setDomain] = useState('')
    const [_price,_setPrice] = useState<any>(0.1)
    const {contractInstance} = useContext(DomainContractContext)
    const setMinBidPrice = async() =>{
        await contractInstance.setMinBidPrice(domain,_price)
    }
    return (
        <Row>
            <Col>
            <ConfigForm domain={domain} setDomain={setDomain}/>
            </Col>
            <Col>
            <Form className='filter-form'>
      <h2><MdManageSearch/>设置{domain}最低加价</h2>
      <Form.Group controlId="Price">
        <Form.Control type="number" value={_price} onChange={e => _setPrice(e.target.value)} />
        </Form.Group>

      <Button disabled={!domain} onClick={()=>{
        setMinBidPrice()
        }}>
      <IoFilterOutline />确定
      </Button>
    </Form>
            </Col>
        </Row>
    )
}
export default AuctionInfosPage