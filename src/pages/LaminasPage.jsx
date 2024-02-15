import React, { useEffect, useState } from 'react';
import Sobre from '../components/Sobre';
import axios from 'axios';
import Lamina from '../components/Lamina';

function LaminasPage() {
    const [sobresBloqueados, setSobresBloqueados] = useState([false, false, false, false]);
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const [seleccionoSobre, setSeleccionoSobre] = useState(false);
    const [sobreObtenido, setSobreObtenido] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const temporizador = setInterval(() => {
            if (tiempoRestante > 0) {
                setTiempoRestante(tiempoRestante - 1);
            }
        }, 1000);

        return () => clearInterval(temporizador);
    }, [tiempoRestante]);

    const bloquearSobresTemporizado = () => {
        setSobresBloqueados([true, true, true, true]);
        setTiempoRestante(60);
        setTimeout(() => {
            setSobresBloqueados([false, false, false, false]);
            setTiempoRestante(0);
        }, 60000);
    };

    const obtenerSobre = async (indiceSobre) => {
        if (!sobresBloqueados[indiceSobre]) {
            bloquearSobresTemporizado();

            try {
                const obtenerElementoAleatorio = async (url, maximo) => {
                    let elementoAleatorio = null;
                    while (!elementoAleatorio) {
                        try {
                            const idAleatorio = Math.floor(Math.random() * maximo) + 1;
                            const respuesta = await axios.get(`${url}/${idAleatorio}/`);
                            if (respuesta.status === 200) {
                                elementoAleatorio = respuesta.data;
                            }
                        } catch (error) {
                            if (error.response.status === 404) {
                                console.error("Recurso no encontrado");
                            } else {
                                console.error("Ha ocurrido un error", error);
                            }
                        }
                    }
                    return elementoAleatorio;
                };

                // Seleccionar aleatoriamente entre las configuraciones 1 y 2
                const configuracionAleatoria = Math.random() < 0.5 ? 1 : 2;

                let laminasSobre = [];

                if (configuracionAleatoria === 1) {
                    let peliculaAleatoria = await obtenerElementoAleatorio('https://swapi.dev/api/films', 6);
                    laminasSobre.push(peliculaAleatoria);
                    for (let i = 0; i < 3; i++) {
                        const personajeAleatorio = await obtenerElementoAleatorio('https://swapi.dev/api/people', 82);
                        laminasSobre.push(personajeAleatorio);
                    }
                    const naveAleatoria = await obtenerElementoAleatorio('https://swapi.dev/api/starships', 36);
                    laminasSobre.push(naveAleatoria);
                } else {
                    for (let i = 0; i < 3; i++) {
                        const personajeAleatorio = await obtenerElementoAleatorio('https://swapi.dev/api/people', 82);
                        laminasSobre.push(personajeAleatorio);
                    }
                    for (let i = 0; i < 2; i++) {
                        const naveAleatoria = await obtenerElementoAleatorio('https://swapi.dev/api/starships', 36);
                        laminasSobre.push(naveAleatoria);
                    }
                }

                setSobreObtenido(laminasSobre);
                setSeleccionoSobre(true);
                console.log(laminasSobre);
            } catch (error) {
                console.error('Error al realizar la consulta:', error);
            }
        }
    };

    return (
        <div
            style={{
                flex: '1 1 auto',
                display: 'flex',
                margin: '12px'
            }}
        >
            <div className="container-fluid">
                <div className="row">
                    {[1, 2, 3, 4].map((sobre, index) => (
                        <Sobre
                            key={sobre}
                            name={`Sobre ${sobre}`}
                            abrirSobre={() => obtenerSobre(index)}
                            bloqueado={sobresBloqueados[index]}
                            tiempoRestante={tiempoRestante}
                        />
                    ))}
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12">

                        {seleccionoSobre ? (
                            <div className="card shadow mb-4">

                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Contenido del Sobre</h6>
                                </div>


                                <div className="card-body p-4">
                                    <div className="row">

                                        {sobreObtenido.length > 0 ? (
                                            sobreObtenido.map((lamina, idx) => (
                                                <Lamina key={idx} datos={lamina} />
                                            ))
                                        ) : null}


                                    </div>
                                </div>
                            </div>) :
                            (<h2>No se ha seleccionado sobre</h2>)}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LaminasPage;
