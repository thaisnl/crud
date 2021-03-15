import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

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
        senha: "",
        numero: "",
        cep: ""
    });

    const [erro, setErro] = useState({deuErro: false, msgErro:""})
    const [alterado, setAlterado] = useState({foiAlterado: false, msgEdicao:""})
    const [prevUsuario, setPrevUsuario] = useState({})
    const [redirect, setRedirect] = useState(false)

    useEffect(async () => {
        setAlterado({foiAlterado: false, msgEdicao: ""})
        setRedirect(false)
        axios.get('http://localhost:5000/', {withCredentials:true})
            .then(res => {
                console.log(res.data.data)
                const usuarioGet = res.data.data;
                const u = usuario
                u.nome = usuarioGet.nome
                u.cep = usuarioGet.cep
                u.complemento = usuarioGet.complemento
                u.cpf = usuarioGet.cpf
                u.email = usuarioGet.email
                u.estado = usuarioGet.estado
                u.municipio = usuarioGet.municipio
                u.pais = usuarioGet.pais
                u.numero = usuarioGet.numero
                u.pis = usuarioGet.pis
                u.rua = usuarioGet.rua
                setUsuario(u)
                setPrevUsuario(usuario)
            }).catch(err => {
                setAlterado({deuErro: true, msgErro:""})
                setRedirect(true)
                console.log(typeof(erro.msgErro))
            })
    }, [])

    useEffect(()=>{
        console.log(usuario)
    },[usuario])

    const enviarForm = (e) => {
        e.preventDefault();
        setErro({deuErro: false, msgErro: ""})
    
        const usuarioEditado = {};

        for (let [chave, valor] of Object.entries(prevUsuario)) {
            if(usuario[chave] != prevUsuario[chave]){
                usuarioEditado[chave] = valor
            }
            
        }
    
        axios.patch('http://localhost:5000/editar', usuarioEditado, {withCredentials:true})
            .then(res => {
                setAlterado({foiAlterado:true, msgEdicao:"Usuário alterado com sucesso!"})
            })
            .catch(err => {
                setErro({deuErro:true, msgErro: err.response.data.message})
            })
    }

    const deletarUsuario = () => {
        setRedirect(false)
        setErro({deuErro: false, msgErro:""})

        axios.delete('http://localhost:5000/remover')
            .then(res => {
                setRedirect(true)
            }).catch(err => {
                setErro({deuErro: true, msgErro:"Erro na remoção do usuário"})
                //setRedirect(true)
            })
    }

    return ( 
        <div className="container">   
            <form onSubmit={enviarForm} className="col-12">
                {erro.deuErro ?
                <div className="row justify-content-center">
                    <div className="alert alert-danger col-6" role="alert">
                        {erro.msgErro}
                    </div>
                </div>
                :  null}
                {alterado.foiAlterado ?
                <div className="row justify-content-center">
                    <div className="alert alert-success col-6" role="alert">
                        {alterado.msgEdicao}
                    </div>
                </div>
                :  null}
                {redirect ?
                <Redirect to="/login"/>
                : null }
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <label for="nome">Nome</label>
                        <input name="nome"
                                id="nome"
                                value={usuario.nome}
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, nome:e.target.value})} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="pis">PIS</label>
                        <input name="pis"
                                id="pis"
                                value={usuario.pis}
                                disabled="disabled"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, pis:e.target.value})} />
                    </div>
                    <div className="col-3">
                        <label for="cpf">CPF</label>
                            <input name="cpf" 
                                value={usuario.cpf}
                                id="cpf"
                                className="form-control"
                                disabled="disabled"
                                onChange={(e) => setUsuario({...usuario, cpf:e.target.value})} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <label for="email">E-mail</label>
                        <input name="email"
                                id="email"
                                value={usuario.email}
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, email:e.target.value})} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="rua">Rua</label>
                        <input name="rua"
                                id="rua"
                                value={usuario.rua}
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, rua:e.target.value})} />
                    </div>
                    <div className="col-1">
                        <label for="numero">Número</label>
                            <input name="numero" 
                                value={usuario.numero}
                                id="numero"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, numero:e.target.value})} />
                    </div>
                    <div className="col-2">
                        <label for="complemento">Complemento</label>
                            <input name="complemento" 
                                value={usuario.complemento}
                                id="complemento"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, complemento:e.target.value})}/>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="cep">CEP</label>
                        <input name="cep"
                                id="cep"
                                value={usuario.cep}
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, cep:e.target.value})} />
                    </div>
                    <div className="col-3">
                        <label for="estado">Estado</label>
                            <input name="estado" 
                                value={usuario.estado}
                                id="estado"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, estado:e.target.value})} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="municipio">Município</label>
                        <input name="municipio" 
                                value={usuario.municipio}
                                id="municipio"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, municipio:e.target.value})} />
                    </div>
                    <div className="col-3">
                        <label for="pais">País</label>
                        <input name="pais" 
                                value={usuario.pais}
                                id="pais"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, pais:e.target.value})} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <label for="senha">Senha</label>
                        <input name="senha" 
                                value={usuario.senha}
                                id="senha"
                                className="form-control"
                                onChange={(e) => setUsuario({...usuario, senha:e.target.value})} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button type="submit" className="btn btn-primary mt-2 col-6">
                        Confirmar alterações
                    </button>
                </div>
                <div className="row justify-content-center">
                    <button onClick={deletarUsuario} className="btn btn-danger mt-2 col-6">
                        Deletar conta
                    </button>
                </div>
            </form>
        </div>  
    );
}

export default Editar;