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


import {OrderService} from '../../service/OrderService';


export default function OrdersDashboard() {
  const [orders, setOrders] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [statuses] = useState(['Em aberto', 'Pago', 'Cancelado']);
  const [clientNames, setClientNames] = useState([]); // novo estado para armazenar os nomes dos clientes


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
    OrderService.getAllCustomersName().then(setClientNames);
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
      value: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      status: {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    });
    setGlobalFilterValue('');
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.client;
    return (
        <div className="flex align-items-center gap-2">
          <img alt={representative.name}
               src={representative.sex === 'm' ? maleUserIllustration : femaleUserIllustration} width="32"/>
          <span className="ps-2">{representative.name}</span>
        </div>
    );
  };

  const representativeFilterTemplate = (options) => {
    return (
        <MultiSelect
            value={options.value}
            options={clientNames}
            onChange={(e) =>
                options.filterCallback(e.value)
            }
            placeholder="Todos"
            className="p-column-filter"
        />
    );
  };

  const representativesItemTemplate = (option) => {
    return (
        <div className="flex align-items-center gap-2">
          <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32"/>
          <span>{option.name}</span>
        </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999"/>;
  };

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.value);
  };

  const balanceFilterTemplate = (options) => {
    return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US"/>;
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

  const activityBodyTemplate = (rowData) => {
    return <ProgressBar value={rowData.activity} showValue={false} style={{height: '6px'}}></ProgressBar>;
  };

  const activityFilterTemplate = (options) => {
    return (
        <React.Fragment>
          <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
          <div className="flex align-items-center justify-content-between px-2">
            <span>{options.value ? options.value[0] : 0}</span>
            <span>{options.value ? options.value[1] : 100}</span>
          </div>
        </React.Fragment>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return <i className={classNames('pi', {
      'text-green-500 pi-check-circle': rowData.verified,
      'text-red-500 pi-times-circle': !rowData.verified
    })}></i>;
  };

  const verifiedFilterTemplate = (options) => {
    return (
        <div className="flex align-items-center gap-2">
          <label htmlFor="verified-filter" className="font-bold">
            Verified
          </label>
          <TriStateCheckbox inputId="verified-filter" value={options.value} onChange={(e) => options.filterCallback(e.value)}/>
        </div>
    );
  };


  return (
      <BasePage>
        <div className="card">
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
                filterMenuStyle={{width: '16rem'}}
                style={{minWidth: '14rem'}}
                body={representativeBodyTemplate}
                filter
                filterElement={representativeFilterTemplate}
            />
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
                header="Valor"
                filterField="value"
                dataType="numeric"
                style={{minWidth: '10rem'}}
                body={balanceBodyTemplate}
                filter
                filterElement={balanceFilterTemplate}
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
          </DataTable>
        </div>
        );
      </BasePage>
  );
}