import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editar from './components/Editar'
import Logout from './components/Logout'
import Cadastro from './components/Cadastro'
import Login from './components/Login'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <PrivateRoute path="/" exact={true} component={Home}/>
        <PublicRoute path="/cadastrar" component={Cadastro}/>
        <PrivateRoute path="/editar" component={Editar}/>
        <PublicRoute path="/login" component={Login}/>
        <PrivateRoute path="/logout" component={Logout} />
    </Switch>
</BrowserRouter>,document.getElementById('root'));