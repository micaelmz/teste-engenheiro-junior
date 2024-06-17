import React from 'react';
import Card from "react-bootstrap/Card";
import productExampleImage from "../assets/img/product_example.jpg";
import Badge from "react-bootstrap/Badge";
import {Typography} from "@mui/material";


export default function ProductCard({image, available, name, price}) {

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  };

  return (
      <Card className="rounded-4 me-2" style={{width: '17rem', padding: 0}}>
        <Card.Img className="rounded-4 rounded-bottom product-img" variant="top"
                  src={image}/>
        <Card.Body className="p-4">
          <Card.Title className="text-truncate text-xs poppins">
            {name}
          </Card.Title>
          <hr/>
          <div className="d-flex fs-4 justify-content-between">
            <Badge pill bg={available ? 'success' : 'danger'}>
              {available ? 'Disponivel' : 'Esgotado'}
            </Badge>
            <Typography variant="h6" className="text-black-50 fw-bold">
              {formatCurrency(price)}
            </Typography>
          </div>
        </Card.Body>
      </Card>
  );
}