// AuctionModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RequestDomainTransferModal = ({ show, onHide,selectDomain,requestDomainTransfer}:{show:any, onHide:any,selectDomain:any,requestDomainTransfer:any}) => {
  const [price,setPrice] = useState<any>()
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>发起求购</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group controlId="Price">
        <Form.Label>设置求购价格</Form.Label>
          <Form.Control
            type="number"
            onChange={(e)=>{setPrice(e.target.value)}}
          />
        </Form.Group>
        <Form.Group controlId="domain">
          <Form.Label>确定域名:{selectDomain}</Form.Label>
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" onClick={()=>requestDomainTransfer(selectDomain,price)}>
          确认
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestDomainTransferModal;
