import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../components/Auth';
import axios from 'axios';

function Home() {
    const [nome, setNome] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect (()=> {
        axios.get('http://localhost:5000/usuario', {withCredentials: true})
        .then(res => {
            setNome(res.data.data.nome)
        })
    })

    const logout = () => {
        axios.delete('http://localhost:5000/logout', {withCredentials:true})
            .then(res => {
                Auth.logout()
                setRedirect(true)
            })
    }

    return ( 
        <div className="container">   
            <div className="col-12">

                {redirect ?
                <Redirect to="/login"/>
                : null }
                
                <div className="row justify-content-start">
                    <div className="col-6 intro">Olá, {nome}!</div>
                </div>
                <div className="row justify-content-start">
                    <Link to="/editar" className="col-4 col-sm-3 col-md-2 mr-2 no-padding">
                        <div className="btn btn-success">
                                Editar dados
                        </div>
                    </Link>
                    <div className="col-3 col-sm-2 col-md-1 ml-2 no-padding">
                        <div className="btn btn-danger" onClick={logout}>
                                Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Home;