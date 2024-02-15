import React from 'react'
import logoDev from '../assets/darth.png';

function HomePage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                maxHeight: '100vh',
                overflowY: 'scroll',
                justifyContent: 'center',
                position: 'relative',
            }}
        >
            <h1 style={{ textAlign: 'center' }}>
                <strong>
                    Bienvenido a la web de coleccionistas de Star Wars
                </strong>
            </h1>
            <img
                src={logoDev}
                alt='logo'
                className='img-fluid'
                style={{
                    marginBottom: '2rem',
                }}
            />

        </div>
    )
}

export default HomePage