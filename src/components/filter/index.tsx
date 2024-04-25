import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { MdManageSearch } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { GrClearOption } from "react-icons/gr";

const FilterComponent = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [type, setType] = useState('');

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinLength('');
    setMaxLength('');
    setType('');
  };

  return (
    <Form className='filter-form'>
        <h2><MdManageSearch/>筛选</h2>
      <Form.Group controlId="price">
        <Form.Label>价格</Form.Label>
        <Row>
            <Col ><Form.Control type="number" placeholder="最小价格" value={minPrice} onChange={e => setMinPrice(e.target.value)} /></Col>
            <Col><Form.Control type="number" placeholder="最大价格" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} /></Col>
        </Row>
              </Form.Group>

      <Form.Group controlId="length">
        <Form.Label>长度</Form.Label>
        <Row><Col><Form.Control type="number" placeholder="最小长度" value={minLength} onChange={e => setMinLength(e.target.value)} /></Col>
        <Col><Form.Control type="number" placeholder="最大长度" value={maxLength} onChange={e => setMaxLength(e.target.value)} /></Col></Row>
      </Form.Group>

      <Form.Group controlId="type">
        <Form.Label>类型</Form.Label>
        <Form.Control as="select" value={type} onChange={e => setType(e.target.value)}>
          <option value="">全部</option>
          <option value="number">数字</option>
          <option value="letter">字母</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit">
      <IoFilterOutline />筛选
      </Button>
      <Button onClick={handleReset}>
      <GrClearOption />清空
      </Button>
    </Form>
  );
};

export default FilterComponent;
