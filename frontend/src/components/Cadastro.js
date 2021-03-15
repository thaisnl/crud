import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Editar(props) {
    const [nome, setNome] = useState("");
    const [pis, setPis] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [rua, setRua] = useState("");
    const [complemento, setComplemento] = useState("");
    const [pais, setPais] = useState("");
    const [estado, setEstado] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [senha, setSenha] = useState("");
    const [numero, setNumero] = useState("");
    const [cep, setCep] = useState("");

    const enviarForm = (e) => {
        e.preventDefault();
        //api.login(email, password);
    }

    return ( 
        <div className="container">   
            <form onSubmit={enviarForm} className="col-12">
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <label for="nome">Nome</label>
                        <input name="nome"
                                id="nome"
                                value={nome}
                                className="form-control"
                                onChange={(e) => setNome(e.target.value)} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="pis">PIS</label>
                        <input name="pis"
                                id="pis"
                                value={pis}
                                className="form-control"
                                onChange={(e) => setPis(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <label for="cpf">CPF</label>
                            <input name="cpf" 
                                value={cpf}
                                id="cpf"
                                className="form-control"
                                onChange={(e) => setCpf(e.target.value)} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <label for="email">E-mail</label>
                        <input name="email"
                                id="email"
                                value={email}
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="rua">Rua</label>
                        <input name="rua"
                                id="rua"
                                value={rua}
                                className="form-control"
                                onChange={(e) => setRua(e.target.value)} />
                    </div>
                    <div className="col-1">
                        <label for="numero">Número</label>
                            <input name="numero" 
                                value={numero}
                                id="numero"
                                className="form-control"
                                onChange={(e) => setNumero(e.target.value)} />
                    </div>
                    <div className="col-2">
                        <label for="complemento">Complemento</label>
                            <input name="complemento" 
                                value={complemento}
                                id="complemento"
                                className="form-control"
                                onChange={(e) => setComplemento(e.target.value)} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="cep">CEP</label>
                        <input name="cep"
                                id="cep"
                                value={cep}
                                className="form-control"
                                onChange={(e) => setCep(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <label for="estado">Estado</label>
                            <input name="estado" 
                                value={estado}
                                id="estado"
                                className="form-control"
                                onChange={(e) => setEstado(e.target.value)} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-3">
                        <label for="municipio">Município</label>
                        <input name="municipio" 
                                value={municipio}
                                id="municipio"
                                className="form-control"
                                onChange={(e) => setMunicipio(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <label for="pais">País</label>
                        <input name="pais" 
                                value={pais}
                                id="pais"
                                className="form-control"
                                onChange={(e) => setPais(e.target.value)} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-6">
                        <label for="senha">Senha</label>
                        <input name="senha" 
                                value={senha}
                                id="senha"
                                className="form-control"
                                onChange={(e) => setSenha(e.target.value)} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button type="submit" className="btn btn-success mt-2 col-6">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>  
    );
}

export default Editar;