import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editar from './components/Editar'
import Logout from './components/Logout'
import Cadastro from './components/Cadastro'
import Login from './components/Login'
import Home from './components/Home'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/home" exact={true} component={Home}/>
        <Route path="/cadastrar" component={Cadastro}/>
        <Route path="/editar" component={Editar}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout} />
    </Switch>
</BrowserRouter>,document.getElementById('root'));