import React, { useEffect, useState } from 'react'
import './styles/Courses.css'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'

import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

const Course = () => {
    const [courses, setCourses] = useState([])
    const retrieveCourses = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/course`)
            setCourses(res.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        retrieveCourses()
    }, [])

    useEffect(() => {
        console.log(courses)
    }, [courses])
    return (
        <>
            <section>
                <div className="main-container-column">
                    <div className="lg-container">
                        <div className="featured">
                            <div className="carousel">
                                <div className="carousel-overlay">
                                    <div className="carousel-overlay-control prev-button">
                                        <i className="bi bi-chevron-left"></i>
                                    </div>
                                    <div className="carousel-overlay-control next-button">
                                        <i className="bi bi-chevron-right"></i>
                                    </div>
                                </div>
                                <div className="carousel-slide">
                                    <div className="carousel-item carousel-active">
                                        <img src="https://placehold.co/600x400" alt="course-img" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://placehold.co/700x800" alt="course-img" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://placehold.co/900x600" alt="course-img" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://placehold.co/600x400" alt="course-img" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://placehold.co/700x800" alt="course-img" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://placehold.co/900x600" alt="course-img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="popular"></div>
                    </div>

                    <div className="sm-container">
                        <ol className="breadcrumb v1">
                            <li className="breadcrumb-level">
                                <a href="">Courses</a>
                            </li>
                            <li className="breadcrumb-level">
                                <a href="">Information Technology</a>
                            </li>
                            <li className="breadcrumb-level bc-highlight">
                                <a href="#">Information Assurance and Security</a>
                            </li>
                        </ol>
                    </div>

                    <div className="sm-container">
                        <div className="title">Information Assurance and Security</div>
                        <div className="category">Information Technology</div>
                    </div>

                    <div className="lg-container">
                        <div className="filter">
                            <div className="filter-item">
                                <div className="filter-title">Ratings</div>
                                <div className="filter-control">
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="5"
                                        className="custom-radio"
                                    />{" "}
                                    &nbsp;{" "}
                                    <label htmlFor="5">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />  &nbsp; 5 stars
                                    </label>{" "}
                                    <br />
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="4.5"
                                        className="custom-radio"
                                    />{" "}
                                    &nbsp;{" "}
                                    <label htmlFor="4.5">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStarHalfStroke /> &nbsp; 4.5 stars
                                    </label>{" "}
                                    <br />
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="4"
                                        className="custom-radio"
                                    />{" "}
                                    &nbsp;{" "}
                                    <label htmlFor="4">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar /> &nbsp; 4 stars
                                    </label>{" "}
                                    <br />
                                    <input
                                        type="radio"
                                        name="rating"
                                        id="3.5"
                                        className="custom-radio"
                                    />{" "}
                                    &nbsp;{" "}
                                    <label htmlFor="3.5" className="custom-radio">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStarHalfStroke />
                                        <FaRegStar /> &nbsp; 3.5 stars
                                    </label>{" "}
                                    <br />
                                </div>
                            </div>
                            <div className="filter-item">
                                <div className="filter-title" id="price-range">
                                    Price Range
                                </div>
                                <div className="filter-control">
                                    <input
                                        type="number"
                                        name="min"
                                        id="min"
                                        placeholder="0"
                                    />{" "}
                                    -{" "}
                                    <input
                                        type="number"
                                        name="max"
                                        id="max"
                                        placeholder="100"
                                    />
                                </div>
                            </div>
                            <div className="filter-item">
                                <div className="filter-title">Language</div>
                                <div className="filter-control">
                                    <input type="checkbox" name="language" id="english" />
                                    &nbsp;<label htmlFor="english">English <span style={{ color: "gray" }}>(100.4K)</span></label>
                                    <br />
                                    <input type="checkbox" name="language" id="spanish" />
                                    &nbsp;<label htmlFor="spanish">Spanish <span style={{ color: "gray" }}>(53.02K)</span></label>
                                    <br />
                                    <input type="checkbox" name="language" id="dutch" />
                                    &nbsp;<label htmlFor="dutch">Dutch <span style={{ color: "gray" }}>(22.8K)</span></label>
                                    <br />
                                    <input type="checkbox" name="language" id="japanese" />
                                    &nbsp;<label htmlFor="japanese">Japanese <span style={{ color: "gray" }}>(99.1K)</span></label>
                                    <br />
                                    <input type="checkbox" name="language" id="korean" />
                                    &nbsp;<label htmlFor="korean">Korean <span style={{ color: "gray" }}>(46.4K)</span></label>
                                </div>
                            </div>
                        </div>
                        <div className="deck">
                            {
                                courses.length > 0 ? (
                                    courses.map((course) => {
                                        return (
                                            <Link to={`/course/${course._id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                                <div class="card">
                                                    <div class="card-img">
                                                        {
                                                            course.images.length > 0 ? (
                                                                <img src={course.images[0].url} alt="course-img" />
                                                            ) : (
                                                                <img src="https://placehold.co/600x400" alt="course-img" />
                                                            )
                                                        }

                                                    </div>
                                                    <div class="card-body">
                                                        <div class="card-title">{course.title}</div>
                                                        <div class="card-description">
                                                            {course.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <div className='d-flex'>
                                        <Skeleton variant="rectangular" width="20%" height={180} />
                                        <Skeleton variant="rectangular" width="80%" height={180} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Course