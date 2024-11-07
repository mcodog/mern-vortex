import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { fetchData, fetchDataN, createFunc, addToTable, updateFunc, addAndRemoveToTable, deleteFunc } from './Utils/CrudUtils'

const UsersCrud = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState({})
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState({ email: '', password: '', role: '', status: '', });
  const [mode, setMode] = useState()
  const [desc, setDesc] = useState()
  const [crudMode, setCrudMode] = useState('read')

  const resetForm = () => {
    setFormState({ email: '', password: '', role: '', status: '' });
  }

  const getOptionsSpecs = async () => {
    fetchData('user', setCategoryOptions)
  }

  useEffect(() => {
    fetchData('user', setUsers)
    getOptionsSpecs()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (crudMode == 'create') {
      handleCreate()
    } else if (crudMode == "update") {
      handleUpdate()
    }
  }

  const handleCreate = async () => {
    const response = await createFunc('user', formState);

    const newUser = {
      _id: response.data.data._id,
      email: formState.email,
      password: formState.password,
      role: formState.role,
      status: formState.status,
      newData: true
    };

    addToTable(setUsers, newUser)
    resetForm()
    setModalOpen(false);
  };

  const handleUpdate = async () => {
    const response = await updateFunc('user', formState._id, formState)
    const newUser = {
      _id: response.data.data._id,
      email: formState.email,
      password: formState.password,
      role: formState.role,
      status: formState.status,
      newData: true
    };

    addAndRemoveToTable(setUsers, newUser)
    setFormState({ email: '', password: '', role: '', status: '' });
    closeModals();
  }

  const deleteData = async (id) => {
    deleteFunc('user', id, setUsers)
  }

  const loadCreateModal = () => {
    resetForm()
    setCrudMode('create')
    setMode("Create User")
    setDesc("Placeholder")
    setModalOpen(true)
  }

  const loadEditModal = async (id) => {
    resetForm()
    setCrudMode('update')
    const response = await fetchDataN('user', id)
    setFormState(response.data.data)
    setMode("Edit User")
    setDesc("Placeholder")
    setModalOpen(true)
  }

  const closeModals = () => {
    setModalOpen(false)
  }

  let modalData = {
    title: mode,
    content: desc,
    fields: [
      {
        label: 'Email',
        type: 'text',
        name: 'email',
        placeholder: 'Enter Email',
        className: 'input-field',
        value: formState.email,
        onChange: (e) => setFormState({ ...formState, email: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Enter Password',
        value: formState.password,
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
        options: [{ "_id": "Instructor", 'title': 'Instructor' },
        { "_id": "Learner", 'title': 'Learner' },
        { "_id": "Admin", 'title': 'Admin' }
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
        options: [{ "_id": "Active", 'title': 'Active' },
        { "_id": "Inactive", 'title': 'Inactive' },
        { "_id": "Suspended", 'title': 'Suspended' },
        { "_id": "Banned", 'title': 'Banned' }
        ],
        requestFor: 'title',
        withForeign: false,
      },
    ]
  };

  //

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
        modalData={modalData}
        handleSubmit={handleSubmit}
        apiData={users}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crudType={"user"}
        deleteHandler={deleteData}
        loadEditModal={loadEditModal}
        closeModals={closeModals}
        loadCreateModal={loadCreateModal}
      />
    </div>
  )
}

export default UsersCrud