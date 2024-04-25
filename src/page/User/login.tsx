import React, { createContext, useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { GrFormClose } from "react-icons/gr";
import { LoginFormContext } from '../../components/Layout';
const LoginForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
  };
  const { hide, HideHandle } = useContext(LoginFormContext)

  return (
    <Container className={"Login-hide"}>
      {/* <Container className={hide ? "Login-hide" : "Login"}> */}
      <Row><Col className='Form-close'><a href="" onClick={HideHandle}><GrFormClose /></a></Col></Row>
      <Row className="justify-content-md-center Login-contral">
        <Col xs={12} md={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Col className='Form-header'>
                <a href="" className='active'>账号登陆</a>
              </Col>
              <Form.Control className='Login-Control' type="text" placeholder='账户' name="username" required />
              <InputGroup.Text className='userName-text'>
                <AiOutlineUser />
              </InputGroup.Text>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className='Login-Control' type="password" placeholder="密码" name="password" required />
            </Form.Group>
            <a href="" className='Password-Lookfor'>忘记密码</a>
            <Row>
              <Button className='Login-Btn' variant="primary" type="submit">
                登&nbsp;&nbsp;&nbsp;录
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
