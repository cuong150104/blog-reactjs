import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            {/* Other admin routes */}
        </Routes>
    );
};

export default AdminRoutes;
