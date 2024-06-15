import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import shopIllustration from '../assets/img/shop-illustration.webp';
import {Button} from "react-bootstrap";


export default function Home() {
  return (
      <Container className="container-fullvh">
        <Row>
            <Col xs={6}>
              <div className="d-flex justify-content-center h-100 flex-column">
                <p className="text-white poppins fw-bold fs-1">
                  Ordenai: seu sistema de gerenciamento de pedidos online organizado e eficiente!
                </p>
                <Link to="/login"><Button className="w-25 btn-color-1 mt-4">Fazer Login</Button></Link>
              </div>
            </Col>
            <Col xs={6}>
              <img src={shopIllustration} alt="Shop Ilustration" className="d-flex mx-auto img-fluid w-75"/>
            </Col>
        </Row>
      </Container>
  );
};
