import React from 'react';

function Sobre({ name, abrirSobre, bloqueado, tiempoRestante }) {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className={`card sobre border-left-primary shadow h-100 py-2 ${bloqueado ? 'sobre-bloqueado' : ''}`} onClick={abrirSobre}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Sobre</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{name}</div>
                            {bloqueado && (
                                <div className="text-xs text-gray-600 mt-2">
                                    Sobre bloqueado, se activará en {tiempoRestante} segundos
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sobre;
