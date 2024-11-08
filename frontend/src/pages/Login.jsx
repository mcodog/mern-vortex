import React, { useState } from 'react';
import './styles/Login.css'
import Gradient from '../components/Gradient'
import axios from 'axios'
import { firebaseLogin, firebaseRegister, signInWithGoogle } from '../auth/auth';
import { createFunc } from './admin/Utils/CrudUtils'

const Login = () => {
    const [basicInfo, setBasicInfo] = useState()
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        console.log(formData)
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
        try {
            // const res = await axios.post(`http://localhost:8000/auth/`, formData)
            // console.log(res)
            await loginAttempt()
            console.log("Logging in...")
            window.location.href= "/"
        } catch (e) {
            console.log(e)
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        await firebaseRegister(formData.email, formData.password)
        const response = await createFunc('user', formData)
        setBasicInfo({ id: response.data.data._id, email: response.data.data.email })
        loginAttempt()
    };


    const handleToggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    const loginAttempt = async (request, response) => {
        const user = await firebaseLogin(formData.email, formData.password)
        const token = await user.getIdToken();
        const res = await axios.post("http://localhost:8000/auth", { token });
        console.log(res)
    }

    return (
        <section className="main-container">
            <div className="background">
                <Gradient />
            </div>
            <div className="login-container">
                <button
                    className="return"
                    onClick={() => window.location.href = '/'}
                >
                    <i className="bi bi-arrow-left" style={{ fontSize: '22px' }}></i>
                </button>
                <div className="title">CLVR</div>
                <div className="form-parent">
                    {/* Login Form */}
                    {!isRegistering && (
                        <div className="form-container" id="login-form">
                            <form onSubmit={handleSubmitLogin}>
                                <div className="input-block">
                                    <label htmlFor="username">EMAIL</label><br />
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="password">PASSWORD</label><br />
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="control-block">
                                    <button type="button">Forgot Password?</button>
                                    <button className="signin" type="submit">Sign In</button>
                                </div>
                                <div className="socials-block">
                                    <div className="social"><i className="bi bi-instagram"></i></div>
                                    <div className="social"><i className="bi bi-facebook"></i></div>
                                    <div className="social"><i className="bi bi-google"></i></div>
                                </div>
                                <div className="input-container">
                                    <span>Don't have an account? <button type="button" onClick={handleToggleForm}>Register Now</button></span>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Register Form */}
                    {isRegistering && (
                        <div className="form-container" id="register-form">
                            <form onSubmit={handleSubmitRegister}>
                                <div className="input-block input-column">
                                    <div className="input-item">
                                        <label htmlFor="first-name">FIRST NAME</label><br />
                                        <input
                                            type="text"
                                            id="first-name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-item">
                                        <label htmlFor="last-name">LAST NAME</label><br />
                                        <input
                                            type="text"
                                            id="last-name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="input-block">
                                    <label htmlFor="email">EMAIL</label><br />
                                    <input
                                        type="text"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="passkey">PASSWORD</label><br />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="control-block">
                                    <button type="button" onClick={handleToggleForm} id="login-link">Go Back</button>
                                    <button className="signup" type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Login;
