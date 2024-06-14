// AuctionModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EndAuctionModal =  ({ show, onHide,Price,ip,content,endAuction}:{show:any, onHide:any,Price:any,ip:any,content: any,endAuction: any}) => {
  const {currentPrice, setCurrentPrice} = Price
  const {ip:Ip,setIp} = ip
  const {content:Content,setContent} = content
  const [userPrice, setUserPrice] = useState(currentPrice); 
  const [blindBid, setBlindBid] = useState(false);
  
  const handlePriceChange = (e:any) => {
    setUserPrice(parseFloat(e.target.value));
  };

  const handleBid = async () => {
      await endAuction()
      onHide();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>拍卖结算确认</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="price">
          <Form.Label>价格: {currentPrice} { " (ETH)"}</Form.Label>
        </Form.Group>
        <Form.Group controlId="Ip">
        <Form.Label>设置Ip</Form.Label>
          <Form.Control
            type="text"
            onChange={(e)=>{setIp(e.target.value)}}
            disabled={blindBid}
          />
        </Form.Group>
        <Form.Group controlId="content">
        <Form.Label>设置内容（可选）</Form.Label>
          <Form.Control
            type="text"
            onChange={(e)=>{setContent(e.target.value)}}
            disabled={blindBid}
          />
        </Form.Group>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" onClick={handleBid}>
          确认
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EndAuctionModal;



 

