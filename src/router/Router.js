import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import Update from '../page/update/Update';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='update' element={<Update />} />
        </Routes>
    );
};

export default Router;