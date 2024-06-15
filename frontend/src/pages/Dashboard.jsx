import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {Button} from "react-bootstrap";
import PaidIcon from '@mui/icons-material/Paid';
import PaymentsIcon from '@mui/icons-material/Payments';
import maleUserIllustration from '../assets/img/male-user-illustration.webp';


export default function Dashboard() {

  const data = [
    {
      name: 'Segunda',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Terça',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Qaurta',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Quinta',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Sexta',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Sábado',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Domingo',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
      <div className="bg-color-1 min-h-100 min-vh-100 m-0 p-0">
        <Container fluid>
          {/* Barra de navegacao superior */}
          <Row className="p-4 mb-0 bg-color-2" style={{minHeight: "12vh"}}>
            <Col xs={2} className="d-flex align-items-center">
              <p className="text-color-1 text-center poppins my-auto fw-bolder fs-4">ORDENAI</p>
            </Col>
            <Col xs={7} className="d-flex align-items-center">
              <input type="text" className="form-control" placeholder="Buscar"/>
            </Col>
            <Col xs={3} className="d-flex align-items-center justify-content-end">
              <img src={maleUserIllustration} alt="Usuário" className="rounded-circle" style={{width: "3rem"}}/>
            </Col>
          </Row>
          <Row>
            {/* Barra de navegacao lateral */}
            <Col xs={2} className="bg-color-1 d-flex bg-color-2" style={{minHeight: "88vh"}}>
              <ul className="list-unstyled">
                <li>
                  <Link to="/dashboard" className="text-decoration-none text-color-1 d-block p-2">
                    Produtos
                  </Link>
                </li>
              </ul>
            </Col>
            {/* Conteudo principal */}
            <Col xs={10} className="p-4">
              <Row className="mb-4">
                <Col xs={8}>
                  <Row>
                    <Col>
                      <div className="bg-color-3 p-4 rounded-4">
                        <div className="d-flex justify-content-between">
                          <ShoppingCartIcon className="text-white p-2 fs-1 bg-color-35 rounded-3"/>
                          <Button className="btn-color-1 bg-color-35 border-0 fw-semibold">Detalhes</Button>
                        </div>
                        <p className="fs-3 poppins text-white fw-semibold mt-3 mb-1">100.000</p>
                        <p className="fs-5 poppins text-white-50 mb-0 fw-semibold">Total de Produtos</p>
                      </div>
                    </Col>
                    <Col>
                      <div className="bg-color-4 p-4 rounded-4">
                        <div className="d-flex justify-content-between">
                          <PeopleAltIcon className="text-white p-2 fs-1 bg-color-45 rounded-3"/>
                          <Button className="btn-color-3 bg-color-35 border-0 fw-semibold">Detalhes</Button>
                        </div>
                        <p className="fs-3 poppins text-white fw-semibold mt-3 mb-1">100.000</p>
                        <p className="fs-5 poppins text-white-50 mb-0 fw-semibold">Total de Clientes</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <div className="d-flex flex-column justify-content-between" style={{height: '100%'}}>
                    <Row>
                      <div className="bg-color-4 p-3 rounded-4 d-flex justify-content-between">
                        <PaidIcon className="text-white my-auto p-2 fs-2 bg-color-45 rounded-3"/>
                        <div>
                          <p className="mb-0 text-white fw-semibold poppins text-end">R$ 30.000,00</p>
                          <p className="mb-0 text-sm text-white-50 roboto">Vendas Confirmadas</p>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="bg-color-5 p-3 rounded-4 d-flex justify-content-between">
                        <PaymentsIcon className="text-white my-auto p-2 fs-2 bg-color-55 rounded-3"/>
                        <div>
                          <p className="mb-0 text-black fw-semibold poppins text-end">R$ 30.000,00</p>
                          <p className="mb-0 text-sm text-black-50 roboto">Em Processamento</p>
                        </div>
                      </div>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={8}>
                  <div className="bg-color-2 p-4 rounded-4" style={{minHeight: "60vh"}}>
                    <p className="text-black-50 poppins fw-bold ms-3 mb-1">Registro de Vendas Semanais</p>
                    <p className="text-black poppins fw-bold ms-3 mb-3">Total: R$ 3000,00</p>

                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                          data={data}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/> <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="pv" stackId="a" fill="#1e87e3"/>
                        <Bar dataKey="uv" stackId="a" fill="#f8eda3"/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="bg-color-2 p-4 rounded-4">
                    <p className="text-black poppins fw-bold ms-2 mb-3">Últimas Vendas</p>

                    <div className="py-2 px-3 rounded-2 mb-2 bg-color-1-gradient">
                      <div className="justify-content-between d-flex">
                        <p className="text-black-50 poppins text-truncate mb-2">Camisa Polo</p>
                        <p className="text-success fw-semibold poppins mb-2"><ArrowDropUpIcon/>R$ 100,00</p>
                      </div>
                      <p className="text-black roboto text-xs d-flex align-items-center"><PersonOutlineIcon/>João da
                        Silva</p>
                    </div>

                    <div className="py-2 px-3 rounded-4 mb-2 bg-color-1-gradient">
                      <div className="justify-content-between d-flex">
                        <p className="text-black-50 poppins text-truncate mb-2">Perfume Malbec</p>
                        <p className="text-success fw-semibold poppins mb-2"><ArrowDropUpIcon/>R$ 540,00</p>
                      </div>
                      <p className="text-black roboto text-xs d-flex align-items-center"><PersonOutlineIcon/>João da
                        Silva</p>
                    </div>

                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
  );
};
