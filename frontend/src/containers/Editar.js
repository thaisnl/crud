import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Alerta from '../components/Alerta'
import FormEditar from '../components/FormEditar'

function Editar() {
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
        senha_atual: "",
        nova_senha: "",
        numero: "",
        cep: ""
    });

    const [erro, setErro] = useState({deuErro: false, msgErro:""})
    const [editado, setEditado] = useState({foiEditado: false, msgEdicao:""})
    const [prevUsuario, setPrevUsuario] = useState({})
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setEditado({foiEditado: false, msgEdicao: ""})
        setRedirect(false)
        axios.get('http://localhost:5000/usuario', {withCredentials:true})
            .then(res => {
                const usuarioGet = res.data.data;
                usuarioGet.senha_atual = ""
                usuarioGet.nova_senha = ""
                setUsuario(usuarioGet)
                setPrevUsuario(usuarioGet)
            }).catch(err => {
                setEditado({deuErro: true, msgErro:""})
            })
    }, [])

    const enviarForm = (e) => {
        e.preventDefault();
        setErro({deuErro: false, msgErro: ""})
    
        const usuarioEditado = {};
        
        for (let [chave, valor] of Object.entries(usuario)) {
            if(usuario[chave] != prevUsuario[chave]){
                usuarioEditado[chave] = valor
            }
            
        }
    
        axios.patch('http://localhost:5000/editar', usuarioEditado, {withCredentials:true})
            .then(res => {
                setEditado({foiEditado:true, msgEdicao:"Usuário editado com sucesso!"})
            })
            .catch(err => {
                setErro({deuErro:true, msgErro: err.response.data.message})
            })
    }

    const deletarUsuario = () => {
        setRedirect(false)
        setErro({deuErro: false, msgErro:""})

        axios.delete('http://localhost:5000/remover', {withCredentials:true})
            .then(res => {
                setRedirect(true)
            }).catch(err => {
                setErro({deuErro: true, msgErro:"Erro na remoção do usuário"})
            })
    }

    const limparAlertas = () => {
        setErro({deuErro: false, msgErro: ""})
        setEditado({foiEditado:false, msgEdicao:""})
    }


    return ( 
        <div className="container">
            {redirect ?
            <Redirect to="/login"/>
            : null }  
            <div className="col-12">
                <p className="text-center nome-form">Edição dos dados cadastrais</p> 

                {erro.deuErro ?
                <Alerta msg={erro.msgErro} tipo="danger" xs={10} sm={6}/>
                :  null}

                {editado.foiEditado ?
                <Alerta msg={editado.msgEdicao} tipo="success" xs={10} sm={6}/>
                :  null}

                <FormEditar
                    setUsuario={setUsuario}
                    usuario={usuario}
                    enviarForm={enviarForm}
                    limparAlertas={limparAlertas}
                />

                <div className="form-row px-3 justify-content-center">
                    <button onClick={deletarUsuario} className="btn btn-danger mt-3 col-10 col-sm-6">
                        Deletar conta
                    </button>
                </div>

                <Link to="/" className="form-row px-3 justify-content-center">
                    <button className="btn btn-primary mt-3 col-10 col-sm-6">
                        Voltar
                    </button>
                </Link>

            </div>
        </div>  
    );
}

export default Editar;