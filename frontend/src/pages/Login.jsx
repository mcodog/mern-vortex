import React, { useState } from 'react';
import './styles/Login.css'
import Gradient from '../components/Gradient'
import axios from 'axios'
import { firebaseLogin, firebaseRegister, signInWithGoogle } from '../auth/auth';
import { createFunc, createFuncNoToast } from './admin/Utils/CrudUtils'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaGooglePlus } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const saveData = loginAttempt()

            toast.promise(saveData, {
                loading: 'Attempting to Login...',
                success: 'Logging you in now...',
                error: 'Unsuccessful: Changes to profile are not saved.'
            });

        },
    });

    const [basicInfo, setBasicInfo] = useState()
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
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
            window.location.href = "/"
        } catch (e) {
            toast.error("Error: Please check your credentials.")
            console.log(e)
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        // console.log("form", formData)
        const saveData = loginProcess()

        toast.promise(saveData, {
            loading: 'Attempting to Register...',
            success: 'You are now registered! Logging you in now...',
            error: 'Unsuccessful: Changes to profile are not saved.'
        });
    };

    const loginProcess = async () => {
        await firebaseRegister(formik.values.email, formik.values.password)
        const response = await createFuncNoToast('user', formik.values)
        setBasicInfo({ id: response.data.data._id, email: response.data.data.email })
        loginAttempt()
    }


    const handleToggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    const loginAttempt = async (request, response) => {
        const user = await firebaseLogin(formik.values.email, formik.values.password)
        const token = await user.getIdToken();
        const res = await axios.post("http://localhost:8000/auth", { token });


        setTimeout(() => {
            if (res.statusText == 'OK') {
                window.location.href = "/"
            }
        }, 2000);

    }

    const googleLogin = async () => {
        try {
            const user = await signInWithGoogle()
            const token = await user.getIdToken();
            const res = await axios.post("http://localhost:8000/auth/google", { token });
            setTimeout(() => {
                window.location.href = "/"
            }, 1000);
            if (res.response.data.message == "User not found") {
                alert("invalid")
            }
            } catch (e) {
                console.log(e)
            }
        }

    return (
            <section className="zerom main-container">
                <div className="background">
                    <Gradient />
                </div>
                <div className="pos0 login-container">
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
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="input-block">
                                        <label htmlFor="username">EMAIL</label><br />
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            // value={formData.email}
                                            // onChange={handleChange}
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.touched.email && formik.errors.email ? (
                                        <span style={{ color: 'red' }}>{formik.errors.email}</span>
                                    ) : null}
                                    <div className="input-block">
                                        <label htmlFor="password">PASSWORD</label><br />
                                        <input
                                            type="password"
                                            id="password"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.touched.password && formik.errors.password ? (
                                        <span style={{ color: 'red' }}>{formik.errors.password}</span>
                                    ) : null}
                                    <div className="control-block">
                                        <button type="button">Forgot Password?</button>
                                        <button className="signin alt" type="submit">Sign In</button>
                                    </div>
                                    <div className="socials-block">
                                        <button onClick={() => { googleLogin() }} type="button" className="social"><FaGooglePlus /></button>
                                        <button type="button" className="social"><FaFacebook /></button>
                                        <button type="button" className="social"><FaGithub /></button>
                                    </div>
                                    <div className="input-container">
                                        <span>Don't have an account? <button className="link-prime" onClick={handleToggleForm}>Register Now</button></span>
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
                                                id="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="last-name">LAST NAME</label><br />
                                            <input
                                                type="text"
                                                id="last_name"
                                                value={formData.last_name}
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
