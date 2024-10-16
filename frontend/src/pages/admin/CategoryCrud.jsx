import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { FaArrowTrendUp, FaArrowTrendDown  } from "react-icons/fa6";
import { fetchData, fetchDataN, createFunc, addToTable, updateFunc, addAndRemoveToTable, deleteFunc } from './Utils/CrudUtils'

const CategoryCrud = () => {
  const [categoryOptions, setCategoryOptions] = useState({})
  const [categories, setCategories] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [catModalOpen, catSetModalOpen] = useState(false);
  const [specModalOpen, specSetModalOpen] = useState(false);
  const [catEditModalOpen, catEditSetModalOpen] = useState(false);
  const [specEditModalOpen, specEditSetModalOpen] = useState(false);

  const [catFormState, catSetFormState] = useState({
    title: '',
    description: '',
  });

  const [catEditForm, setCatEditForm] = useState({
    title: '',
    description: '',
  });

const [specFormState, specSetFormState] = useState({
    title: '',
    description: '',
    category: ''
  });

const [specEditForm, setSpecEditForm] = useState({
    title: '',
    description: '',
    category: ''
  });

const crudData = {
    crudTitle: "User",
    content: "Fill in the details for the new item you want to add."
};

const categoryData = {
    title: 'Create Category',
    content: 'Fill out the form below to create a new user.',
    fields: [
      {
        label: 'Title',
        type: 'text',
        name: 'title',
        placeholder: 'Enter Title',
        value: catFormState.title, 
        onChange: (e) => catSetFormState({ ...catFormState, title: e.target.value }),
        required: true,
      },
      {
        label: 'Description',
        type: 'textarea',
        name: 'description',
        placeholder: 'Enter Description',
        value: catFormState.description, 
        onChange: (e) => catSetFormState({ ...catFormState, description: e.target.value }),
        required: true,
      },
    ]
  };

const editCatData = {
    title: 'Edit Category',
    content: 'Fill out the form below to create a new user.',
    fields: [
      {
        label: 'Title',
        type: 'text',
        name: 'title',
        placeholder: 'Enter Title',
        value: catEditForm.title, 
        onChange: (e) => setCatEditForm({ ...catEditForm, title: e.target.value }),
        required: true,
      },
      {
        label: 'Description',
        type: 'textarea',
        name: 'description',
        placeholder: 'Enter Description',
        value: catEditForm.description, 
        onChange: (e) => setCatEditForm({ ...catEditForm, description: e.target.value }),
        required: true,
      },
    ]
  };

const specsData = {
    title: 'Create New Specialization',
    content: 'Fill out the form below to create a new specialization.',
    fields: [
      {
        label: 'Title',
        type: 'text',
        name: 'title',
        placeholder: 'Enter Title',
        value: specFormState.title,
        onChange: (e) => specSetFormState({ ...specFormState, title: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Description',
        type: 'textarea',
        name: 'description',
        placeholder: 'Enter Description',
        value: specFormState.description, 
        onChange: (e) => specSetFormState({ ...specFormState, description: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Category',
        type: 'select',
        name: 'category',
        placeholder: 'Enter Category',
        value: specFormState.category, 
        onChange: (e) => specSetFormState({ ...specFormState, category: e.target.value }),
        required: true,
        options: categoryOptions,
        requestFor: 'title',
        withForeign: true,
      },
    ]
  };

const editSpecData = {
    title: 'Edit Specialization',
    content: 'Fill out the form below to create a new specialization.',
    fields: [
      {
        label: 'Title',
        type: 'text',
        name: 'title',
        placeholder: 'Enter Title',
        value: specEditForm.title,
        onChange: (e) => setSpecEditForm({ ...specEditForm, title: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Description',
        type: 'textarea',
        name: 'description',
        placeholder: 'Enter Description',
        value: specEditForm.description, 
        onChange: (e) => setSpecEditForm({ ...specEditForm, description: e.target.value }),
        required: true,
        withForeign: false,
      },
      {
        label: 'Category',
        type: 'select',
        name: 'category',
        placeholder: 'Enter Category',
        value: specEditForm.category, 
        onChange: (e) => setSpecEditForm({ ...specEditForm, category: e.target.value }),
        required: true,
        options: categoryOptions,
        requestFor: 'title',
        withForeign: true,
      },
    ]
  };

  useEffect(() => {
    fetchData('category', setCategories)
    fetchData('specialization', setSpecs)
    fetchData('category', setCategoryOptions)
  }, [])

  const catHandleSubmit = async (event) => {
    event.preventDefault();
    const response = await createFunc('category', catFormState);

    const newCategory = {
      _id: response.data.data._id,
      title: catFormState.title,
      description: catFormState.description,
      newData: true
    };
    
    addToTable(setCategories, newCategory)
    catSetFormState({title: '', description: '',})
    catSetModalOpen(false);
  };

  const specHandleSubmit = async (event) => {
    event.preventDefault();
    const response = await createFunc('specialization', specFormState);

    const newSpecs = {
      _id: response.data.data._id,
      title: specFormState.title,
      description: specFormState.description,
      category: specFormState.category,
      newData: true
    };
    
    addToTable(setSpecs, newSpecs)
    specSetFormState({title: '', description: '', category: ''})
    specSetModalOpen(false);
  };

  const updateCategory = async () => {
    const response = await updateFunc('category', catEditForm._id, catEditForm)
    const newCat = {
        _id: response.data.data._id,
        title: catEditForm.title,
        description: catEditForm.description,
        newData: true
      };

      addAndRemoveToTable(setCategories, newCat)
      setCatEditForm({ title: '', description: '',}); 
      catEditSetModalOpen(false);
  }

  const updateSpec = async () => {
    const response = await updateFunc('specialization', specEditForm._id, specEditForm)
    const newSpec = {
        _id: response.data.data._id,
        title: specEditForm.title,
        description: specEditForm.description,
        category: specEditForm.category,
        newData: true
      };

      addAndRemoveToTable(setSpecs, newSpec)
      setSpecEditForm({ title: '', description: '', category: ''}); 
      specEditSetModalOpen(false);
  }

  const deleteCategory = async (id) => {
    deleteFunc('category', id, setCategories)
  }

  const deleteSpec = async (id) => {
    deleteFunc('specialization', id, setSpecs)
  }

  const loadDataByIdCat = async (id) => {
    const response = await fetchDataN('category', id)
    setCatEditForm(response.data.data)
    
  }

  const loadDataByIdSpec = async (id) => {
    const response = await fetchDataN('specialization', id)
    setSpecEditForm(response.data.data)
    console.log(specEditForm)
  }

return (
<div className="main-panel__column">
    <div className="md-thumbs">
      <div className="thumb">
          <div className="thumb-title">Total Category</div>
          <div className="display-data">124</div>
          <div className="th-footer">
            <div>Last Added: <span className='warning'>09/10/2024</span></div>
            <div className='center-align success expand'><FaArrowTrendUp /> &nbsp; +25</div>
          </div>
      </div>
      <div className="thumb">
          <div className="thumb-title">Most Popular Category</div>
          <div className="display-data">Development</div>
          <div className="th-footer">
            <div>Students: <span className='warning'>1244</span></div>
            <div className='center-align success expand'><FaArrowTrendUp /> &nbsp; +25</div>
          </div>
      </div>
      <div className="thumb">
      <div className="thumb-title">Total Specialization</div>
          <div className="display-data">124</div>
          <div className="th-footer">
            <div>Last Added: <span className='warning'>09/10/2024</span></div>
            <div className='center-align danger expand'><FaArrowTrendDown /> &nbsp; -2</div>
          </div>
      </div>
      <div className="thumb">
          <div className="thumb-title">Most Popular Specialization</div>
          <div className="display-data">Web Development</div>
          <div className="th-footer">
            <div>Students: <span className='warning'>1024</span></div>
            <div className='center-align success expand'><FaArrowTrendUp /> &nbsp; +25</div>
          </div>
      </div>
    </div>
    <div className="dual-rows">
     
      <Datatable 
        crudData={crudData}
        modalData={categoryData}
        handleSubmit={catHandleSubmit}
        apiData={categories} 
        modalOpen={catModalOpen} 
        setModalOpen={catSetModalOpen}
        crudType={"category"}
        deleteHandler={deleteCategory}
        editData={editCatData}
        editModal={catEditModalOpen}
        setEditModal={catEditSetModalOpen}
        getDataFromId={loadDataByIdCat}
        updateForm={updateCategory}
      />


      <Datatable 
        crudData={crudData}
        modalData={specsData}
        handleSubmit={specHandleSubmit}
        apiData={specs} 
        modalOpen={specModalOpen} 
        setModalOpen={specSetModalOpen}
        crudType={"specialization"}
        deleteHandler={deleteSpec}
        editData={editSpecData}
        editModal={specEditModalOpen}
        setEditModal={specEditSetModalOpen}
        getDataFromId={loadDataByIdSpec}
        updateForm={updateSpec}
      />
    </div>

</div>
  )
}

export default CategoryCrud