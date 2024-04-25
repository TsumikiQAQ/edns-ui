import React, { useState } from 'react';
import { Form, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { FaSortAmountDown ,FaSortAmountUpAlt } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";

const ListComponent = ({ domains }:{domains:any}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');

  const filteredDomains = domains
    .filter((domain: any) => domain.name.includes(search))
    .sort((a: any, b: any) => sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  return (
    <div className='DomainList'>
      <Form className='DomainList-form'>
        <Form.Control type="text" placeholder="搜索" value={search} onChange={e => setSearch(e.target.value)} />
        {sort === 'asc' ? <FaSortAmountUpAlt />:<FaSortAmountDown/>}<Form.Control className='sort' as="select" value={sort} onChange={e => setSort(e.target.value)}>
        <option value="asc">升序</option>
          <option value="desc">降序</option>
          <FaSortAmountDown/>
        </Form.Control>
      </Form>

      <ListGroup>
        {filteredDomains.map((domain: any, index: any) => (
          <ListGroup.Item key={index}><Row><Col xs={10}><strong>{domain.name}</strong> <strong><ImPriceTag />{domain.currentBid+' $ENS'}</strong></Col><Col><Button>购买</Button></Col></Row></ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListComponent;