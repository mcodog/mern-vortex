import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataN } from './Utils/CrudUtils'
import './styles/Stat.css'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Slide from '@mui/material/Slide';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LeanerStatus = () => {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [courseList, setCourseList] = useState([])
  const [controlMode, setControlMode] = useState({
    mode: '',
    title: '',
    courseId: '',
    orderId: '',
    userId: id
  })

  const handleClickOpen = (newMode, itemId, itemTitle, orderId) => {
    setControlMode((prevState) => ({
      ...prevState,
      mode: newMode,
      title: itemTitle,
      courseId: itemId,
      orderId: orderId
    }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const executeUpdate = async () => {
    try {
      let status;

      if (controlMode.mode === 'Terminate') {
        status = 'Terminated';
      } else if (controlMode.mode === 'Approve Cancellation') {
        status = 'Cancelled';
      } else if (controlMode.mode === 'Pause') {
        status = 'Paused';
      } else {
        status = 'Ongoing'; 
      }
      const submitForm = {
        "userId": controlMode.userId,
        "orderId": controlMode.orderId,
        "courseId": controlMode.courseId,
        "newStatus": status
      }
      console.log(submitForm)
      const res = await axios.post(`http://localhost:8000/api/user/update/status`, submitForm)
      findAndRetrieve()
    } catch (e) {
      console.log(e)
    }
  }

  const findAndRetrieve = async () => {
    const res = await fetchDataN('user', id)
    console.log(res)
    setUser(res.data.data)
  }

  const retrieveCourses = async () => {
    setCourseList([])
    try {
      
      for (const [index, orders] of user.checkout.entries()) {
        for (const course of orders.order.course) {
          console.log(course)
          const res = await fetchDataN('course', course.course_id);
          if (res.data.data.images.length > 0) {
            const newEntry = {
              'title': res.data.data.title,
              'image_url': res.data.data.images[0].url,
              'order_id': course._id,
              'orders_id': user.checkout[index]._id,
              'status': course.status,
              'date': orders.order.datePlaced
            }
            setCourseList((prevState) => [...prevState, newEntry])
          } else {
            const newEntry = {
              'title': res.data.data.title,
              'image_url': 'https://placehold.co/600x400',
              'order_id': course._id,
              'status': course.status,
              'date': orders.order.dataPlaced
            }
            setCourseList((prevState) => [...prevState, newEntry])
          }

        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    findAndRetrieve()
  }, [])

  useEffect(() => {
    retrieveCourses()
  }, [user])

  useEffect(() => {
    console.log(courseList)
  }, [courseList])

  return (
    <div className="learnernstat-container">
      <div className="user-info">
        <div className="info-container">
          <div className="title">{user.email}</div>
        </div>
        <Divider />
      </div>
      <div className="course-list">
        {
          courseList ? (
            courseList.map((course) => {
              const timestamp = '2024-11-20T23:17:06.368Z';
              const readableDate = new Date(timestamp).toLocaleDateString();
              const today = new Date().toLocaleDateString();
              const isNew = readableDate === today;
              return (
                <div className="list-item">
                  <div className="title">
                    {course.title}
                    &nbsp;
                    {isNew && <Chip sx={{ color: 'white', backgroundColor: 'var(--primary-color)', fontSize: '11px', height: '18px' }} icon={<StarIcon style={{ color: 'white', fontSize: '11px' }} />} label="New" />}
                    <div className="sm-spacer"></div>
                    <Divider />
                  </div>
                  <div className="date">Date: {readableDate}</div>
                  <div className="status">Status: {course.status}</div>
                  <div className="request">Request: None</div>
                  <div className="list-item__controls">
                    <button onClick={() => { handleClickOpen('Terminate', course.order_id, course.title, course.orders_id) }}>Terminate</button>
                    <button onClick={() => { handleClickOpen('Pause', course.order_id, course.title, course.orders_id) }}>Pause</button>
                    <button onClick={() => { handleClickOpen('Approve Cancellation', course.order_id, course.title, course.orders_id) }}>Approve Cancellation</button>
                  </div>
                </div>
              )
            })
          ) : (
            null
          )
        }
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{controlMode.mode} {controlMode.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to continue "{controlMode.mode} {controlMode.title}". (Item ID: {controlMode.courseId})
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'gray' }} onClick={handleClose}>Disagree</Button>
          <Button sx={{ color: 'var(--primary-color)' }} onClick={() => {executeUpdate(); handleClose()}}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LeanerStatus