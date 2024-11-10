import React, { useEffect, useState } from 'react';
import './styles/CourseItem.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Button } from '@mui/material';
import { CiBookmarkMinus } from "react-icons/ci";
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CourseDetails = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { id } = useParams();
    const [course, setCourse] = useState()
    const { isAuthenticated, user } = useAuth();
    const retrieveCourse = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/course/${id}`)
            setCourse(res.data.data)
            console.log(res.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        retrieveCourse()
    }, [])


    useEffect(() => {
        console.log(course)
    }, [course])

    const addToCart = async () => {
        try {
            const formData = { course_id: id }
            const res = await axios.post(`http://localhost:8000/api/user/addToCart/${user._id}`, formData)
            toast.success(res.data.message)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <section>
            {course ? (
                <div className="main-container">
                    <div className="controls">
                        <div className="carousel-container">
                            <Carousel
                                navButtonsAlwaysVisible
                                className='custom-carousel'
                                NextIcon={<FaArrowAltCircleRight style={{ color: 'black' }} />}
                                navButtonsProps={{
                                    style: {
                                        backgroundColor: 'transparent',
                                        borderRadius: 0
                                    }
                                }}
                                PrevIcon={<FaArrowAltCircleLeft style={{ color: 'black' }} />}
                                animation="slide"
                            >

                                {
                                    course.images.length > 0 ? (
                                        course.images.map(img => (
                                            <div className="carousel-img__container">
                                                <div className="img-container__course">
                                                    <img src={img.url} key={img.url} alt="Images Preview" className="mt-3 mr-2" />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="carousel-img__container">
                                            <div className="img-container__course">
                                                <img src="https://placehold.co/600x400" alt="Images Preview" className="mt-3 mr-2" />
                                            </div>
                                        </div>
                                    )

                                }
                            </Carousel>
                            <div className="course-controls">
                                <div className="big-with__small">
                                    <Button onClick={() => { handleClickOpen() }} className='flex-grow whiteout-button' variant="contained">Add to Cart for ${course.price}</Button>
                                    <Button variant="outlined"><CiBookmarkMinus className='mui-button__icon' /></Button>
                                </div>
                                <Divider className='medium-margin-y'>or</Divider>
                                <div className="sub-promo">
                                    <div className='promo-font'>Get this course along with 13,000+ courses by subscribing to Vortex <Link>Learn More</Link></div>

                                    <Button className='w-100' variant="contained">Try Personal Plan for Free</Button>
                                    <div className="sm-spacer"></div>
                                    <div className="promo-info">Starts at $55 per month after free trial</div>
                                    <div className="promo-info">Cancel Anytime</div>
                                </div>
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>{"Confirm adding to cart?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">

                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='colored-button'>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button variant="contained" onClick={addToCart}>Add to Cart</Button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="reg-container breadcrumbs">
                            <ol className="breadcrumb v1">
                                <li className="breadcrumb-level"><a href="">Courses</a></li>
                                <li className="breadcrumb-level"><a href="">Information Technology</a></li>
                                <li className="breadcrumb-level bc-highlight"><a href="">{course.title}</a></li>
                            </ol>
                        </div>
                        <div className="md-container title flexed">
                            <h3>{course.title}</h3>
                            <p style={{ color: 'gray', fontSize: '26px' }}>{course.specialization[0].title}</p>
                        </div>
                        <div className="md-container description flexed">
                            {course.description}
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

                        {/* <div className="boxed-container"></div> */}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default CourseDetails;
