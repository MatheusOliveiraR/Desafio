import React from 'react';
import {  Layout, Menu, theme } from 'antd';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Body from './Body/BodyRegister';
import BodyList from './Body/BodyList';

const { Header, Footer } = Layout;

const App: React.FC = () => {  
  const {
  } = theme.useToken();


  
  const navigate = useNavigate();

  return (  
    <Layout className="layout">
        <div className="logo" />
        <Menu
        onClick={({key})=>{
          navigate(key)

        }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[window.location.pathname]}          
          items={[
            {label: "Cadastro", key: "/register"},
            {label: "Listar, Deletar e Atualizar", key: "/list"},
          ]}
        ></Menu>
        <Content/>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

function Content(){
  return <div>
    <Routes>
      <Route path="/register" element={<div><Body/></div>}></Route> 
      <Route path="/list" element={<div><BodyList/></div>}></Route>
      <Route path="/" element={<Navigate to="/register"/>} />
    </Routes>
  </div>
}

export default App;