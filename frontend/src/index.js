import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editar from './containers/Editar'
import Cadastro from './containers/Cadastro'
import Login from './containers/Login'
import Home from './containers/Home'
import PrivateRoute from './containers/PrivateRoute'
import PublicRoute from './containers/PublicRoute'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch} from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <PrivateRoute path="/" exact={true} component={Home}/>
        <PublicRoute path="/cadastrar" component={Cadastro}/>
        <PrivateRoute path="/editar" component={Editar}/>
        <PublicRoute path="/login" component={Login}/>
    </Switch>
</BrowserRouter>,document.getElementById('root'));
