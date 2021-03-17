import React from 'react';

function FormCadastro(props) {

    return ( 
            <form onSubmit={props.enviarForm}> 
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="nome">Nome</label>
                        <input name="nome"
                                id="nome"
                                value={props.usuario.nome}
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, nome:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="pis">PIS</label>
                        <input name="pis"
                                id="pis"
                                value={props.usuario.pis}
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, pis:e.target.value})}} />
                    </div>
                    <div className="col-5 col-sm-3">
                        <label for="cpf">CPF</label>
                            <input name="cpf" 
                                value={props.usuario.cpf}
                                id="cpf"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, cpf:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="email">E-mail</label>
                        <input name="email"
                                id="email"
                                value={props.usuario.email}
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, email:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="rua">Rua</label>
                        <input name="rua"
                                id="rua"
                                value={props.usuario.rua}
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, rua:e.target.value})}} />
                    </div>
                    <div className="col-2 col-sm-1">
                        <label for="numero">Nº</label>
                            <input name="numero" 
                                value={props.usuario.numero}
                                id="numero"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, numero:e.target.value})}} />
                    </div>
                    <div className="col-3 col-sm-2">
                        <label for="complemento">Complemento</label>
                            <input name="complemento" 
                                value={props.usuario.complemento}
                                id="complemento"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, complemento:e.target.value})}}/>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="cep">CEP</label>
                        <input name="cep"
                                id="cep"
                                value={props.usuario.cep}
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, cep:e.target.value})}} />
                    </div>
                    <div className="col-5 col-sm-3">
                        <label for="estado">Estado</label>
                            <input name="estado" 
                                value={props.usuario.estado}
                                id="estado"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, estado:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-5 col-sm-3">
                        <label for="municipio">Município</label>
                        <input name="municipio" 
                                value={props.usuario.municipio}
                                id="municipio"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, municipio:e.target.value})}} />
                    </div>
                    <div className="col-5 col-sm-3">
                        <label for="pais">País</label>
                        <input name="pais" 
                                value={props.usuario.pais}
                                id="pais"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, pais:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-10 col-sm-6">
                        <label for="senha">Senha</label>
                        <input name="senha" 
                                value={props.usuario.senha}
                                id="senha"
                                className="form-control"
                                onChange={(e) => {
                                    props.limparAlertas()
                                    props.setUsuario({...props.usuario, senha:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row px-3 justify-content-center">
                    <button type="submit" className="btn btn-success mt-2 col-10 col-sm-6">
                        Confirmar cadastro
                    </button>
                </div>
            </form>);
}

export default FormCadastro;