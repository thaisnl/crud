import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [usuario, setUsuario] = useState({login: "", senha:""})
    const [erro, setErro] = useState({erro: false, msgErro: ""})
    const [redirect, setRedirect] = useState(false)

    const enviarForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', usuario, {withCredentials: true})
            .then(res => {
                setRedirect(true)
            })
            .catch(err => {
                if (err.response){
                    setErro({deuErro:true, msgErro: err.response.data.message})
                }
            })
    }


    return ( 
        <div className="container">   
            <form onSubmit={enviarForm} className="col-12">
                <div className="row justify-content-center text-center">
                    <div className="col-6 intro">Olá, visitante!</div>
                </div>
                {erro.deuErro ?
                <div className="row justify-content-center">
                    <div className="alert alert-danger col-4" role="alert">
                        {erro.msgErro}
                    </div>
                </div>
                :  null}
                {redirect ?
                <Redirect to="/home"/>
                : null }
                <div className="form-row justify-content-center">
                    <div className="col-6 col-sm-4">
                        <label for="login">Login</label>
                        <input name="login"
                                id="login"
                                value={usuario.id}
                                className="form-control"
                                onChange={(e) => {setErro({deuErro: false, msgErro: ""})
                                    setUsuario({...usuario, login:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-6 col-sm-4">
                        <label for="senha">Senha</label>
                        <input name="senha"
                                id="senha"
                                value={usuario.senha}
                                className="form-control"
                                onChange={(e) => { setErro({deuErro: false, msgErro: ""})
                                    setUsuario({...usuario, senha:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row px-3 justify-content-center">
                    <button type="submit" className="btn btn-success mt-4 col-6 col-sm-4">
                        Entrar
                    </button>
                </div>
                <Link to="/cadastrar">
                    <div className="form-row px-3 justify-content-center">
                            <button className="btn btn-primary mt-3 col-6 col-sm-4">
                                Quero me cadastrar
                            </button>
                    </div>
                </Link>
            </form>
        </div>  
    );
}

export default Login;