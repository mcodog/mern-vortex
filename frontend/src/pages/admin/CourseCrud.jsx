import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { fetchData, createFunc, addToTable, deleteFunc, fetchDataN } from './Utils/CrudUtils'

const CourseCrud = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [instructorOps, setInstructorOps] = useState(null);
  const [specOps, setSpecOps] = useState(null);
  const [courses, setCourses] = useState([])
  const [flattenedData, setFlattenedData] = useState([])
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: '',
    title: '',
    description: '',
    price: '',
    specialization: '',
    author: '',
    images: '',
  })

  const deleteCourse = async (id) => {
    // alert(id)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  const loadDataById = async (id) => {
    const res = await fetchDataN('course', id)
    // setFormState({
    //   _id: res.data.data._id,
    //   title: res.data.data.title,
    //   description: res.data.data.description,
    //   price: res.data.data.price,
    //   specialization: res.data.data.specialization[0]._id,
    //   instructor: res.data.data.instructor[0]._id,
    // })
  }

  const crudData = {
    crudTitle: "Course",
    content: "Fill in the details for the new item you want to add."
  };

  const modalData = {
    title: 'Create New Course',
    content: 'Fill out the form below to create a new course.',
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
        crudData={crudData}
        modalData={modalData}
        handleSubmit={handleSubmit}
        apiData={flattenedData}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        crudType={"course"}
        deleteHandler={deleteCourse}
        resetFormState={resetForm}
        editModal={editModal}
        setEditModal={setEditModal}
        getDataFromId={loadDataById}
      />
    </div>
  )
}

export default CourseCrud