import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import SummaryCard from '../../components/SummaryCard';
import SmallSummaryCard from '../../components/SmallSummaryCard';
import OrderCard from '../../components/OrderCard';
import {CircularProgress, Typography} from "@mui/material";
import BasePage from './BasePage';
import {HomeService} from "../../service/HomeService";


export default function DashboardIndex() {
  const [loading, setLoading] = useState(true);
  const [totalClients, setTotalClients] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState({paid: 0, canceled: 0, pending: 0});
  const [lastOrders, setLastOrders] = useState([]);
  const [data, setData] = useState();
  const [totalWeekSales, setTotalWeekSales] = useState(0);


  function translateWeekSalesData(weekSales) {
    return weekSales.map(dayData => {
      let translatedName = '';

      switch (dayData.name) {
        case 'Monday':
          translatedName = 'Segunda';
          break;
        case 'Tuesday':
          translatedName = 'Terça';
          break;
        case 'Wednesday':
          translatedName = 'Quarta';
          break;
        case 'Thursday':
          translatedName = 'Quinta';
          break;
        case 'Friday':
          translatedName = 'Sexta';
          break;
        case 'Saturday':
          translatedName = 'Sábado';
          break;
        case 'Sunday':
          translatedName = 'Domingo';
          break;
        default:
          translatedName = dayData.name; // caso não seja um dia da semana conhecido, mantém o original
      }

      return {
        name: translatedName,
        Pago: dayData.paid,
        Cancelado: dayData.canceled,
        Pendente: dayData.pending
      };
    });
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  };

  const fetchData = async () => {
    try {
      const [totalClients, totalProducts, totalSales, lastOrders, weekSales] = await Promise.all([
        HomeService.getTotalClients(),
        HomeService.getTotalProducts(),
        HomeService.getTotalSales(),
        HomeService.getLastSales(),
        HomeService.getWeeksales(),
      ]);

      setTotalClients(totalClients);
      setTotalProducts(totalProducts);
      setTotalSales(totalSales);
      setLastOrders(lastOrders);

      setData(translateWeekSalesData(weekSales));
      setTotalWeekSales(HomeService.sumTotalWeekSales(weekSales));
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    loadData();
  }, []);


  return (
      <BasePage>
        {loading && <CircularProgress style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />}

        {/* =============== INICIO CARDS DE SUMMARY =============== */}
        <Row className="mb-4">
          <Col xs={8}>
            <Row>
              <Col>
                <SummaryCard
                    icon={<ShoppingCartIcon/>}
                    variant={1}
                    title="Total de Produtos"
                    value={totalProducts}
                    callback="/dashboard/products"
                />
              </Col>
              <Col>
                <SummaryCard
                    icon={<PeopleAltIcon/>}
                    variant={2}
                    title="Total de Clientes"
                    value={totalClients}
                    callback="/dashboard/clients"
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
                    value={formatCurrency(totalSales.paid)}
                />
              </Row>
              <Row>
                <SmallSummaryCard
                    icon={<PaidIcon/>}
                    variant={3}
                    title="Em Processamento"
                    value={formatCurrency(totalSales.pending)}
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
              <Typography variant="h6" className="text-black poppins fw-bold ms-3 mb-1">
                Vendas da última semana
              </Typography>
              <Typography variant="h7" className="text-black-50 poppins fw-bold ms-3 mb-3">
                Total: {formatCurrency(totalWeekSales)}
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
                  <Bar dataKey="Pago" stackId="a" fill="#1e87e3"/>
                  <Bar dataKey="Pendente" stackId="a" fill="#f8eda3"/>
                  <Bar dataKey="Cancelado" stackId="a" fill="#f8a3a3"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          {/* =============== FIM GRAFICO DE BARRAS =============== */}

          {/* =============== INICIO ULTIMAS VENDAS =============== */}
          <Col xs={4}>
            <div className="bg-color-2 p-4 rounded-4">
              <Typography variant="h6" className="text-black poppins fw-bold ms-2 mb-3">
                Últimas Vendas
              </Typography>
              {lastOrders.map(order => (
                  <OrderCard
                      itemName={order.product.name}
                      userName={`${order.client.name} ${order.client.surname}`}
                      value={order.product.price}
                  />
              ))}
            </div>
          </Col>
          {/* =============== FIM ULTIMAS VENDAS =============== */}
        </Row>
      </BasePage>
  );
};
