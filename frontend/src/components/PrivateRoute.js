import React, {Component} from 'react';
import Auth from './Auth';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
                Auth.getAuth() ? 
                (<Component {...props} />) : 
                (<Redirect to='/login'/>)}
    />
);

export default PrivateRoute;
