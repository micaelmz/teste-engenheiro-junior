import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import maleUserIllustration from '../../assets/img/male-user-illustration.webp';
import {Typography} from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import SideMenu from "../../components/sideMenu";


export default function BasePage({children}) {

  return (
      <div className="bg-color-1 min-h-100 min-vh-100 m-0 p-0">
        <Container fluid>
          {/* =============== INICIO BARRA DE NAVEGAÇAO SUPERIOR =============== */}
          <Row className="p-4 mb-0 bg-color-2" style={{minHeight: "12vh"}}>
            <Col xs={2} className="d-flex align-items-center">
              <Link to="/dashboard" className="text-decoration-none d-flex">
                <StorefrontIcon className="text-color-1 my-auto me-2" style={{fontSize: "2rem"}}/>
                <Typography variant="h5" className="text-color-1 mt-1 text-center poppins fw-bolder fs-4">
                  ORDENAI
                </Typography>
              </Link>
            </Col>
            <Col xs={7} className="d-flex align-items-center">
              <input type="text" className="form-control" placeholder="Buscar"/>
            </Col>
            <Col xs={3} className="d-flex align-items-center justify-content-end">
              <img src={maleUserIllustration} alt="Usuário" className="rounded-circle" style={{width: "3rem"}}/>
            </Col>
          </Row>
          {/* =============== FIM BARRA DE NAVEGAÇAO SUPERIOR =============== */}
          <Row>
            {/* =============== INICIO MENU LATERAL =============== */}
            <Col xs={2} className="bg-color-1 d-flex bg-color-2" style={{minHeight: "88vh"}}>
              <SideMenu/>
            </Col>
            {/* =============== FIM MENU LATERAL =============== */}

            {/* =============== INICIO CONTEUDO =============== */}
            <Col xs={10} className="p-4">
              {children}
            </Col>
            {/* =============== FIM CONTEUDO =============== */}
          </Row>
        </Container>
      </div>
  );
};
