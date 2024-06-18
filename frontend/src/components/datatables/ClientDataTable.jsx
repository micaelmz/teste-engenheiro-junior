import React, {useEffect, useState} from 'react';

import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {MultiSelect} from "primereact/multiselect";
import {Calendar} from "primereact/calendar";
import {InputNumber} from "primereact/inputnumber";
import {Tag} from "primereact/tag";
import {Dropdown} from "primereact/dropdown";
import {ProgressBar} from "primereact/progressbar";
import {Slider} from "primereact/slider";
import {FilterMatchMode, FilterOperator} from "primereact/api";

import maleUserIllustration from '../../assets/img/male-client-illustration.png';
import femaleUserIllustration from '../../assets/img/female-client-illustration.png';

export default function ClientDataTable({service, clients, setClients, onUpdate, onDelete, shouldUpdateTable, setShouldUpdateTable}) {
  /* STATES */
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [statuses] = useState(['active', 'pending', 'inactive']);

  /* DATA FORMATING METHODS */
  const formatClientData = (data) => {
    return [...(data || [])].map((d) => {
      d.created_at = new Date(d.created_at);
      d.updated_at = new Date(d.updated_at);
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


  /* BODY TEMPLATES (Table Columns) */
  const idBodyTemplate = (rowData) => {
    return <span className="fw-bold">{rowData.id}</span>
  }

  const locationBodyTemplate = (rowData) => {
    const {state_name, state_code, city} = rowData;
    let flag = service.getBrazilianStateFlag(state_code);

    return (
        <div className="flex align-items-center gap-2">
          <img
              alt={state_name}
              title={state_name}
              src={flag}
              style={{width: '24px'}}
          />
          <span className="ms-2">{city}</span>
        </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    const {name, surname, sex} = rowData;

    return (
        <div className="flex align-items-center gap-2">
          <img
              alt={name}
              width="32"
              src={sex === 'm' ? maleUserIllustration : femaleUserIllustration}
          />
          <span className="ms-2">{name} {surname}</span>
        </div>
    );
  };

  const joinedBodyTemplate = (rowData) => {
    let date = new Date(rowData.created_at);
    return formatDate(date);
  };

  const totalSpentBodyTemplate = (rowData) => {
    return formatCurrency(rowData.total_spent);
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)}/>;
  };

  const scoreBodyTemplate = (rowData) => {
    return <ProgressBar value={rowData.score / 10} showValue={false} style={{height: '6px'}}></ProgressBar>;
  };


  /* FILTERS TEMPLATES */
  const locationFilterTemplate = (options) => {
    return (
        <MultiSelect
            value={options.value}
            options={service.getBrazilianStates()}
            onChange={(e) => options.filterCallback(e.value)}
            optionLabel="name"
            optionValue="code"
            placeholder="Selecione um estado"
            className="p-column-filter"
        />
    );
  };

  const joinedFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999"/>;
  };

  const totalSpentFilterTemplate = (options) => {
    return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="BRL" locale="pt-BR"/>;
  };

  const statusFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear/>;
  };

  const scoreFilterTemplate = (options) => {
    return (
        <React.Fragment>
          <Slider value={options.value} onChange={(e) => {
            let values = [...e.value];
            if (values[0] > values[1]) {
              values[0] = values[1];
            }
            options.filterCallback(values);
          }} range min={0} max={1000} className="m-3"></Slider>
          <div className="flex align-items-center justify-content-between px-2">
            <span>{options.value ? options.value[0] : 0}</span>
            <span> a </span>
            <span>{options.value ? options.value[1] : 1000}</span>
          </div>
        </React.Fragment>
    );
  };


  /* ITEMS TEMPLATES */
  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)}/>;
  };

  /* UTILS */
  const initFilters = () => {
    setFilters({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      id: {value: null, matchMode: FilterMatchMode.CONTAINS},
      created_at: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
      spent: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      status: {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      score: {value: null, matchMode: FilterMatchMode.BETWEEN},
      state_name: {value: null, matchMode: FilterMatchMode.IN}
    });
    setGlobalFilterValue('');
    setSortField('id');
    setSortOrder(1);
  };

  const getSeverity = (status) => {
    switch (status) {
      case 'active':
        return 'success';

      case 'pending':
        return 'warning';

      case 'inactive':
        return 'danger';
    }
  };

  const fetchTableData = () => {
    setLoading(true);
    service.getData().then((data) => {
      setClients(formatClientData(data));
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
          value={clients}
          paginator
          showGridlines
          rows={10}
          loading={loading}
          dataKey="id"
          filters={filters}
          globalFilterFields={[]}
          emptyMessage="Nenhum cliente encontrado."
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={(e) => {
            setSortField(e.sortField);
            setSortOrder(e.sortOrder);
          }}
      >
        />
        <Column
            header="ID"
            filterField="id"
            sortable
            sortField="id"
            sortOrder={sortOrder}
            onSort={(e) => {
              setSortField(e.sortField);
              setSortOrder(e.sortOrder);
            }}
            showFilterMatchModes={false}
            filterMenuStyle={{width: '2rem'}}
            style={{minWidth: '2rem'}}
            body={idBodyTemplate}
        />
        <Column
            header="Localização"
            filterField="state_name" // Alterado para 'location.state.name'
            style={{minWidth: '12rem'}}
            body={locationBodyTemplate}
            filter
            filterElement={locationFilterTemplate}
        />
        <Column
            header="Nome"
            filterField="name"
            showFilterMatchModes={false}
            filterMenuStyle={{width: '14rem'}}
            style={{minWidth: '14rem'}}
            body={nameBodyTemplate}
        />
        <Column
            header="Ingresso"
            filterField="created_at"
            dataType="date"
            style={{minWidth: '9rem'}}
            body={joinedBodyTemplate}
            filter
            filterElement={joinedFilterTemplate}
        />
        <Column
            header="Total Gasto"
            filterField="spent"
            dataType="numeric"
            style={{minWidth: '10rem'}}
            body={totalSpentBodyTemplate}
            filter
            filterElement={totalSpentFilterTemplate}
        />
        <Column
            field="status"
            header="Status"
            filterMenuStyle={{width: '5rem'}}
            style={{minWidth: '5rem'}}
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
        />
        <Column
            field="score"
            header="Score"
            showFilterMatchModes={false}
            style={{minWidth: '10rem'}}
            body={scoreBodyTemplate}
            filter
            filterElement={scoreFilterTemplate}
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
                        onUpdate(rowData);
                      }}
                  />
                </div>
            )}
        />
        <Column
            headerStyle={{width: '8rem'}}
            bodyStyle={{textAlign: 'center'}}
            body={(rowData) => (
                <div className="d-flex justify-content-center">
                  <Button
                      icon="pi pi-trash"
                      className="p-button-rounded rounded-5 btn-color-4 p-mr-2"
                      onClick={() => {
                        onDelete(rowData);
                      }}
                  />
                </div>
            )}
        />
      </DataTable>
  );
}