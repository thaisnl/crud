import React from 'react';;

function FormLogin(props) {
    return ( 
            <form onSubmit={props.enviarForm}>
                <div className="form-row justify-content-center">
                    <div className="col-8 col-sm-4">
                        <label for="login">Login</label>
                        <input name="login"
                                id="login"
                                value={props.usuario.id}
                                className="form-control"
                                onChange={(e) => {props.limparAlertas()
                                    props.setUsuario({...props.usuario, login:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-8 col-sm-4">
                        <label for="senha">Senha</label>
                        <input name="senha"
                                id="senha"
                                type="password"
                                value={props.usuario.senha}
                                className="form-control"
                                onChange={(e) => { props.limparAlertas()
                                    props.setUsuario({...props.usuario, senha:e.target.value})}} />
                    </div>
                </div>
                <div className="form-row px-3 justify-content-center">
                    <button type="submit" className="btn btn-success mt-4 col-8 col-sm-4">
                        Entrar
                    </button>
                </div>
            </form>
    );
}

export default FormLogin;