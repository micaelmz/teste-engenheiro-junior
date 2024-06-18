import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import {Button} from "primereact/button";
import {Modal} from "@mui/material";

const BaseForm = ({ service, setTargetOrder, title, orderObj }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedTargetOrder = { ...orderObj };

    if (name.includes('.')) {
      const keys = name.split('.');
      let temp = updatedTargetOrder;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) {
          temp[keys[i]] = {};
        }
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
    } else {
      updatedTargetOrder[name] = value;
    }

    setTargetOrder(updatedTargetOrder);
  };

  return (
      <Form className="w-100 mx-auto">
        <p className="text-white poppins fw-bold fs-3 w-100">
          {title}
        </p>

        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{ color: "#c5c5c5" }}>Cliente</Form.Label>
              <Form.Control
                  name="client"
                  type="text"
                  value={orderObj.client}
                  onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: "#c5c5c5" }}>Campo Identificador</Form.Label>
              <Form.Select
                  name="client_identifier_field"
                  value={orderObj.client_identifier_field}
                  onChange={handleChange}
              >
                <option value="" disabled={orderObj.client_identifier_field !== ''}>
                  Selecione
                </option>
                <option value="id">ID</option>
                <option value="document">CPF/CNPJ</option>
                <option value="email">Email</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{ color: "#c5c5c5" }}>Produto</Form.Label>
              <Form.Control
                  name="product"
                  type="text"
                  value={orderObj.product}
                  onChange={handleChange}
              />
              {orderObj.product_identifier_field === 'name' && (
                  <Form.Text className="text-white-50">
                    Se houver mais de um, será escolhido o primeiro com esse nome.
                  </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: "#c5c5c5" }}>Campo Identificador</Form.Label>
              <Form.Select
                  name="product_identifier_field"
                  value={orderObj.product_identifier_field}
                  onChange={handleChange}
              >
                <option value="" disabled={orderObj.product_identifier_field !== ''}>
                  Selecione
                </option>
                <option value="id">ID</option>
                <option value="sku">SKU</option>
                <option value="name">Nome</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "#c5c5c5" }}>Status do Pedido</Form.Label>
          <Form.Select
              name="status"
              value={orderObj.status}
              onChange={handleChange}
          >
            <option value="" disabled={orderObj.status !== ''}>
              Selecione
            </option>
            <option value="paid">Pago (finalizado)</option>
            <option value="pending">Pendente</option>
            <option value="canceled">Cancelado</option>
          </Form.Select>
        </Form.Group>
      </Form>
  );
}

export const CreateOrderModal = ({ service, isOpen, setTargetOrder, handleClose, orderObj }) => {
  return (
      <Modal
          open={isOpen}
          onClose={handleClose}
      >
        <div className="base-modal">
          <BaseForm
              service={service}
              setTargetOrder={setTargetOrder}
              title="Criando novo pedido"
              orderObj={orderObj}
          />
          <hr />
          <Button
              className="btn-color-1 rounded-3"
              onClick={() => {
                service.create(orderObj).then(() => {
                  handleClose();
                });
              }}
          >
            Criar
          </Button>
        </div>
      </Modal>
  );
}

export const UpdateOrderModal = ({service, isOpen, setTargetOrder, handleClose, orderObj}) => {
  return (
      <Modal
          open={isOpen}
          onClose={handleClose}
      >
        <div className="base-modal">
          <BaseForm
              service={service}
              setTargetOrder={setTargetOrder}
              title="Atualizando dados do pedido"
              orderObj={orderObj}
          />
          <hr/>
          <Button
              className="btn-color-1 rounded-3"
              onClick={() => {
                service.update(orderObj).then(() => {
                  handleClose();
                });
              }}
          >
            Atualizar
          </Button>
        </div>
      </Modal>
  );
}

// export const DeleteClientModal = ({service, isOpen, setTargetClient, handleClose, clientObj}) => {
//   return (
//       <Modal
//           open={isOpen}
//           onClose={handleClose}
//       >
//         <div className="base-modal">
//           <p className="text-white poppins fw-bold fs-3 w-100 text-center">
//             Deletando o cliente {clientObj.name} {clientObj.surname}
//           </p>
//
//           <div className="d-flex justify-content-center gap-4">
//             <Button className="btn-color-1 rounded-3" onClick={handleClose}>
//               Cancelar
//             </Button>
//             <Button className="btn-color-4 rounded-3" onClick={() => {
//               service.delete(clientObj.id).then(() => {
//                 handleClose();
//               });
//             }}>
//               Deletar
//             </Button>
//           </div>
//         </div>
//       </Modal>);
// }
