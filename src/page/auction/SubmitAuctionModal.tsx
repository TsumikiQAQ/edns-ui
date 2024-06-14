// AuctionModal.js

import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SubmitAuctionModal =  ({ show, onHide,Price,time,submitAuction}:{show:any, onHide:any,Price:any,time:any,submitAuction:any}) => {
  
  const {currentPrice} = Price
  const {duration} = time

  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>确认起拍价格</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="price">
          <Form.Label>价格：{currentPrice} {"(ETH)"}</Form.Label>
        </Form.Group>
        <Form.Group controlId="time">
        <Form.Label>持续时间：{duration/3600} {"(h)"}</Form.Label>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" onClick={submitAuction}>
          确认
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitAuctionModal;
