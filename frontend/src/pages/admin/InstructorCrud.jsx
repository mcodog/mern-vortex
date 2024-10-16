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

  const getOptionsSpecs = async () => {
    fetchData('user', setCategoryOptions)
  }

    const [formState, setFormState] = useState({first_name: '', last_name: '', expertise: '', age: '', gender: '', address: '', user: '',});
    const [editForm, setEditForm] = useState({_id: '', first_name: '', last_name: '', expertise: '', age: '', gender: '', address: '', user: '',});

    const crudData = {
        crudTitle: "User",
        content: "Fill in the details for the new item you want to add."
    };

    const modalData = {
        title: 'Create New Instructor',
        content: 'Fill out the form below to create a new user.',
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

    const editData = {
        title: 'Edit Instructor',
        content: 'Fill out the form below to create a new user.',
        fields: [
          {
            label: 'First Name',
            type: 'text',
            name: 'first_name',
            placeholder: 'Enter First Name',
            className: 'input-field',
            value: editForm.first_name, 
            onChange: (e) => setEditForm({ ...editForm, first_name: e.target.value }),
            required: true,
            withForeign: false,

            label2: 'Last Name',
            type2: 'text',
            name2: 'last_name',
            placeholder2: 'Enter Last Name',
            value2: editForm.last_name, 
            onChange2: (e) => setEditForm({ ...editForm, last_name: e.target.value }),
            required2: true,
            col: true,
          },
          {
            label: 'Age',
            type: 'number',
            name: 'age',
            placeholder: 'Enter Age',
            value: editForm.age,
            onChange: (e) => setEditForm({ ...editForm, age: e.target.value }),
            required: true,
            withForeign: false,
          },
          {
            label: 'Gender',
            type: 'text',
            name: 'gender',
            placeholder: 'Enter Gender',
            value: editForm.gender,
            onChange: (e) => setEditForm({ ...editForm, gender: e.target.value }),
            required: true,
            withForeign: false,
          },
          {
            label: 'Address',
            type: 'text',
            name: 'address',
            placeholder: 'Enter Address',
            value: editForm.address,
            onChange: (e) => setEditForm({ ...editForm, address: e.target.value }),
            required: true,
            withForeign: false,
          },
          {
            label: 'User',
            type: 'select',
            name: 'user',
            placeholder: 'Enter User',
            value: editForm.user, 
            onChange: (e) => setEditForm({ ...editForm, user: e.target.value }),
            required: true,
            options: categoryOptions,
            requestFor: 'email',
            withForeign: false,
          },
        ]
      };

  useEffect(() => {
    fetchData('instructor', setInstructor)
    getOptionsSpecs()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createFunc('instructor', formState);

    const newInsturctor = {
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
    
    addToTable(setInstructor, newInsturctor)
    setFormState({first_name: '', last_name: '', expertise: '', age: '', gender: '', address: '', user: '',})
    setModalOpen(false);
  };

  const updateInstructor = async () => {
    const response = await updateFunc('instructor', editForm._id, editForm)
    const newInstructor = {
        _id: response.data.data._id,
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        expertise: editForm.expertise,
        age: editForm.age,
        gender: editForm.gender,
        address: editForm.address,
        user: editForm.user,
        newData: true,
      };

      addAndRemoveToTable(setInstructor, newInstructor)
      setFormState({first_name: '', last_name: '', expertise: '', age: '', gender: '', address: '', user: '',})
      setEditModal(false);
  }

  const deleteInstructor = async (id) => {
    deleteFunc('instructor', id, setInstructor)
  }

  const loadDataById = async (id) => {
    const response = await fetchDataN('instructor', id)
    setEditForm(response.data.data)
  }
    
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
          crudData={crudData}
          modalData={modalData}
          handleSubmit={handleSubmit}
          apiData={instructor} 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          crudType={"instructor"}
          deleteHandler={deleteInstructor}
          editData={editData}
          editModal={editModal}
          setEditModal={setEditModal}
          getDataFromId={loadDataById}
          updateForm={updateInstructor}
        />
    </div>
  )
}

export default InstructorCrud