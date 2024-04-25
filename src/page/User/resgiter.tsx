import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-3">注册</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>邮箱地址</Form.Label>
              <Form.Control type="email" placeholder="输入邮箱" name="email" required />
              <Form.Text className="text-muted">
                我们不会与任何人分享你的邮箱。
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>密码</Form.Label>
              <Form.Control type="password" placeholder="密码" name="password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              注册
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage