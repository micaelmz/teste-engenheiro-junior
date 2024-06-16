import React, {useState, useEffect} from 'react';
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
import {Link} from "react-router-dom";


export default function ClientsDashboard() {

  // TODO: BUG NO FILTRO DE LOCALIZATION, RESOLVER (MESMO BUG QUE OCORREU NO ORDER)
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [sortField, setSortField] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => {
    resetEditingNow();
    setIsOpenModal(false);
  };
  const [editingNow, setEditingNow] = useState({
    id: 0,
    name: '',
    sex: '',
    document: '',
    email: '',
    tel: '',
    location: {
      city: '',
      state: {
        name: '',
        code: ''
      },
      cep: '',
      street_name: ''
    },
    birthday: '',
    joined: '',
    last_activity: '',
    status: '',
    spent: 0,
    serasa_score: 0
  });
  const [statuses] = useState(['active', 'pending', 'inactive']);

  const resetEditingNow = () => {
    setEditingNow({
      id: 0,
      name: '',
      sex: '',
      document: '',
      email: '',
      tel: '',
      location: {
        city: '',
        state: {
          name: '',
          code: ''
        },
        cep: '',
        street_name: ''
      },
      birthday: '',
      joined: '',
      last_activity: '',
      status: '',
      spent: 0,
      serasa_score: 0
    })
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
    ClientService.getCustomersMedium().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
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

  const getCustomers = (data) => {
    const processedData = [...(data || [])].map((d) => {
      d.joined = new Date(d.joined);
      return d;
    });

    console.log(processedData); // Adicione esta linha

    return processedData;
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
      joined: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
      spent: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      status: {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      serasa_score: {value: null, matchMode: FilterMatchMode.BETWEEN},
      'location.state.name': {value: null, matchMode: FilterMatchMode.IN} // Alterado para 'location.state.name'
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
    let flag = ClientService.getBrazilianStateFlag(rowData.location.state.code);
    return (
        <div className="flex align-items-center gap-2">
          <img
              alt={rowData.location.state.name}
              title={rowData.location.state.name}
              src={flag}
              style={{width: '24px'}}
          />
          <span className="ms-2">{rowData.location.state.name}</span>
        </div>
    );
  };


  const locationItemTemplate = (option) => {
    return (
        <div className="flex align-items-center gap-2">
          <img alt={option.name} src={ClientService.getBrazilianStateFlag(option.code)} width="24"/>
          <span>{option.name}</span>
        </div>
    );
  }


  const clientBodyTemplate = (rowData) => {
    const {name, sex} = rowData;

    return (
        <div className="flex align-items-center gap-2">
          <img
              alt={name}
              width="32"
              src={sex === 'm' ? maleUserIllustration : femaleUserIllustration}
          />
          <span className="ms-2">{name}</span>
        </div>
    );
  };

  const idBodyTemplate = (rowData) => {
    return <span className="fw-bold">{rowData.id}</span>
  }

  const joinedBodyTemplate = (rowData) => {
    let date = new Date(rowData.joined);
    return formatDate(date);
  };

  const joinedFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999"/>;
  };

  const totalSpentBodyTemplate = (rowData) => {
    return formatCurrency(rowData.spent);
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
    return <ProgressBar value={rowData.serasa_score / 10} showValue={false} style={{height: '6px'}}></ProgressBar>;
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
              value={customers}
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
                filterField="location.state.name" // Alterado para 'location.state.name'
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
                filterField="joined"
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
                field="serasa_score"
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
                            handleOpenModal();
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
                            // modal de confirmacao
                            // service de deletar
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
            <Form className="w-100 mx-auto">
              <p className="text-white poppins fw-bold fs-3 w-100 ">
                Atualizando dados do cliente {editingNow.name}
              </p>

              <input name="id" type="hidden" value={editingNow.id}></input>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label style={{color: "#c5c5c5"}}>Nome</Form.Label>
                    <Form.Control name="name" type="text" value={editingNow.name.split(" ")[0]}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label style={{color: "#c5c5c5"}}>Sobrenome</Form.Label>
                    <Form.Control name="surname" type="text" value={editingNow.name.split(" ")[1]}/>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={8}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Endereço de email</Form.Label>
                    <Form.Control name="email" type="email" value={editingNow.email}/>
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Telefone</Form.Label>
                    <Form.Control name="tel" type="tel" value={editingNow.tel}/>
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
                        onChange={handleDocumentInputChange}
                        maxLength={18}/>
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Data de Nascimento</Form.Label>
                    <Form.Control
                        name="birthday"
                        type="date"
                        value={editingNow.birthday}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Sexo</Form.Label>
                    <Form.Select name="sex">
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
                        value={editingNow.location.city}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{color: "#c5c5c5"}}>Estado</Form.Label>
                    <Form.Select name="state">
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
                        value={editingNow.location.cep}
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
      </BasePage>
  );
}