import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { fetchData, createFunc, addToTable, deleteFunc, fetchDataN, updateFunc, addAndRemoveToTable } from './Utils/CrudUtils'

const CourseCrud = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [instructorOps, setInstructorOps] = useState(null);
  const [specOps, setSpecOps] = useState(null);
  const [courses, setCourses] = useState([])
  const [flattenedData, setFlattenedData] = useState([])
  const [mode, setMode] = useState()
  const [desc, setDesc]= useState()
  const [crudMode, setCrudMode] = useState('read')

  const deleteCourse = async (id) => {
    deleteFunc('course', id, setCourses)
  }

  useEffect(() => {
    fetchData('course', setCourses)
    fetchData('instructor', setInstructorOps)
    fetchData('specialization', setSpecOps)
  }, [])

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    specialization: '',
    instructor: '',
    images: '',
  });

  const resetForm = () => {
    setFormState({
      title: '',
      description: '',
      price: '',
      specialization: '',
      instructor: '',
      images: '',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(crudMode == 'create') {
      handleCreate()
    } else if(crudMode == "update") {
      handleUpdate()
    }
  }

  const handleCreate = async () => {
    try {
      const res = await createFunc('course', formState)
      // console.log(res.data.data)
      const newData = {
        _id: res.data.data._id,
        title: res.data.data.title,
        description: res.data.data.description,
        price: res.data.data.price,
        specialization: res.data.data.specialization[0].title,
        instructor: res.data.data.instructor[0].last_name,
        newData: true
      }
      addToTable(setFlattenedData, newData)
      setModalOpen(false)
    } catch (e) {
      toast.error("Unsuccessful: Course Not Created.")
    }
  };

  const handleUpdate = async () => {
    const res = await updateFunc('course', formState._id, formState)
    const newCourse = {
      _id: res.data.data._id,
      title: res.data.data.title,
      description: res.data.data.description,
      price: res.data.data.price,
      specialization: res.data.data.specialization[0].title,
      instructor: res.data.data.instructor[0].last_name,
      newData: true
    };

    addAndRemoveToTable(setFlattenedData, newCourse)
    resetForm()
    setModalOpen(false);
  }

  const loadCreateModal = () => {
    resetForm()
    setCrudMode('create')
    setMode("Create Course")
    setDesc("Placeholder")
    setModalOpen(true)
  }

  const loadEditModal = async (id) => {
    resetForm()
    setCrudMode('update')
    const response = await fetchDataN('course', id)
    setFormState(response.data.data)
    setMode("Edit Course")
    setDesc("Placeholder")
    setModalOpen(true)
  }

  const closeModals = () => {
    setModalOpen(false)
  }

  const modalData = {
    title: mode,
    content: desc,
    fields: [
      {
        label: 'Title',
        type: 'text',
        name: 'title',
        placeholder: 'Enter title',
        value: formState.title,
        onChange: (e) => setFormState({ ...formState, title: e.target.value }),
        required: true,
      },
      {
        label: 'Description',
        type: 'text',
        name: 'description',
        placeholder: 'Enter description',
        value: formState.description,
        onChange: (e) => setFormState({ ...formState, description: e.target.value }),
        required: true,
      },
      {
        label: 'Price',
        type: 'number',
        name: 'price',
        placeholder: 'Enter price',
        value: formState.price,
        onChange: (e) => setFormState({ ...formState, price: e.target.value }),
        required: true,
      },
      {
        label: 'Specialization',
        type: 'select',
        name: 'specialization',
        placeholder: 'Enter specialization',
        value: formState.specialization,
        onChange: (e) => setFormState({ ...formState, specialization: e.target.value }),
        required: true,
        options: specOps,
        requestFor: 'title',
        withForeign: true,
        flattened: true
      },
      {
        label: 'Instructor',
        type: 'select',
        name: 'instructor',
        placeholder: 'Enter instructor',
        value: formState.instructor,
        onChange: (e) => setFormState({ ...formState, instructor: e.target.value }),
        required: true,
        options: instructorOps,
        requestFor: 'last_name',
        withForeign: true,
        flattened: true
      },
    ]
  };

  useEffect(() => {
    if (courses.length > 0) {
      const flattened = courses.map(item => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        price: item.price,
        instructor: (typeof item.instructor === 'string')
          ? item.instructor
          : (Array.isArray(item.instructor) && item.instructor.length > 0)
            ? item.instructor[0].last_name
            : 'N/A',
        specialization: (typeof item.specialization === 'string')
          ? item.specialization
          : (Array.isArray(item.specialization) && item.specialization.length > 0)
            ? item.specialization[0].title
            : 'N/A',
        createdAt: new Date(item.createdAt).toLocaleString(),
        updatedAt: new Date(item.updatedAt).toLocaleString(),
      }));
      setFlattenedData(flattened);
    }
  }, [courses]);

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
        crudType={"course"}
        deleteHandler={deleteCourse}
        loadEditModal={loadEditModal}
        closeModals={closeModals}
        loadCreateModal={loadCreateModal}
      />
    </div>
  )
}

export default CourseCrud