import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AlbumPage from './pages/AlbumPage';
import HomePage from './pages/HomePage';
import LaminasPage from './pages/LaminasPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/album' element={<AlbumPage />} />
            <Route path='/laminas' element={<LaminasPage />} />
        </Routes>
    )
}

export default AppRoutes;