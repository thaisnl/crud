import React, {useState} from 'react';
import axios from 'axios';
import FormCadastro from '../components/FormCadastro'
import Alerta from '../components/Alerta'
import { Link } from 'react-router-dom';

function Cadastro() {
    const [usuario, setUsuario] = useState({
        nome: "",
        pis: "",
        cpf: "",
        email: "",
        rua: "",
        complemento: "",
        pais: "",
        estado: "",
        municipio: "",
        senha: "",
        numero: "",
        cep: ""
    });
    
    const [erro, setErro] = useState({deuErro: false, msgErro:""})
    const [cadastrado, setCadastrado] = useState({foiCadastrado: false, msgCadastro:""})

    const enviarForm = (e) => {
        e.preventDefault();
        setErro({deuErro: false, msgErro: ""})
    
        axios.post('http://localhost:5000/cadastrar', usuario, {withCredentials:true})
            .then(res => {
                setCadastrado({foiCadastrado:true, msgCadastro:"Usuário cadastrado com sucesso!"})
            })
            .catch(err => {
                setErro({deuErro:true, msgErro: err.response.data.message})
            })
    }

    const limparAlertas = () => {
        setErro({deuErro: false, msgErro: ""})
        setCadastrado({foiCadastrado:false, msgCadastro:""})
    }

    return ( 
        <div className="container">  
            <div className="col-12">
                <p className="text-center nome-form">Cadastro de usuário</p>
                <p className="text-center">(*) Campo obrigatório</p> 

                {erro.deuErro ?
                <Alerta msg={erro.msgErro} tipo="danger" xs={10} sm={6}/>
                :  null}

                {cadastrado.foiCadastrado ?
                <Alerta msg={cadastrado.msgCadastro} tipo="success" xs={10} sm={6}/>
                :  null}

                <FormCadastro
                    setUsuario={setUsuario}
                    usuario={usuario}
                    enviarForm={enviarForm}
                    limparAlertas={limparAlertas}
                />

                <Link to='/login' className="form-row px-3 justify-content-center">
                    <div className="btn btn-primary mt-2 col-10 col-sm-6">
                        Voltar para o login
                    </div>
                </Link>

            </div>
        </div>  
    );
}

export default Cadastro;