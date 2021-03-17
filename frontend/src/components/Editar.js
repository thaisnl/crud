import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Auth from './Auth';

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
    const [alterado, setAlterado] = useState({foiAlterado: false, msgEdicao:""})
    const [prevUsuario, setPrevUsuario] = useState({})
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setAlterado({foiAlterado: false, msgEdicao: ""})
        setRedirect(false)
        axios.get('http://localhost:5000/usuario', {withCredentials:true})
            .then(res => {
                console.log(res.data.data)
                const usuarioGet = res.data.data;
                usuarioGet.senha_atual = ""
                usuarioGet.nova_senha = ""
                setUsuario(usuarioGet)
                setPrevUsuario(usuarioGet)
            }).catch(err => {
                setAlterado({deuErro: true, msgErro:""})
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
                setAlterado({foiAlterado:true, msgEdicao:"Usuário alterado com sucesso!"})
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
        setErro({deuErro: false, msgErro:""});
        setAlterado({foiAlterado:false, msgEdicao:""})
    }

    return ( 
        <div className="container">  
            <form onSubmit={enviarForm} className="col-12">
                <p className="text-center nome-form">Edição dos dados cadastrais</p> 
                {erro.deuErro ?
                <div className="row justify-content-center">
                    <div className="alert alert-danger text-center col-10 col-sm-6" role="alert">
                        {erro.msgErro}
                    </div>
                </div>
                :  null}
                {alterado.foiAlterado ?
                <div className="row justify-content-center">
                    <div className="alert alert-success text-center col-10 col-sm-6" role="alert">
                        {alterado.msgEdicao}
                    </div>
                </div>
                :  null}
                {redirect ?
                <Redirect to="/login"/>
                : null }
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="nome">Nome</label>
                        <input name="nome"
                                id="nome"
                                value={usuario.nome}
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, nome:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="pis">PIS</label>
                        <input name="pis"
                                id="pis"
                                value={usuario.pis}
                                disabled="disabled"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, pis:e.target.value})}} />
                    </div>
                    <div className="col-5 col-sm-3">
                        <label for="cpf">CPF</label>
                            <input name="cpf" 
                                value={usuario.cpf}
                                id="cpf"
                                className="form-control"
                                disabled="disabled"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, cpf:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="email">E-mail</label>
                        <input name="email"
                                id="email"
                                value={usuario.email}
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, email:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="rua">Rua</label>
                        <input name="rua"
                                id="rua"
                                value={usuario.rua}
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, rua:e.target.value})}} />
                    </div>
                    <div className="col-2 col-sm-1">
                        <label for="numero">Nº</label>
                            <input name="numero" 
                                value={usuario.numero}
                                id="numero"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, numero:e.target.value})}} />
                    </div>
                    <div className="col-3 col-sm-2">
                        <label for="complemento">Complemento</label>
                            <input name="complemento" 
                                value={usuario.complemento}
                                id="complemento"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, complemento:e.target.value})}}/>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="cep">CEP</label>
                        <input name="cep"
                                id="cep"
                                value={usuario.cep}
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, cep:e.target.value})}} />
                    </div>
                    <div className="col-5 col-sm-3">
                        <label for="estado">Estado</label>
                            <input name="estado" 
                                value={usuario.estado}
                                id="estado"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, estado:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="municipio">Município</label>
                        <input name="municipio" 
                                value={usuario.municipio}
                                id="municipio"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, municipio:e.target.value})}} />
                    </div>
                    <div className="col-5 col-sm-3">
                        <label for="pais">País</label>
                        <input name="pais" 
                                value={usuario.pais}
                                id="pais"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, pais:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="senha_atual">Senha atual</label>
                        <input name="senha_atual" 
                                value={usuario.senha_atual}
                                id="senha_atual"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, senha_atual:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="nova_senha">Nova senha</label>
                        <input name="nova_senha" 
                                value={usuario.nova_senha}
                                id="nova_senha"
                                className="form-control"
                                onChange={(e) => {
                                    limparAlertas()
                                    setUsuario({...usuario, nova_senha:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row px-3 justify-content-center">
                    <button type="submit" className="btn btn-success mt-3 col-10 col-sm-6">
                        Confirmar alterações
                    </button>
                </div>
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
            </form>
        </div>  
    );
}

export default Editar;