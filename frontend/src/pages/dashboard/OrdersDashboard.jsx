import React, {useState, useEffect} from 'react';
import BasePage from './BasePage';
import {Button} from 'primereact/button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import {OrderService} from '../../service/OrderService';
import {Modal, Typography} from "@mui/material";
import {InputGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import OrderDataTable from "../../components/datatables/OrderDataTable";
import {CreateOrderModal} from "../../components/modals/OrderModals";

export default function OrdersDashboard() {
  const orderObj = {
    id: 0,
    client_id: 0,
    product_id: 0,
    status: '',
    created_at: '',
    updated_at: '',
    product_name: '',
    client_name: '',
    product: {},
    client: {}
  }
  const orderObjBackend = {
    client_identifier_field: '',
    client: '',
    product_identifier_field: '',
    product: '',
    status: ''
  }
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [targetOrder, setTargetOrder] = useState();

  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  return (
      <BasePage fabShow fabCallback={() => {
        setTargetOrder(orderObjBackend)
        setIsOpenCreateModal(true);
      }}>
        <div className="card">
          <Typography variant="h6" className="text-black poppins fw-bold mb-4">Lista de todos os pedidos</Typography>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start">
              <SearchOutlinedIcon/>
            </Button>
          </InputGroup>
          <OrderDataTable
              setShouldUpdateTable={setShouldUpdateTable}
              shouldUpdateTable={shouldUpdateTable}
              service={OrderService}
          />
        </div>

        <CreateOrderModal
            service={OrderService}
            isOpen={isOpenCreateModal}
            setTargetOrder={setTargetOrder}
            orderObj={targetOrder}
            handleClose={() => {
              setIsOpenCreateModal(false);
              setShouldUpdateTable(true);
            }}
        />
      </BasePage>
  );
}