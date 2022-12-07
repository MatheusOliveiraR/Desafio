import ReactDOM from 'react-dom/client';
import App from './App';
import {ConfigProvider} from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';

const root=ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
    <ConfigProvider locale={ptBR}>
      <App />      
    </ConfigProvider>
    </BrowserRouter>
);