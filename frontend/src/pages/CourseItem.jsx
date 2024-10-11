import React from 'react';
import './styles/CourseItem.css'

const CourseDetails = () => {
    return (
        <section>
            <div className="main-container">
                <div className="controls"></div>
                <div className="details">
                    <div className="reg-container breadcrumbs">
                        <ol className="breadcrumb v1">
                            <li className="breadcrumb-level"><a href="">Courses</a></li>
                            <li className="breadcrumb-level"><a href="">Information Technology</a></li>
                            <li className="breadcrumb-level bc-highlight"><a href="">Information Assurance and Security</a></li>
                        </ol>
                    </div>
                    <div className="md-container title flexed">
                        <h3>The Seven Domains of an IT Infrastructure</h3>
                        <p style={{ color: 'gray', fontSize: '26px' }}>Information Technology</p>
                    </div>
                    <div className="md-container description flexed">
                        In today’s rapidly evolving technological landscape, understanding the core components of IT infrastructure is essential for effective management and optimization. This comprehensive course, "Mastering the 7 Domains of IT Infrastructure," delves into the fundamental domains that constitute a robust IT infrastructure, equipping participants with the knowledge and skills needed to design, implement, and maintain complex IT environments.
                    </div>
                    <div className="reg-container rating">
                        <div className="tag">Best Seller</div> &nbsp; &nbsp;
                        <div className="stars"> 5.0 &nbsp;
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div> &nbsp;
                        <div style={{ color: 'gray' }}>
                            (211,321 ratings)
                        </div> &nbsp; - &nbsp;
                        <div>
                            234,231 students
                        </div>
                    </div>
                    <div className="sm-container instructor">
                        Created by &nbsp; <span className="highlighted">Anthony Whittaker</span>
                    </div>
                    <div className="sm-container extra-details">
                        <span><i className="bi bi-exclamation-octagon"></i> Last Updated: 26/08/2024</span> &nbsp; &nbsp;
                        <span><i className="bi bi-card-heading"></i> English</span>
                    </div>
                    <div className="boxed-container"></div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
