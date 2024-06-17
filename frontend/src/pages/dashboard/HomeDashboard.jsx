import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import SummaryCard from '../../components/SummaryCard';
import SmallSummaryCard from '../../components/SmallSummaryCard';
import OrderCard from '../../components/OrderCard';
import {Typography} from "@mui/material";
import BasePage from './BasePage';


export default function DashboardIndex() {

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
      <BasePage>
        {/* =============== INICIO CARDS DE SUMMARY =============== */}
        <Row className="mb-4">
          <Col xs={8}>
            <Row>
              <Col>
                <SummaryCard
                    icon={<ShoppingCartIcon/>}
                    variant={1}
                    title="Total de Produtos"
                    value="100.000"
                    callback={() => {
                    }}
                />
              </Col>
              <Col>
                <SummaryCard
                    icon={<PeopleAltIcon/>}
                    variant={2}
                    title="Total de Clientes"
                    value="150.000"
                    callback={() => {
                    }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <div className="d-flex flex-column justify-content-between" style={{height: '100%'}}>
              <Row>
                <SmallSummaryCard
                    icon={<PaidIcon/>}
                    variant={1}
                    title="Vendas Confirmadas"
                    value="R$ 30.000,00"
                />
              </Row>
              <Row>
                <SmallSummaryCard
                    icon={<PaidIcon/>}
                    variant={3}
                    title="Em Processamento"
                    value="R$ 20.000,00"
                />
              </Row>
            </div>
          </Col>
        </Row>
        {/* =============== FIM CARDS DE SUMMARY =============== */}

        <Row>
          {/* =============== INICIO GRAFICO DE BARRAS =============== */}
          <Col xs={8}>
            <div className="bg-color-2 p-4 rounded-4" style={{minHeight: "60vh"}}>
              <Typography variant="h6" className="text-black poppins fw-bold ms-3 mb-1">Vendas Semanais</Typography>
              <Typography variant="h7" className="text-black-50 poppins fw-bold ms-3 mb-3">Total: R$
                3000,00
              </Typography>

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
          {/* =============== FIM GRAFICO DE BARRAS =============== */}

          {/* =============== INICIO ULTIMAS VENDAS =============== */}
          <Col xs={4}>
            <div className="bg-color-2 p-4 rounded-4">
              <Typography variant="h6" className="text-black poppins fw-bold ms-2 mb-3">Últimas Vendas</Typography>
              <OrderCard
                  itemName="Camisa Polo"
                  userName="João da Silva"
                  value="100,00"
              />
              <OrderCard
                  itemName="Perfume Malbec"
                  userName="João da Silva"
                  value="540,00"
              />
              <OrderCard
                  itemName="Bermuda Jeans"
                  userName="João da Silva"
                  value="150,00"
              />
            </div>
          </Col>
          {/* =============== FIM ULTIMAS VENDAS =============== */}
        </Row>
      </BasePage>
  );
};
