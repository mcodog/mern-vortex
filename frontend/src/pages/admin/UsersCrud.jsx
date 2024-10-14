import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const UsersCrud = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        role: '',
        status: '',
      });

    const crudData = {
        crudTitle: "User",
        content: "Fill in the details for the new item you want to add."
    };

    const modalData = {
        title: 'Create New User',
        content: 'Fill out the form below to create a new user.',
        fields: [
            {
              label: 'Email',
              type: 'text',
              name: 'email',
              placeholder: 'Enter Email',
              className: 'input-field',
              value: formState.first_name, 
              onChange: (e) => setFormState({ ...formState, email: e.target.value }),
              required: true,
              withForeign: false,
            },
            {
              label: 'Password',
              type: 'password',
              name: 'password',
              placeholder: 'Enter Password',
              value: formState.last_name, 
              onChange: (e) => setFormState({ ...formState, password: e.target.value }),
              required: true,
              withForeign: false,
            },
            {
              label: 'Role',
              type: 'select',
              name: 'role',
              placeholder: 'Enter Role',
              value: formState.role,
              onChange: (e) => setFormState({ ...formState, role: e.target.value }),
              required: true,
              options: [{"_id": "Instructor", 'title': 'Instructor'},
                          {"_id": "Learner", 'title': 'Learner'},
                          {"_id": "Admin", 'title': 'Admin'}
                        ],
              requestFor: 'title',
              withForeign: false,
            },
            {
              label: 'Status',
              type: 'select',
              name: 'status',
              placeholder: 'Enter Status',
              value: formState.status,
              onChange: (e) => setFormState({ ...formState, status: e.target.value }),
              required: true,
              options: [{"_id": "Active", 'title': 'Active'},
                          {"_id": "Inactive", 'title': 'Inactive'},
                          {"_id": "Suspended", 'title': 'Suspended'},
                          {"_id": "Banned", 'title': 'Banned'}
                        ],
              requestFor: 'title',
              withForeign: false,
            },
          ]
      };

      const editData = {
        title: 'Edit User',
        content: 'Change the following field, as desired, to update this user.',
        fields: [
            {
              label: 'Email',
              type: 'text',
              name: 'email',
              placeholder: 'Enter Email',
              className: 'input-field',
              value: formState.first_name, 
              onChange: (e) => setFormState({ ...formState, email: e.target.value }),
              required: true,
              withForeign: false,
            },
            {
              label: 'Password',
              type: 'password',
              name: 'password',
              placeholder: 'Enter Password',
              value: formState.last_name, 
              onChange: (e) => setFormState({ ...formState, password: e.target.value }),
              required: true,
              withForeign: false,
            },
            {
              label: 'Role',
              type: 'select',
              name: 'role',
              placeholder: 'Enter Role',
              value: formState.role,
              onChange: (e) => setFormState({ ...formState, role: e.target.value }),
              required: true,
              options: [{"_id": "Instructor", 'title': 'Instructor'},
                          {"_id": "Learner", 'title': 'Learner'},
                          {"_id": "Admin", 'title': 'Admin'}
                        ],
              requestFor: 'title',
              withForeign: false,
            },
            {
              label: 'Status',
              type: 'select',
              name: 'status',
              placeholder: 'Enter Status',
              value: formState.status,
              onChange: (e) => setFormState({ ...formState, status: e.target.value }),
              required: true,
              options: [{"_id": "Active", 'title': 'Active'},
                          {"_id": "Inactive", 'title': 'Inactive'},
                          {"_id": "Suspended", 'title': 'Suspended'},
                          {"_id": "Banned", 'title': 'Banned'}
                        ],
              requestFor: 'title',
              withForeign: false,
            },
          ]
      };

  const [users, setUsers] = useState([]);
  const fetchUsers = async() => {
    try {
      const response = await axios.get("http://localhost:8000/api/user")
      setUsers(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log("Error while fetching User Data", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState)
    try {
      const response = await axios.post("http://localhost:8000/api/user", formState);
      console.log("User created successfully.", response);
      toast.success(response.data.message, { position: "top-right" })

      const newUser = {
        _id: response.data.data._id,
        email: formState.email,
        password: formState.password,
        role: formState.role,
        status: formState.status,
        newData: true
    };

    setUsers((prevUser) => [newUser, ...prevUser]);
      setFormState({ email: '', password: '', role: '', status: '' }); 
      setModalOpen(false);

      setTimeout(() => {
        setUsers(prevUser => 
            prevUser.map(user => 
              user._id === newUser._id ? { ...user, newData: false } : user
            )
        );
    }, 800);
    } catch (error) {
      console.log("Error creating User:", error);
    }
    console.log(formState);
  };

  const deleteUser = async (userId) => {
    console.log("Init Delete")
    await axios.delete(`http://localhost:8000/api/user/${userId}`)
    .then((response) => {
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      toast.success(response.data.message, {position:"top-right"})
    })
    
    .catch((error) => {
      console.log("Error in User Delete", error)
    })
  }

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const totalUser = document.getElementById("totalUser");
  const activeUser = document.getElementById("activeUser");
  const inactiveUser = document.getElementById("inactiveUser");
  const terminated = document.getElementById("terminated");

  animateValue(totalUser, 0, 3021, 1250);
  animateValue(activeUser, 0, 1921, 1250);
  animateValue(inactiveUser, 0, 201, 1250);
  animateValue(terminated, 0, 12, 1250);
    
  return (
    <div className="main-panel__column">
 <div className="md-thumbs">
      <div className="thumb">
          <div className="thumb-title">Total User</div>
          <div className="display-data" id="totalUser">0</div>
          <div className="th-footer">
            <div>Last Added: <span className='warning'>09/10/2024</span></div>
            <div className='center-align success expand'><FaArrowTrendUp /> &nbsp; +109</div>
          </div>
      </div>
      <div className="thumb">
          <div className="thumb-title">Active Users</div>
          <div className="display-data" id="activeUser">0</div>
          <div className="th-footer">
            <div>Students: <span className='warning'>1244</span></div>
            <div className='center-align success expand'><FaArrowTrendUp /> &nbsp; +25</div>
          </div>
      </div>
      <div className="thumb">
      <div className="thumb-title" >Inactive</div>
          <div className="display-data" id="inactiveUser">0</div>
          <div className="th-footer">
            <div>Last Added: <span className='warning'>09/10/2024</span></div>
            <div className='center-align danger expand'><FaArrowTrendDown /> &nbsp; -2</div>
          </div>
      </div>
      <div className="thumb">
          <div className="thumb-title" >Terminated</div>
          <div className="display-data" id="terminated">0</div>
          <div className="th-footer">
            <div>Students: <span className='warning'>1024</span></div>
            <div className='center-align success expand'><FaArrowTrendUp /> &nbsp; +2</div>
          </div>
      </div>
    </div>
        <Datatable 
          crudData={crudData}
          modalData={modalData}
          handleSubmit={handleSubmit}
          apiData={users} 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          crudType={"user"}
          deleteHandler={deleteUser}
          editData={editData}
        />
    </div>
  )
}

export default UsersCrud