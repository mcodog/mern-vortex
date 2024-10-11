import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { FaArrowTrendUp, FaArrowTrendDown  } from "react-icons/fa6";

const CategoryCrud = () => {

  const [categoryOptions, setCategoryOptions] = useState({})
  const getOptionsSpecs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/category")
      console.log(response.data.data)
      setCategoryOptions(response.data.data)
    } catch (error) {
      console.log("Error while fetching Category Data", error)
    }
  }

const [catModalOpen, catSetModalOpen] = useState(false);
const [specModalOpen, specSetModalOpen] = useState(false);
const [catFormState, catSetFormState] = useState({
    title: '',
    description: '',
  });
const [specFormState, specSetFormState] = useState({
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
        value: catFormState.name, 
        onChange: (e) => catSetFormState({ ...catFormState, title: e.target.value }),
        required: true,
      },
      {
        label: 'Description',
        type: 'textarea',
        name: 'description',
        placeholder: 'Enter Description',
        value: catFormState.name, 
        onChange: (e) => catSetFormState({ ...catFormState, description: e.target.value }),
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
      },
      {
        label: 'Description',
        type: 'textarea',
        name: 'description',
        placeholder: 'Enter Description',
        value: specFormState.description, 
        onChange: (e) => specSetFormState({ ...specFormState, description: e.target.value }),
        required: true,
      },
      {
        label: 'Category',
        type: 'select',
        name: 'category',
        placeholder: 'Enter Category',
        value: specFormState.category, 
        onChange: (e) => specSetFormState({ ...specFormState, category: e.target.value }),
        required: true,
        options: categoryOptions
      },
    ]
  };

  const [categories, setCategories] = useState([]);
  const fetchCategories = async() => {
    try {
      const response = await axios.get("http://localhost:8000/api/category")
      setCategories(response.data.data)
    } catch (error) {
      console.log("Error while fetching Category Data", error)
    }
  }

  const [specs, setSpecs] = useState([]);
  const fetchSpecs = async() => {
    try {
      const response = await axios.get("http://localhost:8000/api/specialization")
      setSpecs(response.data.data)
      // console.log("Data: ", response.data.data)
    } catch (error) {
      console.log("Error while fetching Specialization Data", error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchSpecs()
    getOptionsSpecs()
  }, [])

  const catHandleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/category", catFormState);
      console.log("Category created successfully.", response);
      toast.success(response.data.message, { position: "top-right" })

      const newCategory = {
        _id: response.data.data._id,
        title: catFormState.title,
        description: catFormState.description,
        newData: true
    };

    setCategories((prevCategories) => [newCategory, ...prevCategories]);
      catSetFormState({ title: '', description: '' }); 
      catSetModalOpen(false);
      getOptionsSpecs()
      setTimeout(() => {
        setCategories(prevCategories => 
            prevCategories.map(category => 
                category._id === newCategory._id ? { ...category, newData: false } : category
            )
        );
    }, 800);
    } catch (error) {
      console.log("Error creating category:", error);
    }
    // console.log(catFormState);
  };

  const specHandleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/specialization", specFormState);
      console.log("Specialization created successfully.", response);
      toast.success(response.data.message, { position: "top-right" })
      fetchSpecs(); 
      specSetFormState({ title: '', description: '', category: '' }); 
      specSetModalOpen(false);
    } catch (error) {
      console.log("Error creating category:", error);
    }
    console.log(specFormState);
  };

  const deleteCategory = async (categoryId) => {
    console.log("Init Delete")
    await axios.delete(`http://localhost:8000/api/category/${categoryId}`)
    .then((response) => {
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
      toast.success(response.data.message, {position:"top-right"})
    })
    
    .catch((error) => {
      console.log("Error in Category Delete", error)
    })
  }

  const deleteSpec = async (specId) => {
    console.log("Init Delete")
    await axios.delete(`http://localhost:8000/api/specialization/${specId}`)
    .then((response) => {
      setSpecs((prevSpecs) => prevSpecs.filter((specs) => specs._id !== specId));
      toast.success(response.data.message, {position:"top-right"})
    })
    
    .catch((error) => {
      console.log("Error in Specialization Delete", error)
    })
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
      />
    </div>

</div>
  )
}

export default CategoryCrud