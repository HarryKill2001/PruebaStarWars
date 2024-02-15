import React, { useEffect, useState } from 'react'

function AlbumPage() {
    const [mostrarSeccion, setMostrarSeccion] = useState(0);
    const [album, setAlbum] = useState({});

    useEffect(() => {
        const albumGuardado = JSON.parse(localStorage.getItem('MiAlbum'));
        if (albumGuardado) {
            setAlbum(albumGuardado);
        } else {
            const nuevoAlbum = { peliculas: [], personajes: [], naves: [] };
            setAlbum(nuevoAlbum);
            localStorage.setItem('MiAlbum', JSON.stringify(nuevoAlbum));
        }
    }, []);

    const generarLaminas = (num) => {
        const laminas = Array.from({ length: num }, (_, index) =>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
                <div className="card lamina border-left-primary shadow py-2" >
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <p className="card-text">
                            <h4 className='text-muted'>#{index + 1}</h4>
                        </p>
                    </div>
                </div>
            </div>
        )

        return laminas;
    }

    return (
        <div
            style={{
                flex: '1 1 auto',
                display: 'flex',
                margin: '12px',
                flexFlow: 'column'
            }}
        >
            <div className="btn-group m-4" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={() => setMostrarSeccion(0)}>Películas</button>
                <button type="button" className="btn btn-secondary" onClick={() => setMostrarSeccion(1)}>Personajes</button>
                <button type="button" className="btn btn-primary" onClick={() => setMostrarSeccion(2)}>Naves</button>
            </div>

            {mostrarSeccion == 0 ?
                (<div className="row">
                    <h2>Películas</h2>
                    {generarLaminas(6)}
                </div>) :
                mostrarSeccion == 1 ?
                    (<div className="row">
                        <h2>Personajes</h2>
                        {generarLaminas(82)}
                    </div>) : (<div className="row">
                        <h2>Naves</h2>
                        {generarLaminas(36)}
                    </div>)}

        </div>
    )
}

export default AlbumPage