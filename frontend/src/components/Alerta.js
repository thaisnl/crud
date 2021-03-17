import React from 'react';

function Alerta(props) {
    return ( 
            <div className="form-row justify-content-center">
                <div className={`alert alert-${props.tipo} text-center col-${props.xs} col-sm-${props.sm}`} role="alert">
                    {props.msg}
                </div>
            </div>
            );
}

export default Alerta;