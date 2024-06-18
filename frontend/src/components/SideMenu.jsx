import React from 'react';
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {Typography} from "@mui/material";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useLocation} from 'react-router-dom';


export default function SideMenu() {

  const location = useLocation();
  const currentPage = location.pathname

  return (
      <Row>
        <ul className="list-unstyled w-100" style={{minHeight: "86vh"}}>
          <Typography variant="h8" className="ms-1 text-xs font-medium text-black roboto">
            Dashboard
          </Typography>
          <li className={`px-3 py-2 ${currentPage === '/dashboard' ? 'bg-color-1-gradient' : 'bg-color-2'} w-100 rounded-3 my-1 hover-bg-color-1`}>
            <Link to="/dashboard" className="text-decoration-none text-black d-block p-2 d-flex">
              <DonutLargeOutlinedIcon className="text-color-1 me-3 my-auto"/>
              <Typography variant="h8" className="my-auto text-color-1 poppins fw-semibold">
                Dashboard
              </Typography>
            </Link>
          </li>
          <hr/>
          <Typography variant="h8" className="ms-1 text-xs font-medium text-black roboto">
            Páginas
          </Typography>
          <li className={`px-3 py-2 ${currentPage === '/dashboard/clients' ? 'bg-color-1-gradient' : 'bg-color-2'} w-100 rounded-3 my-1 hover-bg-color-1`}>
            <Link to="/dashboard/clients" className="text-decoration-none text-color-1 d-block p-2 d-flex">
              <PeopleOutlineIcon className="text-color-1 me-3 my-auto"/>
              <Typography variant="h8" className="my-auto text-color-1 poppins fw-semibold">
                Clientes
              </Typography>
            </Link>
          </li>
          <li className={`px-3 py-2 ${currentPage === '/dashboard/products' ? 'bg-color-1-gradient' : 'bg-color-2'} w-100 rounded-3 my-1 hover-bg-color-1`}>
            <Link to="/dashboard/products" className="text-decoration-none text-color-1 d-block p-2 d-flex">
              <LocalGroceryStoreOutlinedIcon className="text-color-1 me-3 my-auto"/>
              <Typography variant="h8" className="my-auto text-color-1 poppins fw-semibold">
                Produtos
              </Typography>
            </Link>
          </li>
          <li className={`px-3 py-2 ${currentPage === '/dashboard/orders' ? 'bg-color-1-gradient' : 'bg-color-2'} w-100 rounded-3 my-1 hover-bg-color-1`}>
            <Link to="/dashboard/orders" className="text-decoration-none text-color-1 d-block p-2 d-flex">
              <InventoryOutlinedIcon className="text-color-1 me-3 my-auto"/>
              <Typography variant="h8" className="my-auto text-color-1 poppins fw-semibold">
                Pedidos
              </Typography>
            </Link>
          </li>
          <hr/>
          <Link to="/">
            <div className="d-flex justify-content-center">
              <Button className="btn-color-1 bg-color-35 border-0 fw-semibold w-50" style={{
                height: "50px",
                marginTop: "2rem"
              }}>
                <LogoutOutlinedIcon/>
                Sair
              </Button>
            </div>
          </Link>
        </ul>
      </Row>
  );
}