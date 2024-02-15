import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import AppRoutes from './Routes';

function App() {

  useEffect(() => {
    localStorage.setItem("MiAlbum", JSON.stringify({peliculas: [], personajes: [], naves: []}))
  }, [])

  return (
    <>
      <Router>
        <div id='wrapper'>
          <Sidebar />

          <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

              <AppRoutes />

            </div>

          </div>
        </div>
      </Router>
    </>
  )
}

export default App
