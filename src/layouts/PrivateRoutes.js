import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    let token = localStorage.getItem('access_token') || false;
    // let roles = localStorage.getItem('roles') || false;
    // console.log("check FFF=>", token)
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes