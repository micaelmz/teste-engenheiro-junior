import React from 'react';
import {Routes, Route} from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeDashboard from './pages/dashboard/HomeDashboard';
import ProductsDashboard from './pages/dashboard/ProductsDashboard';
import ClientsDashboard from "./pages/dashboard/ClientsDashboard";
import OrdersDashboard from "./pages/dashboard/OrdersDashboard";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<HomeDashboard />}/>
        <Route path="/dashboard/products" element={<ProductsDashboard />}/>
        <Route path="/dashboard/clients" element={<ClientsDashboard />}/>
        <Route path="/dashboard/orders" element={<OrdersDashboard />}/>
      </Routes>
  );
}

export default App;