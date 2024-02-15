import React, { useEffect, useState } from 'react'
import Lamina from '../components/Lamina';
import axios from 'axios';

function AlbumPage() {
    const [mostrarSeccion, setMostrarSeccion] = useState(0);
    const [laminaSeleccionada, setLaminaSeleccionada] = useState({});
    const [listaLaminas, setListaLaminas] = useState([]);
    const totalPeliculas = 6;
    const totalPersonajes = 82;
    const totalNaves = 36;

    useEffect(() => {
        const albumGuardado = JSON.parse(localStorage.getItem('MiAlbum'));
        if (!albumGuardado) {
            const nuevoAlbum = { peliculas: [], personajes: [], naves: [] };
            localStorage.setItem('MiAlbum', JSON.stringify(nuevoAlbum));
        }
    }, []);

    useEffect(() => {
        setListaLaminas([]);
        const cargarLaminas = async () => {
            const tipoLamina = mostrarSeccion == 0 ? 'peliculas' : mostrarSeccion == 1 ? 'personajes' : 'naves';
            const total = mostrarSeccion == 0 ? totalPeliculas : mostrarSeccion == 1 ? totalPersonajes : totalNaves;

            let laminas = [];
            let lamina = null;
            for (let i = 1; i <= total; i++) {
                let datosLamina = { id: i };
                const estaEnAlbumBool = estaEnAlbum(tipoLamina, i);
                if (estaEnAlbumBool) {
                    datosLamina = await obtenerDatosLamina(tipoLamina, i)
                    lamina = <Lamina key={i} laminaVacia={!estaEnAlbumBool} mostrarLamina={mostrarLamina} laminaAlbum={true} datos={datosLamina} />
                }
                lamina = <Lamina key={i} laminaVacia={!estaEnAlbumBool} mostrarLamina={mostrarLamina} laminaAlbum={true} datos={datosLamina} />
                laminas.push(lamina);
            }
            setListaLaminas(laminas);
        }
        cargarLaminas();
    }, [mostrarSeccion]);

    const mostrarLamina = (datos) => {
        setLaminaSeleccionada(datos);
      };

    const estaEnAlbum = (tipoLamina, id) => {
        const albumGuardado = JSON.parse(localStorage.getItem('MiAlbum'));
        return albumGuardado[tipoLamina].includes(id);
    }

    const obtenerDatosLamina = async (tipoLamina, id) => {
        const url = tipoLamina === 'peliculas' ? 'https://swapi.dev/api/films' : tipoLamina === 'personajes' ? 'https://swapi.dev/api/people' : 'https://swapi.dev/api/starships';
        try {
            const respuesta = await axios.get(`${url}/${id}/`);
            if (respuesta.status == 200) {
                console.log(respuesta.data)
                return respuesta.data;
            }
        } catch (error) {
            console.error("Ha ocurrido un error", error);
        }
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
                </div>) :
                mostrarSeccion == 1 ?
                    (<div className="row">
                        <h2>Personajes</h2>
                    </div>) : (<div className="row">
                        <h2>Naves</h2>
                    </div>)}

            <div className="row">
                {listaLaminas.map(lamina => lamina)}
            </div>

            <div class="modal fade " id="modalInfo" tabindex="-1" aria-labelledby="modalInfoLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{ overflowY: 'auto' }}>
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalInfoLabel">Información Adicional</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul>
                                {laminaSeleccionada
                                    ? Object.keys(laminaSeleccionada).map((key, index) => <li key={index}>{key}: {laminaSeleccionada[key]}</li>) : null
                                }
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AlbumPage