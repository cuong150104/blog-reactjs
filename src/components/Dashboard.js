import React, { useEffect, useState } from 'react'
import requestApi from '../helpers/api';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you import Link from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'
const Dashboard = () => {
    const dispatch = useDispatch()
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        const promiseUser = requestApi('/users', 'GET');
        const promisePost = requestApi('/posts', 'GET');
        dispatch(actions.controlLoading(true));
        Promise.all([promiseUser, promisePost]).then((res) => {
            console.log('res =>', res);
            setDashboardData({
                totalUser: res[0].data.total,
                totalPost: res[1].data.total,
            });
            dispatch(actions.controlLoading(false));
        }).catch(error => {
            console.log("error => ", error);
            dispatch(actions.controlLoading(false));
        })
    }, []);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Total Users
                                    {dashboardData.totalUser && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {dashboardData.totalUser}
                                    </span>)}

                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/users' className="small text-white stretched-link">View Details</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Total Post
                                    {dashboardData.totalPost && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {dashboardData.totalUser}
                                    </span>)}
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/posts' className="small text-white stretched-link">View Details</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Success Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Danger Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Dashboard