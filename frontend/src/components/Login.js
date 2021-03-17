import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from './Auth';
import axios from 'axios';

function Login() {
    const [usuario, setUsuario] = useState({login: "", senha:""})
    const [erro, setErro] = useState({erro: false, msgErro: ""})
    const [redirect, setRedirect] = useState(false)

    const enviarForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', usuario, {withCredentials: true})
            .then(res => {
                const {token, expDate} = res.data.data;
                Auth.login(token, expDate)
                setRedirect(true)
            })
            .catch(err => {
                if (err.response){
                    setErro({deuErro:true, msgErro: err.response.data.message})
                }
            })
    }

    const limparAlertas = () => {
        setErro({deuErro: false, msgErro: ""})
    }

    return ( 
        <div className="container">   
            <form onSubmit={enviarForm} className="col-12">
                <p className="text-center saudacao">Olá, visitante!</p>
                {erro.deuErro ?
                <div className="form-row justify-content-center">
                    <div className="alert alert-danger text-center col-8 col-sm-4" role="alert">
                        {erro.msgErro}
                    </div>
                </div>
                :  null}
                {redirect ?
                <Redirect to="/"/>
                : null}
                <div className="form-row justify-content-center">
                    <div className="col-8 col-sm-4">
                        <label for="login">Login</label>
                        <input name="login"
                                id="login"
                                value={usuario.id}
                                className="form-control"
                                onChange={(e) => {limparAlertas()
                                    setUsuario({...usuario, login:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-8 col-sm-4">
                        <label for="senha">Senha</label>
                        <input name="senha"
                                id="senha"
                                value={usuario.senha}
                                className="form-control"
                                onChange={(e) => { limparAlertas()
                                    setUsuario({...usuario, senha:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row px-3 justify-content-center">
                    <button type="submit" className="btn btn-success mt-4 col-8 col-sm-4">
                        Entrar
                    </button>
                </div>
                <Link to="/cadastrar">
                    <div className="form-row px-3 justify-content-center">
                            <button className="btn btn-primary mt-3 col-8 col-sm-4">
                                Quero me cadastrar
                            </button>
                    </div>
                </Link>
            </form>
        </div>  
    );
}

export default Login;