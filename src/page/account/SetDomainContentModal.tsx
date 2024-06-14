// AuctionModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SetDomainContentModal = ({ show, onHide,selectDomain,setDomainContent}:{show:any, onHide:any,selectDomain:any,setDomainContent:any}) => {
  const [domainContent,setDomainContents] = useState('')
  const [Ip,setIp] = useState('')
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>设置域名内容/IP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group controlId="Ip">
        <Form.Label>设置Ip</Form.Label>
          <Form.Control
            type="text"
            onChange={(e)=>{setIp(e.target.value)}}
          />
        </Form.Group>
        <Form.Group controlId="Content">
          <Form.Label>自定义域名内容</Form.Label>
          <Form.Control
            type="text"
            onChange={(e)=>{setDomainContents(e.target.value)}}
          />

        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" onClick={()=>setDomainContent(selectDomain,domainContent,Ip)}>
          确认
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetDomainContentModal;
