import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import {Button} from "primereact/button";
import {Modal} from "@mui/material";

const BaseForm = ({productObj, setImageFile, setTargetProduct, title}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;

    let updatedTargetProduct = {...productObj};

    if (name.includes('.')) {
      const keys = name.split('.');
      let temp = updatedTargetProduct;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
    } else {
      updatedTargetProduct[name] = value;
    }

    setTargetProduct(updatedTargetProduct);
  };
  return (
      <Form className="w-100 mx-auto">
        <p className="text-white poppins fw-bold fs-3 w-100 ">
          {title}
        </p>

        <input name="id" type="hidden" value={productObj.id}></input>

        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{color: "#c5c5c5"}}>Nome</Form.Label>
              <Form.Control
                  name="name"
                  type="text"
                  value={productObj.name}
                  onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{color: "#c5c5c5"}}>Categoria</Form.Label>
              <Form.Control
                  name="category"
                  type="text"
                  value={productObj.category}
                  onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{color: "#c5c5c5"}}>SKU</Form.Label>
              <Form.Control
                  name="sku"
                  type="text"
                  value={productObj.sku}
                  onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label style={{color: "#c5c5c5"}}>Status</Form.Label>
              <Form.Select name="status" value={productObj.status} onChange={handleChange}>
                <option value="null" disabled={productObj.status != ''}>Selecione</option>
                <option value="1" selected={productObj.status == '1'}>Ativo</option>
                <option value="0" selected={productObj.status == '0'}>Inativo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label style={{color: "#c5c5c5"}}>Descrição</Form.Label>
          <Form.Control
              name="description"
              as="textarea"
              rows={2}
              value={productObj.description}
              onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImageUpload">
          <Form.Label style={{color: "#c5c5c5"}}>Imagem do Produto</Form.Label>
          <Form.Control
              name="image"
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>

        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formCurrency">
              <Form.Label style={{color: "#c5c5c5"}}>Preço (R$)</Form.Label>
              <Form.Control
                  name="price"
                  type="number"
                  value={productObj.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formCurrency">
              <Form.Label style={{color: "#c5c5c5"}}>Quantidade em Estoque</Form.Label>
              <Form.Control
                  name="stock_quantity"
                  type="number"
                  value={productObj.stock_quantity}
                  onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
  );
}

// export const UpdateProductModal = ({service, isOpen, setTargetClient, handleClose, clientObj}) => {
//   return (
//       <Modal
//           open={isOpen}
//           onClose={handleClose}
//       >
//         <div className="base-modal">
//           <BaseForm
//               service={service}
//               setTargetClient={setTargetClient}
//               title={`Atualizando dados do cliente ${clientObj.name} ${clientObj.surname}`}
//               clientObj={clientObj}
//           />
//           <hr/>
//           <Button
//               className="btn-color-1 rounded-3"
//               onClick={() => {
//                 service.update(clientObj).then(() => {
//                   handleClose();
//                 });
//               }}
//           >
//             Atualizar
//           </Button>
//         </div>
//       </Modal>
//   );
// }

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
//
export const CreateProductModal = ({service, isOpen, productObj, setTargetProduct, handleClose}) => {
  const [imageFile, setImageFile] = useState();
  return (
      <Modal
          open={isOpen}
          onClose={handleClose}
      >
        <div className="base-modal">
          <BaseForm
              setTargetProduct={setTargetProduct}
              title="Cadastrando novo produto"
              productObj={productObj}
              setImageFile={setImageFile}
          />
          <hr/>
          <Button
              className="btn-color-1 rounded-3"
              onClick={() => {
                service.create(productObj, imageFile).then(() => {
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