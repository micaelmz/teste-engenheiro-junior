import React from 'react';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import {Button} from "primereact/button";
import {Modal} from "@mui/material";


export const UpdateClientModal = ({service, isOpen, setTargetClient, handleClose, clientObj}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;

    let updatedTargetClient = {...clientObj};

    if (name.includes('.')) {
      const keys = name.split('.');
      let temp = updatedTargetClient;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
    } else {
      updatedTargetClient[name] = value;
    }

    setTargetClient(updatedTargetClient);
  };

  return (
      <Modal
          open={isOpen}
          onClose={handleClose}
      >
        <div className="base-modal">
          <Form className="w-100 mx-auto">
            <p className="text-white poppins fw-bold fs-3 w-100 ">
              Atualizando dados do cliente {clientObj.name} {clientObj.surname}
            </p>

            <input name="id" type="hidden" value={clientObj.id}></input>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label style={{color: "#c5c5c5"}}>Nome</Form.Label>
                  <Form.Control
                      name="name"
                      type="text"
                      value={clientObj.name}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label style={{color: "#c5c5c5"}}>Sobrenome</Form.Label>
                  <Form.Control
                      name="surname"
                      type="text"
                      value={clientObj.surname}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={8}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Endereço de email</Form.Label>
                  <Form.Control
                      name="email"
                      type="email"
                      value={clientObj.email}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Telefone</Form.Label>
                  <Form.Control
                      name="tel"
                      type="tel"
                      value={clientObj.tel}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={5}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>CPF / CNPJ</Form.Label>
                  <Form.Control
                      name="document"
                      type="text"
                      value={clientObj.document}
                      onChange={handleChange}
                      maxLength={18}
                  />
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Data de Nascimento</Form.Label>
                  <Form.Control
                      name="birthday"
                      type="date"
                      value={clientObj.birthday}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Sexo</Form.Label>
                  <Form.Select name="sex" value={clientObj.sex} onChange={handleChange}>
                    <option value="m" selected={clientObj.sex === 'm'}>Masculino</option>
                    <option value="f" selected={clientObj.sex === 'f'}>Feminino</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Cidade</Form.Label>
                  <Form.Control
                      name="city"
                      type="text"
                      value={clientObj.city}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>Estado</Form.Label>
                  <Form.Select name="state_name" value={clientObj.state_name} onChange={handleChange}>
                    {service.getBrazilianStates().map((state) => (
                        <option value={state.name}>
                          {state.name}
                        </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color: "#c5c5c5"}}>CEP</Form.Label>
                  <Form.Control
                      name="cep"
                      type="text"
                      value={clientObj.cep}
                      onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <hr/>
          <Button
              className="btn-color-1 rounded-3"
              onClick={() => {
                service.update(clientObj).then(() => {
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

export const DeleteClientModal = ({service, isOpen, setTargetClient, handleClose, clientObj}) => {
  return (
      <Modal
          open={isOpen}
          onClose={handleClose}
      >
        <div className="base-modal">
          <p className="text-white poppins fw-bold fs-3 w-100 text-center">
            Deletando o cliente {clientObj.name} {clientObj.surname}
          </p>

          <div className="d-flex justify-content-center gap-4">
            <Button className="btn-color-1 rounded-3" onClick={handleClose}>
              Cancelar
            </Button>
            <Button className="btn-color-4 rounded-3" onClick={() => {
              service.delete(clientObj.id).then(() => {
                handleClose();
              });
            }}>
              Deletar
            </Button>
          </div>
        </div>
      </Modal>);
}

// export const CreateClientModal = (clientObj, service) => {
//   return null;
// }