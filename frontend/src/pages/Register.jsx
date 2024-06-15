import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import loginIllustration from '../assets/img/login-illustration.webp';
import {Link} from "react-router-dom";

export default function Register() {
  return (
      <Container className="vh-100 d-flex align-items-center">
        <Row className="w-100">
          <Col xs={6}>
            <div className="d-flex justify-content-center h-100 w-100 flex-column">
              <Form className="w-75 mx-auto">
                <p className="text-white poppins fw-bold fs-3 w-100 ">
                  Cadastre-se no orden.ai
                </p>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Endereço de email</Form.Label>
                  <Form.Control type="email" placeholder="email@praqt.com.br"/>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label style={{color: "#c5c5c5"}}>Nome</Form.Label>
                      <Form.Control type="text" placeholder="John"/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label style={{color: "#c5c5c5"}}>Sobrenome</Form.Label>
                      <Form.Control type="text" placeholder="Doe"/>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{color: "#c5c5c5"}}>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{color: "#c5c5c5"}}>Confirme sua senha</Form.Label>
                  <Form.Control type="password" placeholder="Confirme sua senha"/>
                </Form.Group>

                <p style={{color: "#c5c5c5"}}>Já tem uma conta? <Link to="/login">Fazer login</Link></p>

                <Button type="submit" className="w-25 btn-color-1">
                  Cadastrar
                </Button>
              </Form>
            </div>
          </Col>
          <Col xs={6}>
            <img src={loginIllustration} alt="Shop Ilustration" className="d-flex mx-auto img-fluid w-75"/>
          </Col>
        </Row>
      </Container>
  );
};
