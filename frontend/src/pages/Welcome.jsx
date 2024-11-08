import React from 'react'
import './styles/Welcome.css'
import { useEffect } from 'react';
import  Gradient from '../components/Gradient'

const Welcome = () => {
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