import React, {useEffect, useState} from 'react';
import BasePage from './BasePage';
import {Button} from 'primereact/button';
import {Typography} from "@mui/material";
import {InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ClientDataTable from "../../components/datatables/ClientDataTable";
import {UpdateClientModal, DeleteClientModal, CreateClientModal} from "../../components/modals/ClientModals";
import {ClientService} from "../../service/ClientService";

export default function ClientsDashboard() {
  const clientObject = {
    id: 0,
    name: '',
    surname: '',
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
  }

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [clients, setClients] = useState(null);

  const [targetClient, setTargetClient] = useState(clientObject); // Target to edit or delete

  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);


  return (
      <BasePage fabShow fabCallback={() => {
        setTargetClient(clientObject);
        setIsOpenCreateModal(true);
      }}>
        <div className="card">
          <Typography variant="h6" className="text-black poppins fw-bold mb-2">
            Resumo de todos os clientes
          </Typography>
          <Typography variant="h7" className="text-black-50 poppins fw-bold mb-4">
            Clique em um cliente para ver mais detalhes
          </Typography>

          <InputGroup className="mb-3">
            <Form.Control value={searchQuery} onChange={(e) => {
              setSearchQuery(e.target.value)
            }} placeholder="Digite sua pesquisa"/>
            <Button className="btn-color-1 rounded-4 rounded-start" onClick={() => {
              ClientService.search(searchQuery).then((response) => {
                  setClients(response);
                });
              }
            }>
              <SearchOutlinedIcon/>
            </Button>
          </InputGroup>

          <ClientDataTable
              service={ClientService}
              clients={clients}
              setClients={setClients}
              shouldUpdateTable={shouldUpdateTable}
              setShouldUpdateTable={setShouldUpdateTable}
              onUpdate={(rowData) => {
                setTargetClient(rowData);
                setIsOpenUpdateModal(true);
              }}
              onDelete={(rowData) => {
                setTargetClient(rowData);
                setIsOpenDeleteModal(true);
              }}
          />
          <CreateClientModal
              service={ClientService}
              clientObj={targetClient}
              setTargetClient={setTargetClient}
              isOpen={isOpenCreateModal}
              handleClose={() => {
                setIsOpenCreateModal(false);
                setShouldUpdateTable(true);
              }}
          />
          <UpdateClientModal
              service={ClientService}
              clientObj={targetClient}
              setTargetClient={setTargetClient}
              isOpen={isOpenUpdateModal}
              handleClose={() => {
                setIsOpenUpdateModal(false);
                setShouldUpdateTable(true);
              }}
          />
          <DeleteClientModal
              service={ClientService}
              clientObj={targetClient}
              setTargetClient={setTargetClient}
              isOpen={isOpenDeleteModal}
              handleClose={() => {
                setIsOpenDeleteModal(false);
                setShouldUpdateTable(true);
              }}
          />
        </div>
      </BasePage>
  );
}