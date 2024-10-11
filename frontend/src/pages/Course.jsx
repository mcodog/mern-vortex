import React from 'react'
import './styles/Courses.css'

import { FaStar, FaRegStarHalfStroke, FaRegStar  } from "react-icons/fa6";

const Course = () => {
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
                    &nbsp;<label htmlFor="english">English <span style={{color: "gray"}}>(100.4K)</span></label>
                    <br />
                    <input type="checkbox" name="language" id="spanish" />
                    &nbsp;<label htmlFor="spanish">Spanish <span style={{color: "gray"}}>(53.02K)</span></label>
                    <br />
                    <input type="checkbox" name="language" id="dutch" />
                    &nbsp;<label htmlFor="dutch">Dutch <span style={{color: "gray"}}>(22.8K)</span></label>
                    <br />
                    <input type="checkbox" name="language" id="japanese" />
                    &nbsp;<label htmlFor="japanese">Japanese <span style={{color: "gray"}}>(99.1K)</span></label>
                    <br />
                    <input type="checkbox" name="language" id="korean" />
                    &nbsp;<label htmlFor="korean">Korean <span style={{color: "gray"}}>(46.4K)</span></label>
                    </div>
                </div>
                </div>
                <div className="deck">
                <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-img">
                            <img src="https://placehold.co/600x400" alt="course-img" />
                        </div>
                        <div class="card-body">
                            <div class="card-title">7 Domains of an IT Infrastructure</div>
                            <div class="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </>

  )
}

export default Course