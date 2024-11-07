import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { fetchData, fetchDataN, createFunc, addToTable, updateFunc, addAndRemoveToTable, deleteFunc } from './Utils/CrudUtils'

const CategoryCrud = () => {

  // Category

  const [modalOpenCat, setModalOpenCat] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mode, setMode] = useState()
  const [desc, setDesc] = useState()
  const [crudMode, setCrudMode] = useState('read')
  const [catFormState, catSetFormState] = useState({
    title: '',
    description: '',
  });

  const resetFormCat = () => {
    catSetFormState({
      title: '',
      description: '',
    })
  }

  const handleSubmitCat = (event) => {
    event.preventDefault()
    if (crudMode == 'create') {
      handleCreateCat()
    } else if (crudMode == "update") {
      handleUpdateCat()
    }
  }

  const handleCreateCat = async () => {
    const response = await createFunc('category', catFormState);

    const newCategory = {
      _id: response.data.data._id,
      title: catFormState.title,
      description: catFormState.description,
      newData: true
    };

    addToTable(setCategories, newCategory)
    resetFormCat()
    setModalOpenCat(false);
    fetchData('category', setCatOps)
  };

  const handleUpdateCat = async () => {
    const response = await updateFunc('category', catFormState._id, catFormState)
    const newCat = {
      _id: response.data.data._id,
      title: catFormState.title,
      description: catFormState.description,
      newData: true
    };

    addAndRemoveToTable(setCategories, newCat)
    resetFormCat()
    setModalOpenCat(false);
    fetchData('category', setCatOps)
  }

  const deleteCategory = async (id) => {
    deleteFunc('category', id, setCategories)
    fetchData('category', setCatOps)
  }

  const loadCreateModalCat = () => {
    resetFormCat()
    setCrudMode('create')
    setMode("Create Category")
    setDesc("Placeholder")
    setModalOpenCat(true)
  }

  const loadEditModalCat = async (id) => {
    resetFormCat()
    setCrudMode('update')
    const response = await fetchDataN('category', id)
    catSetFormState(response.data.data)
    setMode("Edit Cateogory")
    setDesc("Placeholder")
    setModalOpenCat(true)
  }

  const closeModalsCat = () => {
    setModalOpenCat(false)
  }

  const categoryData = {
    title: mode,
    content: desc,
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

  // Specialization

  const [specs, setSpecs] = useState([]);
  const [specModalOpen, specSetModalOpen] = useState(false);
  const [catOps, setCatOps] = useState(null);
  const [flattenedData, setFlattenedData] = useState()
  const [foreignHold, setForeignHold] = useState()

  useEffect(() => {
    fetchData('category', setCategories)
    fetchData('specialization', setSpecs)
    fetchData('category', setCatOps)
  }, [])

  const [specFormState, specSetFormState] = useState({
    title: '',
    description: '',
    category: ''
  });

  const resetFormSpec = () => {
    specSetFormState({
      title: '',
      description: '',
      category: ''
    })
  }

  useEffect(() => {
    console.log(catOps)
  }, [catOps])

  const specsData = {
    title: mode,
    content: desc,
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
        onChange: (e) => 
          {specSetFormState({ ...specFormState, category: e.target.value })
          setForeignHold(e.target.selectedOptions[0].text)},
        required: true,
        options: catOps,
        requestFor: 'title',
        withForeign: true,
      },
    ]
  };

  useEffect(() => {
    console.log(specs)
    if (specs.length > 0) {
      const flattened = specs.map(item => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        category: (typeof item.category === 'string')
          ? item.category
          : (item.category && typeof item.category === 'object' && item.category.title)
            ? item.category.title
            : 'N/A',

        createdAt: new Date(item.createdAt).toLocaleString(),
        updatedAt: new Date(item.updatedAt).toLocaleString(),
      }));
      setFlattenedData(flattened);
    }
  }, [specs]);


  const handleSubmitSpec = (event) => {
    event.preventDefault()
    if (crudMode == 'create') {
      specHandleSubmit()
    } else if (crudMode == "update") {
      updateSpec()
    }
  }

  const specHandleSubmit = async () => {
    const response = await createFunc('specialization', specFormState);

    const newSpecs = {
      _id: response.data.data._id,
      title: specFormState.title,
      description: specFormState.description,
      category: foreignHold,
      newData: true
    };

    addToTable(setSpecs, newSpecs)
    resetFormSpec()
    specSetModalOpen(false);
  };

  const updateSpec = async () => {
    const response = await updateFunc('specialization', specFormState._id, specFormState)
    const newSpec = {
      _id: response.data.data._id,
      title: specFormState.title,
      description: specFormState.description,
      category: foreignHold,
      newData: true
    };

    addAndRemoveToTable(setSpecs, newSpec)
    resetFormSpec()
    specSetModalOpen(false);
  }

  const deleteSpec = async (id) => {
    deleteFunc('specialization', id, setSpecs)
  }

  const loadCreateModalSpec = () => {
    resetFormSpec()
    setCrudMode('create')
    setMode("Create Specialization")
    setDesc("Placeholder")
    specSetModalOpen(true)
  }

  const loadEditModalSpec = async (id) => {
    resetFormSpec()
    setCrudMode('update')
    const response = await fetchDataN('specialization', id)
    specSetFormState(response.data.data)
    setMode("Edit Specialization")
    setDesc("Placeholder")
    specSetModalOpen(true)
  }

  const closeModalsSpec = () => {
    specSetModalOpen(false)
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
          modalData={categoryData}
          handleSubmit={handleSubmitCat}
          apiData={categories}
          modalOpen={modalOpenCat}
          setModalOpen={setModalOpenCat}
          crudType={"category"}
          deleteHandler={deleteCategory}
          loadEditModal={loadEditModalCat}
          closeModals={closeModalsCat}
          loadCreateModal={loadCreateModalCat}
        />

        <Datatable
          modalData={specsData}
          handleSubmit={handleSubmitSpec}
          apiData={flattenedData}
          modalOpen={specModalOpen}
          setModalOpen={specSetModalOpen}
          crudType={"specialization"}
          deleteHandler={deleteSpec}
          loadEditModal={loadEditModalSpec}
          closeModals={closeModalsSpec}
          loadCreateModal={loadCreateModalSpec}
        />
      </div>

    </div>
  )
}

export default CategoryCrud