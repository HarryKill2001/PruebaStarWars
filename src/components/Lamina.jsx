import React from 'react'

function Lamina({ laminaVacia, mostrarLamina, laminaAlbum, datos }) {

    const determinarTipoLamina = (datos) => {
        let tipo = '';
        if (datos.title) {
            tipo = 'peliculas';
        } else if (datos.model) {
            tipo = 'naves';
        } else if (datos.name) {
            tipo = 'personajes';
        } else {
            console.log(laminaVacia, datos)
            throw new Error('Tipo de lámina no válido');
        }
        datos.tipo = tipo;
        return tipo;
    }

    const extraerID = (url) => {
        const partesUrl = url.split("/");
        const id = parseInt(partesUrl[partesUrl.length - 2]);
        datos.id = id;
        return id;
    }

    const agregarAlAlbum = (tipoLamina, id) => {
        let albumGuardado = JSON.parse(localStorage.getItem('MiAlbum'));
        albumGuardado[tipoLamina].push(id);
        console.log(albumGuardado)
        localStorage.setItem('MiAlbum', JSON.stringify(albumGuardado));
    }

    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="card lamina border-bottom-primary shadow py-2" >
                    {!laminaVacia
                        ? (<div className="card-body"><h5 className="card-title">{determinarTipoLamina(datos)}</h5>
                            <p className="card-text">
                                <span>Lámina <strong>#{extraerID(datos.url)}</strong></span>
                                <br />
                                {datos.tipo === 'peliculas' ?
                                    <span>Título: {datos.title}</span> :
                                    <span>Nombre: {datos.name}</span>
                                }
                            </p>
                            {
                                laminaAlbum
                                    ? <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalInfo" onClick={mostrarLamina(datos)}>Ver más</a>
                                    : <a className="btn btn-primary" onClick={() => agregarAlAlbum(datos.tipo, datos.id)}>Agregar al Álbum</a>
                            }
                        </div>)
                        : (<div className="card-body d-flex align-items-center justify-content-center"><h4 className='text-muted'>#{datos.id}</h4></div>)}
                </div>
            </div>

        </>
    )
}

export default Lamina