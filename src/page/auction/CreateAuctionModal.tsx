// AuctionModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateAuctionModal = ({ show, onHide,Price,time}:{show:any, onHide:any,Price:any,time:any}) => {
  const {currentPrice, setCurrentPrice} = Price
  const {duration,setDuration} = time
  const [userPrice, setUserPrice] = useState(currentPrice); 
  const [blindBid, setBlindBid] = useState(false);

  const handlePriceChange = (e:any) => {
    setUserPrice(parseFloat(e.target.value));
  };

  const handleBid = () => {
    // 验证最小加价量
    if (userPrice >= currentPrice + 0.1 || userPrice === 1) {
      // 更新当前价格
      setCurrentPrice(userPrice);
      // 关闭 Modal
      onHide();
    } else {
      alert('价格必须高于当前价格加上最小加价量（0.1ETH）。');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>拍卖价格提交</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="price">
          <Form.Label>价格 {"(ETH)"}</Form.Label>
          <Form.Control
            type="number"
            value={userPrice}
            onChange={handlePriceChange}
            disabled={blindBid}
          />
          <Form.Label>持续时间 {"(h)"}</Form.Label>
          <Form.Control
            type="number"
            value={duration/3600}
            onChange={(e)=>setDuration(Number(e.target.value)*3600)}
            disabled={blindBid}
          />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label="盲注模式"
          checked={blindBid}
          onChange={() => setBlindBid(!blindBid)}
        />
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

export default CreateAuctionModal;
