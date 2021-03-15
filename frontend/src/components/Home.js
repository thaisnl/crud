import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [nome, setNome] = useState("")

    useEffect (()=> {
        axios.get('http://localhost:5000/', {withCredentials: true})
        .then(res => {
            setNome(res.data.data.nome)
        }).catch(err => {
            console.log(err.response.data.message)
        })
    })

    return ( 
        <div className="container">   
            <div className="col-12">
                <div className="row justify-content-start">
                    <div className="col-6 intro">Olá, {nome}!</div>
                </div>
                <div className="row justify-content-start">
                    <div className="col-4 col-sm-3 col-md-2 mr-2 no-padding">
                        <Link to="/editar">
                            <div className="btn btn-success">
                                    Editar dados
                            </div>
                        </Link>
                    </div>
                    <div className="col-3 col-sm-2 col-md-1 ml-2 no-padding">
                        <Link to="/logout">
                            <div className="btn btn-danger">
                                    Logout
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Home;