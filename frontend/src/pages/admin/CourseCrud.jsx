import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'

const CourseCrud = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formState);
};

const [modalOpen, setModalOpen] = useState(false);

// Courses
// 	id
// 	title
// 	description
// 	price
// 	specialization --> new collection
// 	author	--> new collection
// 	images	--> new collection

const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    specialization: '',
    author: '',
    iamges: '',
  });

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
        type: 'email',
        name: 'description',
        placeholder: 'Enter description',
        value: formState.description,
        onChange: (e) => setFormState({ ...formState, description: e.target.value }),
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
      },
      {
        label: 'Instructor',
        type: 'select',
        name: 'instructor',
        placeholder: 'Enter instructor',
        value: formState.instructor,
        onChange: (e) => setFormState({ ...formState, instructor: e.target.value }),
        required: true,
      },
    ]
  };

  const [courses, setCourses] = useState([])
  const deleteCourse = () => {

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
        apiData={courses} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        crudType={"course"}
        deleteHandler={deleteCourse}
      />
</div>
  )
}

export default CourseCrud