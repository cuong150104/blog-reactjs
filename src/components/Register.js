

import "./Register.scss";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import requestApi from '../helpers/api';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';
import './Login.scss';

const Register = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    let token = localStorage.getItem('access_token') || false;
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, []);

    const isValidInput = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            toast.error("Phone is required");
            return false;
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            toast.error("Password is required");
            return false;
        }

        if (password !== confirmPassword) {
            setObjCheckInput({
                ...defaultValidInput,
                isValidConfirmPassword: false,
            });
            toast.error("Your password is not the same");
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInput();

        // if (check === true) {
        //     let serverData = await registerNewUser(
        //         firstName,
        //         lastName,
        //         email,
        //         phone,
        //         username,
        //         password
        //     );
        //     if (+serverData.EC === 0) {
        //         toast.success(serverData.EM);
        //         history.push("/login");
        //     } else {
        //         toast.error(serverData.EM);
        //         if (+serverData.EC === 1) {
        //             setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
        //         } else if (+serverData.EC === 2) {
        //             setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
        //         }
        //     }
        // }
    };

    return (
        <>
            <div className="wrapper">
                <div className="d-flex align-items-center justify-content-center my-5 my-lg-0">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
                            <div className="col mx-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="border p-4 rounded">
                                            <Link to="/">
                                                <div className="text-center">
                                                    <img
                                                        src={require("../images/logo.png")}
                                                        width="30"
                                                        height="30"
                                                        className="d-inline-block align-top me-3"
                                                        alt="Logo"
                                                    />
                                                    <h3 className="">Register</h3>
                                                </div>
                                            </Link>
                                            <div className="mb-1">
                                                <p className="gap-1">
                                                    Already have an account?
                                                    <Link to="/login"> Login here</Link>
                                                </p>
                                                <p className="gap-1">
                                                    Register with Company?
                                                    <Link to="/register-company"> Click here</Link>
                                                </p>
                                            </div>
                                            <div className="form-body">
                                                <form className="row g-3">
                                                    <div className="col-sm-6">
                                                        <label for="inputFirstName" className="form-label">
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="inputFirstName"
                                                            placeholder="Jhon"
                                                            onChange={(event) =>
                                                                setFirstName(event.target.value)
                                                            }
                                                        ></input>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label for="inputLastName" className="form-label">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="inputLastName"
                                                            placeholder="Deo"
                                                            onChange={(event) =>
                                                                setLastName(event.target.value)
                                                            }
                                                        ></input>
                                                    </div>
                                                    <div className="col-12">
                                                        <label for="inputEmailAddress" className="form-label">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={
                                                                objCheckInput.isValidEmail
                                                                    ? "form-control"
                                                                    : "form-control is-invalid"
                                                            }
                                                            placeholder="Email address"
                                                            value={email}
                                                            onChange={(event) => setEmail(event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label for="inputEmailAddress" className="form-label">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className={
                                                                objCheckInput.isValidPhone
                                                                    ? "form-control"
                                                                    : "form-control is-invalid"
                                                            }
                                                            placeholder="Phone number"
                                                            value={phone}
                                                            onChange={(event) => setPhone(event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label for="inputEmailAddress" className="form-label">
                                                            Username
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Username"
                                                            value={username}
                                                            onChange={(event) =>
                                                                setUsername(event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label for="inputChoosePassword" className="form-label">
                                                            Password
                                                        </label>
                                                        <div className="input-group" id="show_hide_password">
                                                            <input
                                                                type="password"
                                                                className={
                                                                    objCheckInput.isValidPassword
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={(event) =>
                                                                    setPassword(event.target.value)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label for="inputChoosePassword" className="form-label">
                                                            Re-Enter Password
                                                        </label>
                                                        <div className="input-group" id="show_hide_password">
                                                            <input
                                                                type="password"
                                                                className={
                                                                    objCheckInput.isValidConfirmPassword
                                                                        ? "form-control"
                                                                        : "form-control is-invalid"
                                                                }
                                                                placeholder="Re-enter Password"
                                                                value={confirmPassword}
                                                                onChange={(event) =>
                                                                    setConfirmPassword(event.target.value)
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button
                                                                className="btn btn-primary"
                                                                type="button"
                                                                onClick={() => handleRegister()}
                                                            >
                                                                Register
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
};

export default Register;