import React, { useEffect } from 'react'

function Lamina({ datos }) {

    // useEffect(() => {
    //     determinarTipoLamina(datos);
    //     extraerID(datos.url);
    // }, [])

    const determinarTipoLamina = (datos) => {
        let tipo = '';
        if (datos.title) {
            tipo = 'Película';
        } else if (datos.model) {
            tipo = 'Nave';
        } else if (datos.name) {
            tipo = 'Personaje';
        } else {
            throw new Error('Tipo de lámina no válido');
        }
        datos.tipo = tipo;
        return tipo;
    }

    const extraerID = (url) => {
        const partesUrl = url.split("/");
        const id = partesUrl[partesUrl.length - 2];
        datos.id = id;
        return id;
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="card lamina border-left-primary shadow py-2" >
                <div className="card-body align-items-center justify-conten-center">
                    <h5 className="card-title">{determinarTipoLamina(datos)}</h5>
                    <p className="card-text">
                        <span>Lámina <strong>#{extraerID(datos.url)}</strong></span>
                        <br />
                        {datos.tipo === 'Película' ?
                            <span>Título: {datos.title}</span> :
                            <span>Nombre: {datos.name}</span>
                        }
                    </p>
                    <span></span>
                    <a href="#" className="btn btn-primary">Agregar al album</a>
                </div>
            </div>
        </div>
    )
}

export default Lamina