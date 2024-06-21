import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Layout from '../layouts/Layout';
import Navbar from '../components/Client/Navbar/Navbar';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/home' element={<Navbar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Other routes for users */}
      </Route>
    </Routes>
  );
};

export default UserRoutes;
