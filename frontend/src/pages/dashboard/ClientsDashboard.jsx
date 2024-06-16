import React, {useEffect, useState} from 'react';
import BasePage from './BasePage';
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
import {ClientService} from '../../service/ClientService';
import {Modal, Typography} from "@mui/material";
import {Col, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import maleUserIllustration from '../../assets/img/male-client-illustration.png';
import femaleUserIllustration from '../../assets/img/female-client-illustration.png';


export default function ClientsDashboard() {

  // TODO: BUG NO FILTRO DE LOCALIZATION, RESOLVER (MESMO BUG QUE OCORREU NO ORDER)
  const [clients, setClients] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [sortField, setSortField] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const handleOpenUpdateModal = () => setIsOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    resetEditingNow();
    setIsOpenUpdateModal(false);
  };

  const clientObject = {
    id: 0,
    name: '',
    sex: '',
    document: '',
    email: '',
    tel: '',
    city: '',
    state_name: '',
    state_code: '',
    cep: '',
    street_name: '',
    birthday: '',
    status: '',
    score: 0,
    created_at: '',
    updated_at: '',
    spent: 0,
    surname: ''
  }

  const handleOpenDeleteModal = () => setIsOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);
  const [editingNow, setEditingNow] = useState(clientObject);

  const [statuses] = useState(['active', 'pending', 'inactive']);

  const resetEditingNow = () => {
    setEditingNow(clientObject)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    let updatedEditingNow = { ...editingNow };

    if (name.includes('.')) {
      const keys = name.split('.');
      let temp = updatedEditingNow;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
    } else {
      updatedEditingNow[name] = value;
    }

    setEditingNow(updatedEditingNow);
  };

  const refreshData = () => {
    setLoading(true);
    ClientService.getData().then((data) => {
      setClients(formatClientData(data));
      setLoading(false);
    });
  }

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

  useEffect(() => {
    setLoading(true);
    refreshData();
    initFilters();
  }, []);

  const handleDocumentInputChange = (e) => {
    let {value} = e.target;

    value = value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    setEditingNow({...editingNow, document: value});
  };

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

  const initFilters = () => {
    setFilters({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      id: {value: null, matchMode: FilterMatchMode.CONTAINS},
      created_at: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
      spent: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      status: {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      score: {value: null, matchMode: FilterMatchMode.BETWEEN},
      state_name: {value: null, matchMode: FilterMatchMode.IN} // Alterado para 'location.state.name'
    });
    setGlobalFilterValue('');
    setSortField('id');
    setSortOrder(1);
  };

  const locationFilterTemplate = (options) => {
    return (
        <MultiSelect
            value={options.value}
            options={ClientService.getBrazilianStates()}
            onChange={(e) => options.filterCallback(e.value)}
            optionLabel="name"
            optionValue="code"
            placeholder="Selecione um estado"
            className="p-column-filter"
        />
    );
  };

  const locationBodyTemplate = (rowData) => {
    const {state_name, state_code} = rowData;
    let flag = ClientService.getBrazilianStateFlag(state_code);

    return (
        <div className="flex align-items-center gap-2">
          <img
              alt={state_name}
              title={state_name}
              src={flag}
              style={{width: '24px'}}
          />
          <span className="ms-2">{state_name}</span>
        </div>
    );
  };

  const clientBodyTemplate = (rowData) => {
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

  const idBodyTemplate = (rowData) => {
    return <span className="fw-bold">{rowData.id}</span>
  }

  const joinedBodyTemplate = (rowData) => {
    let date = new Date(rowData.created_at);
    return formatDate(date);
  };

  const joinedFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999"/>;
  };

  const totalSpentBodyTemplate = (rowData) => {
    // TODO: INSERIR O VALOR REAL
    return formatCurrency(0);
  };

  const totalSpentFilterTemplate = (options) => {
    return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="BRL" locale="pt-BR"/>;
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

  const serasaScoreBodyTemplate = (rowData) => {
    return <ProgressBar value={rowData.score / 10} showValue={false} style={{height: '6px'}}></ProgressBar>;
  };

  const serasaScoreFilterTemplate = (options) => {
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


  return (
      <BasePage fabShow>
        <div className="card">
          <Typography variant="h6" className="text-black poppins fw-bold mb-2">Resumo de todos os clientes</Typography>
          <Typography variant="h7" className="text-black-50 poppins fw-bold mb-4">Clique em um cliente para ver mais
            detalhes</Typography>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start">
              <SearchOutlinedIcon/>
            </Button>
          </InputGroup>
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
                body={clientBodyTemplate}
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
                body={serasaScoreBodyTemplate}
                filter
                filterElement={serasaScoreFilterTemplate}
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
                            handleOpenUpdateModal();
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
                            setEditingNow(rowData);
                            handleOpenDeleteModal();
                          }}
                      />
                    </div>
                )}
            />
          </DataTable>
        </div>

        <Modal
            open={isOpenUpdateModal}
            onClose={handleCloseUpdateModal}
        >
          <div className="base-modal">
            <Form className="w-100 mx-auto">
              <p className="text-white poppins fw-bold fs-3 w-100 ">
                Atualizando dados do cliente {editingNow.name}
              </p>

              <input name="id" type="hidden" value={editingNow.id}></input>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label style={{color: "#c5c5c5"}}>Nome</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        value={editingNow.name}
                        onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label style={{color: "#c5c5c5"}}>Sobrenome</Form.Label>
                    <Form.Control
                        name="surname"
                        type="text"
                        value={editingNow.surname}
                        onChange={handleOnChange}
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
                        value={editingNow.email}
                        onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Telefone</Form.Label>
                    <Form.Control
                        name="tel"
                        type="tel"
                        value={editingNow.tel}
                        onChange={handleOnChange}
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
                        value={editingNow.document}
                        onChange={handleOnChange}
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
                        value={editingNow.birthday}
                        onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Sexo</Form.Label>
                    <Form.Select name="sex" value={editingNow.sex} onChange={handleOnChange}>
                      <option value="m" selected={editingNow.sex === 'm'}>Masculino</option>
                      <option value="f" selected={editingNow.sex === 'f'}>Feminino</option>
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
                        value={editingNow.city}
                        onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Estado</Form.Label>
                    <Form.Select name="state" value={editingNow.state_name} onChange={handleOnChange}>
                      {ClientService.getBrazilianStates().map((state) => (
                          <option value={state.code}>
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
                        value={editingNow.cep}
                        onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr/>
              <Button type="submit" className="btn-color-1 rounded-3">
                Atualizar
              </Button>
            </Form>
          </div>
        </Modal>

        <Modal
            open={isOpenDeleteModal}
            onClose={handleCloseDeleteModal}
        >
          <div className="base-modal">
            <p className="text-white poppins fw-bold fs-3 w-100 text-center">
              Deletando o cliente {editingNow.name}
            </p>

            <div className="d-flex justify-content-center gap-4">
              <Button className="btn-color-1 rounded-3" onClick={handleCloseDeleteModal}>
                Cancelar
              </Button>
              <Button className="btn-color-4 rounded-3" onClick={() => {
                ClientService.delete(editingNow.id).then(() => {
                    handleCloseDeleteModal();
                    refreshData();
                  });
                }}>
                Deletar
              </Button>
            </div>
          </div>
        </Modal>

      </BasePage>
  );
}