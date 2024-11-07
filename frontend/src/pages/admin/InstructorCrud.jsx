import React, { useState, useEffect } from 'react'
import Datatable from '../../components/Datatable';
import { deleteInstructor } from '../../../../backend/controllers/instructor.controller';
import axios from "axios"
import toast from 'react-hot-toast'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { fetchData, fetchDataN, createFunc, addToTable, updateFunc, addAndRemoveToTable, deleteFunc } from './Utils/CrudUtils'

const InstructorCrud = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState({})
  const [instructor, setInstructor] = useState([])
  const [formState, setFormState] = useState({ first_name: '', last_name: '', age: '', gender: '', address: '', user: '', });
  const [mode, setMode] = useState()
  const [desc, setDesc]= useState()
  const [crudMode, setCrudMode] = useState('read')
  const [flattenedData, setFlattenedData] = useState([])

  const resetForm = () => {
    setFormState({ first_name: '', last_name: '', age: '', gender: '', address: '', user: '', })
  }
  const getOptionsSpecs = async () => {
    fetchData('user', setCategoryOptions)
  }

  useEffect(() => {
    fetchData('instructor', setInstructor)
    getOptionsSpecs()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if(crudMode == 'create') {
      handleCreate()
    } else if(crudMode == "update") {
      handleUpdate()
    }
  }

  const handleCreate = async () => {
    const response = await createFunc('instructor', formState);

    const newInstructor = {
      _id: response.data.data._id,
      first_name: formState.first_name,
      last_name: formState.last_name,
      expertise: formState.expertise,
      age: formState.age,
      gender: formState.gender,
      address: formState.address,
      user: formState.user,
      newData: true
    };

    addToTable(setInstructor, newInstructor)
    setModalOpen(false);
  };

  const handleUpdate = async () => {
    const response = await updateFunc('instructor', formState._id, formState)
    const newInstructor = {
      _id: response.data.data._id,
      first_name: formState.first_name,
      last_name: formState.last_name,
      expertise: formState.expertise,
      age: formState.age,
      gender: formState.gender,
      address: formState.address,
      user: formState.user,
      newData: true,
    };

    addAndRemoveToTable(setInstructor, newInstructor)
    setFormState({ first_name: '', last_name: '', expertise: '', age: '', gender: '', address: '', user: '', })
    setEditModal(false);
  }

  const deleteInstructor = async (id) => {
    deleteFunc('instructor', id, setInstructor)
  }

  const loadCreateModal = () => {
    resetForm()
    setCrudMode('create')
    setMode("Create Instructor")
    setDesc("Placeholder")
    setModalOpen(true)
  }

  const loadEditModal = async (id) => {
    resetForm()
    setCrudMode('update')
    const response = await fetchDataN('instructor', id)
    setFormState(response.data.data)
    setMode("Edit Instructor")
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
        label: 'First Name',
        type: 'text',
        name: 'first_name',
        placeholder: 'Enter First Name',
        className: 'input-field',
        value: formState.first_name,
        onChange: (e) => setFormState({ ...formState, first_name: e.target.value }),
        required: true,
        withForeign: false,

        label2: 'Last Name',
        type2: 'text',
        name2: 'last_name',
        placeholder2: 'Enter Last Name',
        value2: formState.last_name,
        onChange2: (e) => setFormState({ ...formState, last_name: e.target.value }),
        required2: true,
        col: true,
      },
      {
        label: 'Age',
        type: 'number',
        name: 'age',
        placeholder: 'Enter Age',
        value: formState.age,
        onChange: (e) => setFormState({ ...formState, age: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Gender',
        type: 'text',
        name: 'gender',
        placeholder: 'Enter Gender',
        value: formState.gender,
        onChange: (e) => setFormState({ ...formState, gender: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Address',
        type: 'text',
        name: 'address',
        placeholder: 'Enter Address',
        value: formState.address,
        onChange: (e) => setFormState({ ...formState, address: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'User',
        type: 'select',
        name: 'user',
        placeholder: 'Enter User',
        value: formState.user,
        onChange: (e) => setFormState({ ...formState, user: e.target.value }),
        required: true,
        options: categoryOptions,
        requestFor: 'email',
        withForeign: false,
      },
    ]
  };

  useEffect(() => {
    if (instructor.length > 0) {
      const flattened = instructor.map(item => ({
        _id: item._id,
        first_name: item.first_name,
        last_name: item.last_name,
        age: item.age,
        gender: item.gender,
        address: item.address,
        user: (typeof item.user === 'string')
          ? item.user
          : (Array.isArray(item.user) && item.user.length > 0)
            ? item.user[0].email
            : 'N/A',
        createdAt: new Date(item.createdAt).toLocaleString(),
        updatedAt: new Date(item.updatedAt).toLocaleString(),
      }));
      setFlattenedData(flattened);
    }
  }, [instructor]);

  return (
    <div className="main-panel__column">
      <div className="md-thumbs">
        <div className="thumb">

        </div>
        <div className="thumb">

        </div>
        <div className="thumb">

        </div>
        <div className="thumb">

        </div>
      </div>
      <Datatable
        modalData={modalData}
        handleSubmit={handleSubmit}
        apiData={flattenedData}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crudType={"instructor"}
        deleteHandler={deleteInstructor}
        loadEditModal={loadEditModal}
        closeModals={closeModals}
        loadCreateModal={loadCreateModal}
      />
    </div>
  )
}

export default InstructorCrud