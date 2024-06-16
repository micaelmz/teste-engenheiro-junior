import React from 'react';
import BasePage from './BasePage';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import productExampleImage from '../../assets/img/product_example.jpg';
import {Fab, Typography} from "@mui/material";
import Badge from 'react-bootstrap/Badge';
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Button} from "primereact/button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function AddIcon() {
  return null;
}

export default function ProductsDashboard() {
  return (
      <BasePage fabShow>
        <div className="card">
          <Typography variant="h6" className="text-black poppins fw-bold">Todos os produtos</Typography>
          <Typography variant="h7" className="text-black-50 poppins fw-bold mb-4">Clique em um produto para ver detalhes</Typography>
          <InputGroup className="mb-4">
            <Form.Control placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start">
              <SearchOutlinedIcon />
            </Button>
          </InputGroup>
          <Row>
            <Card className="rounded-4 me-2" style={{width: '17rem', padding: 0}}>
              <Card.Img className="rounded-4 rounded-bottom product-img" variant="top" src={productExampleImage}/>
              <Card.Body className="p-4">
                <Card.Title className="text-truncate text-xs poppins">Nike Air Force 1 NDESTRUKT</Card.Title>
                <hr/>
                <div className="d-flex fs-4 justify-content-between">
                  <Badge pill bg="success">
                    Disponível
                  </Badge>
                  <Typography variant="h6" className="text-black-50 fw-bold">R$ 50,00</Typography>
                </div>
              </Card.Body>
            </Card>
            <Card className="rounded-4 me-2" style={{width: '17rem', padding: 0}}>
              <Card.Img className="rounded-4 rounded-bottom product-img" variant="top" src={productExampleImage}/>
              <Card.Body className="p-4">
                <Card.Title className="text-truncate text-xs poppins">Nike Air Force 1 NDESTRUKT</Card.Title>
                <hr/>
                <div className="d-flex fs-4 justify-content-between">
                  <Badge pill bg="success">
                    Disponível
                  </Badge>
                  <Typography variant="h6" className="text-black-50 fw-bold">R$ 50,00</Typography>
                </div>
              </Card.Body>
            </Card>
            <Card className="rounded-4 me-2" style={{width: '17rem', padding: 0}}>
              <Card.Img className="rounded-4 rounded-bottom product-img" variant="top" src={productExampleImage}/>
              <Card.Body className="p-4">
                <Card.Title className="text-truncate text-xs poppins">Nike Air Force 1 NDESTRUKT</Card.Title>
                <hr/>
                <div className="d-flex fs-4 justify-content-between">
                  <Badge pill bg="success">
                    Disponível
                  </Badge>
                  <Typography variant="h6" className="text-black-50 fw-bold">R$ 50,00</Typography>
                </div>
              </Card.Body>
            </Card>
            <Card className="rounded-4 me-2" style={{width: '17rem', padding: 0}}>
              <Card.Img className="rounded-4 rounded-bottom product-img" variant="top" src={productExampleImage}/>
              <Card.Body className="p-4">
                <Card.Title className="text-truncate text-xs poppins">Nike Air Force 1 NDESTRUKT</Card.Title>
                <hr/>
                <div className="d-flex fs-4 justify-content-between">
                  <Badge pill bg="success">
                    Disponível
                  </Badge>
                  <Typography variant="h6" className="text-black-50 fw-bold">R$ 50,00</Typography>
                </div>
              </Card.Body>
            </Card>
            <Card className="rounded-4 me-2" style={{width: '17rem', padding: 0}}>
              <Card.Img className="rounded-4 rounded-bottom product-img" variant="top" src={productExampleImage}/>
              <Card.Body className="p-4">
                <Card.Title className="text-truncate text-xs poppins">Nike Air Force 1 NDESTRUKT</Card.Title>
                <hr/>
                <div className="d-flex fs-4 justify-content-between">
                  <Badge pill bg="success">
                    Disponível
                  </Badge>
                  <Typography variant="h6" className="text-black-50 fw-bold">R$ 50,00</Typography>
                </div>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </BasePage>
  );
}