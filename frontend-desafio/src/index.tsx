import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ConfigProvider} from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ConfigProvider locale={ptBR}>
      <App />      
    </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);