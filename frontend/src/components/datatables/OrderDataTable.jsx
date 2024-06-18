import React, {useEffect, useState} from 'react';
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {OrderService} from "../../service/OrderService";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import maleUserIllustration from "../../assets/img/male-client-illustration.png";
import femaleUserIllustration from "../../assets/img/female-client-illustration.png";
import {MultiSelect} from "primereact/multiselect";
import {Calendar} from "primereact/calendar";
import {InputNumber} from "primereact/inputnumber";
import {Tag} from "primereact/tag";
import {Dropdown} from "primereact/dropdown";

export default function OrderDataTable({service, setShouldUpdateTable, shouldUpdateTable}) {

  /* STATES */
  const [orders, setOrders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [statuses] = useState(['pending', 'paid', 'canceled']);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);
  const [editingNow, setEditingNow] = useState(null);
  const [clients, setClients] = useState({});

  /* DATA FORMATING METHODS */
  const formatOrderData = (data) => {
    return [...(data || [])].map((d) => {
      d.updated_at = new Date(d.updated_at);
      console.log('data: '+d.day);
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
    value = parseFloat(value);
    return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  };

  const locateStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';

      case 'paid':
        return 'Pago';

      case 'canceled':
        return 'Cancelado';
    }
  }


  /* BODY TEMPLATES (Table Columns) */
  const clientBodyTemplate = (rowData) => {
    const client = rowData.client;
    return (
        <div className="flex align-items-center gap-2">
          <img alt={client.name} src={client.sex === 'm' ? maleUserIllustration : femaleUserIllustration} width="32"/>
          <span className="ps-2">{client.name} {client.surname}</span>
        </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.updated_at);
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData['product'].price);
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={locateStatus(rowData.status)} severity={getSeverity(rowData.status)}/>;
  };


  /* FILTERS TEMPLATES */
  const clientFilterTemplate = (options) => {
    return <MultiSelect value={options.value} options={clients} itemTemplate={clientsItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter"/>;
  };

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999"/>;
  };

  const priceFilterTemplate = (options) => {
    return <InputNumber value={options.price} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="BRL" locale="pt-BR"/>;
  };

  const statusFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear/>;
  };


  /* ITEMS TEMPLATES */
  const clientsItemTemplate = (option) => {
    return (
        <div className="flex align-items-center gap-2">
          <img alt={option.name} src={option.sex === 'm' ? maleUserIllustration : femaleUserIllustration} width="32"/>
          <span className="ms-2">{option.name}</span>
        </div>
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)}/>;
  };

  /* UTILS */
  const getClients = (dataTable) => {
    return dataTable.map((d) => d.client);
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

  const getSeverity = (status) => {
    switch (status) {
      case 'canceled':
        return 'danger';

      case 'paid':
        return 'success';

      case 'pending':
        return 'warning';
    }
  };

  const fetchTableData = () => {
    service.getData().then((data) => {
      setOrders(formatOrderData(data));
      setClients(getClients(data));
      setLoading(false);
      setShouldUpdateTable(false);
    });
  }


  /* LIFECYCLE */
  useEffect(() => {
    setLoading(true);
    fetchTableData();
    initFilters();
  }, [shouldUpdateTable]);


  return (
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
  );
}