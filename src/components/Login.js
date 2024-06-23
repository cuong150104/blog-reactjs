import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import requestApi from '../helpers/api';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';
import './Login.scss';
const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);



    const onChange = (event) => {
        let target = event.target;
        setLoginData({
            ...loginData, [target.name]: target.value
        });
    }

    useEffect(() => {
        if (isSubmitted) {
            validateForm();
        }
    }, [loginData]);

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (loginData.email === '' || loginData.email === undefined) {
            errors.email = "Please enter email";
        } else {
            let valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(loginData.email);
            if (!valid) {
                errors.email = "Email is not valid";
            }
        }

        if (loginData.password === '' || loginData.password === undefined) {
            errors.password = "Please enter password";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false;
        } else {
            setFormErrors({});
        }

        return isValid;
    }

    const onSubmit = () => {
        console.log(loginData);
        let valid = validateForm();
        if (valid) {
            console.log("request login api");
            dispatch(actions.controlLoading(true));
            requestApi('/auth/login', 'POST', loginData).then((res) => {
                console.log("check res => ", res);
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                localStorage.setItem('roles', res.data.userData.roles);
                localStorage.setItem('id', res.data.userData.id);
                console.log("check res => ", res.data.userData.roles);
                dispatch(actions.controlLoading(false));
                onLogin();
                navigate('/');
            }).catch(err => {
                dispatch(actions.controlLoading(false));
                console.log(err);
                if (typeof err.response !== "undefined") {
                    if (err.response.status !== 201) {
                        toast.error(err.response.data.message, { position: "top-center" });
                    }
                } else {
                    toast.error("Server is down. Please try again!", { position: "top-center" });
                }
            });
        }

        setIsSubmitted(true);
    }

    const returnToHomePage = () => {
        navigate("/home");
    };
    return (
       

        <>
            <div className="wrapper">
                <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                    <div className="container-fluid">
                        <div className="row row-cols-1 row-cols-lg-1">
                            <div className="col mx-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="border p-4 rounded">
                                            <div className="text-center">
                                                <img
                                                    src={require("../images/logo.png")}
                                                    width="30"
                                                    height="30"
                                                    className="d-inline-block align-top me-3"
                                                    alt="Logo"
                                                />
                                                <h3 className="">Login</h3>
                                            </div>
                                            <p>
                                                Don't have an account yet?
                                                <Link to="/register">Register here</Link>
                                            </p>
                                            <div className="form-body">
                                                <form className="row g-3">
                                                    <div className="col-12">

                                                    
                                                        <label for="inputEmailAddress" className="form-label">
                                                            Email Address
                                                        </label>
                                                        <input className="form-control" type="email" name='email' onChange={onChange} placeholder="name@example.com" />
                                                        {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}

                                                    </div>
                                                    <div className="col-12">
                                                        <label for="inputChoosePassword" className="form-label">
                                                            Enter Password
                                                        </label>
                                                        <div className="input-group" id="show_hide_password">
                                                            <input className="form-control" name='password' type="password" onChange={onChange} placeholder="Password" />
                                                            {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 return text-center">
                                                        <Link to={`/`}>
                                                            <i className="fa fa-arrow-circle-left"></i>
                                                            <span title="Return to HomePage "> Return to HomePage </span>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện
                                                                    onSubmit();
                                                                }}
                                                            >
                                                                Login
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;
