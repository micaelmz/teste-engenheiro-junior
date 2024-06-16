import React, {useState, useEffect} from 'react';
import BasePage from './BasePage';
import {classNames} from 'primereact/utils';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {ProgressBar} from 'primereact/progressbar';
import {Calendar} from 'primereact/calendar';
import {MultiSelect} from 'primereact/multiselect';
import {Slider} from 'primereact/slider';
import {Tag} from 'primereact/tag';
import {TriStateCheckbox} from 'primereact/tristatecheckbox';
import maleUserIllustration from '../../assets/img/male-client-illustration.png';
import femaleUserIllustration from '../../assets/img/female-client-illustration.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import {OrderService} from '../../service/OrderService';
import {Modal, Typography} from "@mui/material";
import {InputGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


export default function OrdersDashboard() {
  const [orders, setOrders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [statuses] = useState(['Em aberto', 'Pago', 'Cancelado']);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);
  const [editingNow, setEditingNow] = useState(null);


  const [clients, setClients] = useState([
    {name: 'Amy Elsner', sex: 'f'},
    {name: 'Asiya Javayant', sex: 'f'},
    {name: 'Ioni Bowcher', sex: 'm'}
  ]);

  const getSeverity = (status) => {
    switch (status) {
      case 'Cancelado':
        return 'danger';

      case 'Pago':
        return 'success';

      case 'Em aberto':
        return 'warning';
    }
  };

  useEffect(() => {
    OrderService.getCustomersMedium().then((data) => {
      setOrders(getCustomers(data));
      setLoading(false);
    });
    OrderService.getAllClientsNameAndSex().then((data) => {
      console.log(data);
      setClients(data);
    });
    initFilters();
  }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const formatDate = (value) => {
    return value.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = {...filters};

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      product_name: {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
      },
      client: {value: null, matchMode: FilterMatchMode.IN},
      date: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
      price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      status: {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    });
    setGlobalFilterValue('');
  };


  const clientBodyTemplate = (rowData) => {
    const client = rowData.client;
    return (
        <div className="flex align-items-center gap-2">
          <img alt={client.name} src={client.sex === 'm' ? maleUserIllustration : femaleUserIllustration} width="32"/>
          <span className="ps-2">{client.name}</span>
        </div>
    );
  };

  const clientFilterTemplate = (options) => {
    return <MultiSelect value={options.value} options={clients} itemTemplate={clientsItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter"/>;
  };

  const clientsItemTemplate = (option) => {
    return (
        <div className="flex align-items-center gap-2">
          <img alt={option.name} src={option.sex === 'm' ? maleUserIllustration : femaleUserIllustration} width="32"/>
          <span className="ms-2">{option.name}</span>
        </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999"/>;
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const priceFilterTemplate = (options) => {
    return <InputNumber value={options.price} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="BRL" locale="pt-BR"/>;
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)}/>;
  };

  const statusFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear/>;
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)}/>;
  };

  return (
      <BasePage fabShow>
        <div className="card">
          <Typography variant="h6" className="text-black poppins fw-bold mb-4">Lista de todos os pedidos</Typography>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start">
              <SearchOutlinedIcon/>
            </Button>
          </InputGroup>
          <DataTable
              value={orders}
              paginator
              showGridlines
              rows={10}
              loading={loading}
              dataKey="id"
              filters={filters}
              globalFilterFields={['client.name', 'value', 'status']}
              emptyMessage="Nenhum pedido encontrado."
          >
            <Column
                field="product_name"
                header="Produto"
                filter
                filterPlaceholder="Buscar por produto"
                style={{minWidth: '18rem'}}
            />
            <Column
                header="Cliente"
                filterField="client"
                showFilterMatchModes={false}
                filterMenuStyle={{width: '14rem'}}
                style={{minWidth: '14rem'}}
                body={clientBodyTemplate}
                filter
                filterElement={clientFilterTemplate}/>

            <Column
                header="Data"
                filterField="date"
                dataType="date"
                style={{minWidth: '10rem'}}
                body={dateBodyTemplate}
                filter
                filterElement={dateFilterTemplate}
            />
            <Column
                header="Preço"
                filterField="price"
                dataType="numeric"
                style={{minWidth: '10rem'}}
                body={priceBodyTemplate}
                filter
                filterElement={priceFilterTemplate}
            />
            <Column
                field="status"
                header="Status"
                filterMenuStyle={{width: '14rem'}}
                style={{minWidth: '12rem'}}
                body={statusBodyTemplate}
                filter
                filterElement={statusFilterTemplate}
            />
            {/* coluna com action pra abrir um modal de edicao ou deletar item */}
            <Column
                headerStyle={{width: '8rem'}}
                bodyStyle={{textAlign: 'center'}}
                body={(rowData) => (
                    <div className="d-flex justify-content-center">
                      <Button
                          icon="pi pi-cog"
                          className="p-button-rounded rounded-5 btn-color-1-light p-mr-2"
                          onClick={() => {
                            setEditingNow(rowData);
                            handleOpenModal();
                          }}
                      />
                    </div>
                )}
            />
          </DataTable>
        </div>

        <Modal
            open={isOpenModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <div className="base-modal">
            <Typography id="modal-modal-title" className="poppins" variant="h6" component="h2">
              Atualizar pedido
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </BasePage>
  );
}