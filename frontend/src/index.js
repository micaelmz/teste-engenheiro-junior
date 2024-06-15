import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'primeicons/primeicons.css';
import {PrimeReactProvider} from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <PrimeReactProvider>
          <App/>
        </PrimeReactProvider>
      </BrowserRouter>
    </React.StrictMode>
);