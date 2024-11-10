import React from 'react'
import './styles/Welcome.css'
import { useEffect } from 'react';
import Gradient from '../components/Gradient'
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

const Welcome = () => {
    const { isAuthenticated, user } = useAuth();
    const applyMembership = async(membership) => {
        try {
            const formData = { membership_type: membership }
            const res = await axios.put(`http://localhost:8000/api/user/${user._id}`, formData)
            console.log(res)
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="hero-background-custom">
                <Gradient />
            </div>

            <section className="hero-section">
                <div className="main-hero">
                    <div className="main-container-row">
                        <div className="container-col left-col">
                            <br /><br />
                            <button className='radi'>
                                Check out our mobile app and get exclusive access to discounts &nbsp; &nbsp;
                                <i className="bi bi-circle-fill" style={{ fontSize: '8px' }}></i> &nbsp; &nbsp;
                                <span className="readmore">
                                    Read More <span style={{ fontWeight: 500 }}> &nbsp; </span>
                                </span>
                            </button>
                            <div className="tagline">Your Path to Mastery Starts Here.</div>
                            <br />
                            <div className="description">
                                Join the thousands of learners and professionals who use our platform to acquire new skills, advance careers, and achieve personal goals. Access expert-led courses, interactive content, and a global community—all designed to empower your learning journey and drive your success.
                            </div>
                        </div>

                        <div className="container-col right-col">
                            <div className="phone-container">

                            </div>
                            <div className="box-container">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                isAuthenticated ? (
                    user.membership_type == '' ? (
                        <section>
                            <div className="main-container">
                                <div className="sub-plans__container">
                                    <div className="title sub-plan__title">Choose a plan for success</div>
                                    <div className="title sub-plan__tagline">Don't want to buy courses one by one? Pick a plan to help you, your team, or your organization achieve outcomes faster.</div>
                                    <div className="plans-grid">
                                        <div className="plan-card">
                                            <div className="plan-title sm-margin-y">Standard Personal Plan</div>
                                            <Divider />
                                            <div className="sm-margin-y"></div>
                                            <div>Starting at $55 a month (after free trial)</div>
                                            <div className="info-tip">Billed monthly. Can be cancelled anytime.</div>
                                            <Button className='w-100 sm-font' variant="contained" onClick={() => {applyMembership('Standard Personal Plan')}}>Try Personal Plan for Free</Button>
                                            <div className="sm-margin-y">Inclusivities:</div>
                                            <div className="inclusivities-container">
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Access to 12,000+ top courses
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Certification Prep
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Goal-focused Course Recommendation
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plan-card">
                                            <div className="plan-title sm-margin-y">Vortex Plus</div>
                                            <Divider />
                                            <div className="sm-margin-y"></div>
                                            <div>Starting at $100 a month (after free trial)</div>
                                            <div className="info-tip">Billed monthly. Can be cancelled anytime.</div>
                                            <Button className='w-100 sm-font' variant="contained" onClick={() => {applyMembership('Vortex Plus')}}>Try Vortex Plus for Free</Button>
                                            <div className="sm-margin-y">Inclusivities:</div>
                                            <div className="inclusivities-container">
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Access to 12,000+ top courses
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Certification Prep
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Goal-focused Course Recommendation
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Analytics and adoption reports
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plan-card">
                                            <div className="plan-title sm-margin-y">Vortex Premium</div>
                                            <Divider />
                                            <div className="sm-margin-y"></div>
                                            <div>Starting at $125 a month (after free trial)</div>
                                            <div className="info-tip">Billed monthly. Can be cancelled anytime.</div>
                                            <Button className='w-100 sm-font' variant="contained" onClick={() => {applyMembership('Vortex Premium')}}>Try Vortex Premium for Free</Button>
                                            <div className="sm-margin-y">Inclusivities:</div>
                                            <div className="inclusivities-container">
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Access to 27,000+ top courses
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Certification Prep
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Goal-focused Course Recommendation
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    International course collection featuring 15 languages
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Dedicated customer success team
                                                </div>
                                                <div className="inclusivity">
                                                    <FaCheckCircle /> &nbsp;
                                                    Advanced analytics and insights
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <div></div>
                    )
                ) : (
                    <div></div>
                )
            }

            {/* <section className="testimonials-section">
            <br /><br /><br />
            <div className="title"><h1>We offer the best-in-class courses to elevate your skills and achieve your goals.</h1></div>
            <div className="main-testimonials">
                <div className="testi-card">
                    <div className="card-img"><img src="https://placehold.co/600x400" alt="course-img" /></div>
                    <div className="card-body"></div>
                    <div className="card-tags"></div>
                </div>
                <div className="testi-card">
                    <div className="card-img"><img src="https://placehold.co/600x400" alt="course-img" /></div>
                    <div className="card-body"></div>
                    <div className="card-tags"></div>
                </div>
                <div className="testi-card">
                    <div className="card-img"><img src="https://placehold.co/600x400" alt="course-img" /></div>
                    <div className="card-body"></div>
                    <div className="card-tags"></div>
                </div>
                <div className="testi-card">
                    <div className="card-img"><img src="https://placehold.co/600x400" alt="course-img" /></div>
                    <div className="card-body"></div>
                    <div className="card-tags"></div>
                </div>
                <div className="testi-card">
                    <div className="card-img"><img src="https://placehold.co/600x400" alt="course-img" /></div>
                    <div className="card-body"></div>
                    <div className="card-tags"></div>
                </div>
                <div className="testi-card">
                    <div className="card-img"><img src="https://placehold.co/600x400" alt="course-img" /></div>
                    <div className="card-body"></div>
                    <div className="card-tags"></div>
                </div>

            </div>
        </section>

        <section className="categories-section">
            <div className="category-container">
                <div className="main">
                    <div className="main-category"></div>
                </div>
                <div className="sub">
                    <div className="sub-category"></div>
                    <div className="sub-category"></div>
                </div>
            </div>
        </section> */}
        </>
    )
}

export default Welcome