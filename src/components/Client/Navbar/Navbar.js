import React from 'react';
// import './css/style.css';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()

    const onHandleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('roles')
        navigate("/login")
    }




    return (<div>
        <div className="header_section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <div className="logo">
                            <a href="index.html">
                                <img src={require("../../../images/logo.png")} alt="Logo" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <ul>
                                       <li> <Link to='/home' className="nav-item nav-link">Home</Link></li>
                                        <li>|</li>
                                        <li><a className="nav-item nav-link" href="">About</a></li>
                                        <li>|</li>
                                        <li><a className="nav-item nav-link" href="">Cameras</a></li>
                                        <li>|</li>
                                        <li><a className="nav-item nav-link" href="">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="search_main">
                            <div className="left_main">
                                <form className="form-inline my-2 my-lg-0">
                                    <button className="submit_bt">
                                        <a href="#">Search<span className="doctor"><img src={require("../../../images/search-icon.png")} alt="Search Icon" /></span></a>
                                    </button>
                                </form>
                            </div>
                            <div className="right_main">
                                <div className="login_text">
                                    <ul className="user_icon">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                                <li><Link to="profile" className="dropdown-item">Settings</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" onClick={onHandleLogout}>Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;
