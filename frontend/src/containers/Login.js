import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alerta from '../components/Alerta'
import FormLogin from '../components/FormLogin'
import Auth from '../components/Auth';
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
            <div className="col-12">
                <p className="text-center saudacao">Olá, visitante!</p>
                {erro.deuErro ?
                <Alerta msg={erro.msgErro} tipo="danger" xs={8} sm={4}/>
                :  null}
                {redirect ?
                <Redirect to="/"/>
                : null}
                <FormLogin
                usuario={usuario}
                setUsuario={setUsuario}
                limparAlertas={limparAlertas}
                enviarForm={enviarForm}
                />
                <Link to="/cadastrar">
                    <div className="form-row px-3 justify-content-center">
                            <button className="btn btn-primary mt-3 col-8 col-sm-4">
                                Quero me cadastrar
                            </button>
                    </div>
                </Link>
            </div>
        </div>  
    );
}

export default Login;