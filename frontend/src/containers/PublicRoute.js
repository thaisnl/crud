import React, {Component} from 'react';
import Auth from '../components/Auth';
import {Redirect, Route} from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
                Auth.getAuth() ? 
                (<Redirect to='/'/>)
                : (<Component {...props} />)}
    />
);

export default PublicRoute;
