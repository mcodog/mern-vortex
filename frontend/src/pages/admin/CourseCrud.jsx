import React, { useEffect, useState } from 'react'
import Datatable from '../../components/Datatable'
import axios from "axios"
import toast from 'react-hot-toast'
import { fetchData, createFunc, addToTable, deleteFunc, fetchDataN, updateFunc, addAndRemoveToTable, createFuncNoToast } from './Utils/CrudUtils'

import CRUDModal from '../../components/CRUDModal';
import { CSSTransition } from 'react-transition-group';
import axiosInstance from 'axios'
import { useAxiosLoader } from 'use-axios-loader'
import loaderGif from '../../assets/loader-main.gif';
import { FaPlus, FaTrash } from "react-icons/fa";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CourseCrud = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [instructorOps, setInstructorOps] = useState(null);
  const [specOps, setSpecOps] = useState(null);
  const [courses, setCourses] = useState([])
  const [flattenedData, setFlattenedData] = useState([])
  const [mode, setMode] = useState()
  const [desc, setDesc] = useState()
  const [crudMode, setCrudMode] = useState('read')
  const [imagesPreview, setImagesPreview] = useState()

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
    if (crudMode == 'create') {
      handleCreate()
    } else if (crudMode == "update") {
      handleUpdate()
    }
  }

  const handleCreate = async () => {
    if (formState.images !== '') {
      const uploadPromise = createFuncNoToast('course', formState)

      toast.promise(uploadPromise, {
        loading: 'Attempting to upload images...',
        success: 'Course created successfully!',
        error: 'Unsuccessful: Course Not Created.'
      });

      try {
        const res = await uploadPromise;
        const newData = {
          _id: res.data.data._id,
          title: res.data.data.title,
          description: res.data.data.description,
          price: res.data.data.price,
          specialization: res.data.data.specialization[0].title,
          instructor: res.data.data.instructor[0].last_name,
          newData: true
        };
        addToTable(setFlattenedData, newData);
        setModalOpen(false);
      } catch (e) {
        console.error("Error creating course:", e);
      }
    } else {
      try {
        const res = await createFunc('course', formState);
        const newData = {
          _id: res.data.data._id,
          title: res.data.data.title,
          description: res.data.data.description,
          price: res.data.data.price,
          specialization: res.data.data.specialization[0].title,
          instructor: res.data.data.instructor[0].last_name,
          newData: true
        };
        addToTable(setFlattenedData, newData);
        setModalOpen(false);
      } catch (e) {
        toast.error("Unsuccessful: Course Not Created.");
        console.error("Error creating course:", e);
      }
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

  const onChange = e => {
    const files = Array.from(e.target.files)
    const newImages = [];
    setImagesPreview([]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          newImages.push(reader.result);
        }
      }
      reader.readAsDataURL(file)
    })
    setFormState((prevState) => ({
      ...prevState,
      images: newImages,
    }));
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
      {
        label: 'Images',
        type: 'file',
        name: 'images',
        id: 'custom_file',
        onChange: (e) => onChange(e),
        required: false,
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


  const [loading] = useAxiosLoader(axiosInstance)
  const [delayedLoading, setDelayedLoading] = useState(true);
  const delayDuration = 1000;

  useEffect(() => {
    if (!loading) {
      const delayTimer = setTimeout(() => {
        setDelayedLoading(false);
      }, delayDuration);

      return () => clearTimeout(delayTimer);
    } else {
      setDelayedLoading(true);
    }
  }, [loading]);

  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const [checkedId, setCheckedId] = useState([]);

  const handleCheck = (id, isChecked) => {
    setCheckedId((prevCheckedId) => {
      if (isChecked) {
        return [...prevCheckedId, id];
      } else {
        return prevCheckedId.filter((item) => item !== id);
      }
    });
  };

  const bulkDelete = () => {
    try {
      checkedId.map((id) => {
        deleteFunc('course', id, setCourses)
      })
    } catch (e) {
      console.log(e)
    }
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
      <div className="data-table">
        <div className="data-table__controls">
          <div className="search">
            <input type="text" placeholder='Search...' />
          </div>
          <div className="data-controls">
            <span className='secondary-button' onClick={() => { bulkDelete() }}>
              <FaTrash />
              &nbsp; Delete
            </span>
            <button
              className='prime-button'
              onClick={() => {
                loadCreateModal()
              }}
            >
              <FaPlus /> &nbsp; Add New
            </button>

            <CSSTransition
              in={modalOpen}
              timeout={300}
              classNames="modal"
              unmountOnExit
            >
              <CRUDModal modalData={modalData} closeModals={closeModals} handleSubmit={handleSubmit} />
            </CSSTransition>
          </div>
        </div>

        <div className="data-table__container table-container">
          {delayedLoading
            ? <div className='loader-container'>
              <img className='loader-img' src={loaderGif} alt="Loading..." />
            </div>
            :
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center">
                      {/* <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      /> */}
                    </TableCell>

                    <TableCell>ID</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Specialization</TableCell>
                    <TableCell align="right">Instructor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flattenedData.map((row) => (
                    <Row key={row._id} row={row} handleCheck={handleCheck} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
      </div>
    </div>
  )
}

function Row(props) {
  const { row, handleCheck } = props;
  const [open, setOpen] = React.useState(false);
  console.log(row)
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={(e) => handleCheck(row._id, e.target.checked)}
          />
        </TableCell>
        <TableCell component="th" scope="row">{row._id}</TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.specialization}</TableCell>
        <TableCell align="right">{row.instructor}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CourseCrud