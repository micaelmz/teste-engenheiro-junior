import React, {useState, useEffect} from 'react';
import BasePage from './BasePage';
import {Button} from 'primereact/button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import {OrderService} from '../../service/OrderService';
import {Modal, Typography} from "@mui/material";
import {InputGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import OrderDataTable from "../../components/datatables/OrderDataTable";
import {CreateOrderModal, UpdateOrderModal, DeleteOrderModal} from "../../components/modals/OrderModals";

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
  /* STATES */
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [orders, setOrders] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const [targetOrder, setTargetOrder] = useState();

  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  /* UTILS */
  const normalizeIdColumnName = (orderData) => {
    orderData.client = orderData.client_id;
    orderData.product = orderData.product_id;
    delete orderData.client_id;
    delete orderData.product_id;
    orderData.product_identifier_field = 'id';
    orderData.client_identifier_field = 'id';
    return orderData;
  }

  return (
      <BasePage fabShow fabCallback={() => {
        setTargetOrder(orderObjBackend)
        setIsOpenCreateModal(true);
      }}>
        <div className="card">
          <Typography variant="h6" className="text-black poppins fw-bold mb-4">Lista de todos os pedidos</Typography>
          <InputGroup className="mb-3">
            <Form.Control value={searchQuery} onChange={(e) => {
              setSearchQuery(e.target.value)
            }} placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start" onClick={() => {
              OrderService.search(searchQuery).then((response) => {
                const formatOrderData = (data) => {
                  return [...(data || [])].map((d) => {
                    d.updated_at = new Date(d.updated_at);
                    return d;
                  });
                };
                setOrders(formatOrderData(response));
              });
            }
            }>
              <SearchOutlinedIcon/>
            </Button>
          </InputGroup>
          <OrderDataTable
              orders={orders}
              setOrders={setOrders}
              setShouldUpdateTable={setShouldUpdateTable}
              shouldUpdateTable={shouldUpdateTable}
              service={OrderService}
              onUpdate={(orderData) => {
                setTargetOrder(normalizeIdColumnName(orderData));
                setIsOpenUpdateModal(true);
              }}
              onDelete={(orderData) => {
                setTargetOrder(normalizeIdColumnName(orderData));
                setIsOpenDeleteModal(true);
              }}
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
        <UpdateOrderModal
            service={OrderService}
            isOpen={isOpenUpdateModal}
            setTargetOrder={setTargetOrder}
            orderObj={targetOrder}
            handleClose={() => {
              setIsOpenUpdateModal(false);
              setShouldUpdateTable(true);
            }}
        />
        <DeleteOrderModal
            service={OrderService}
            isOpen={isOpenDeleteModal}
            setTargetOrder={setTargetOrder}
            orderObj={targetOrder}
            handleClose={() => {
              setIsOpenDeleteModal(false);
              setShouldUpdateTable(true);
            }}
        />

      </BasePage>
  );
}