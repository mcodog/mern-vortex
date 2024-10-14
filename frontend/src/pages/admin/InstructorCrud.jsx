import React, { useState, useEffect } from 'react'
import Datatable from '../../components/Datatable';
import { deleteInstructor } from '../../../../backend/controllers/instructor.controller';
import axios from "axios"
import toast from 'react-hot-toast'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const InstructorCrud = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState({})
  const getOptionsSpecs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user")
      console.log(response.data.data)
      setCategoryOptions(response.data.data)
    } catch (error) {
      console.log("Error while fetching Category Data", error)
    }
  }

    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        expertise: '',
        age: '',
        gender: '',
        address: '',
        user: '',
      });

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

      const [instructor, setInstructor] = useState([])
      const fetchInstructor = async() => {
        try {
          const response = await axios.get("http://localhost:8000/api/instructor")
          setInstructor(response.data.data)
          // console.log(response.data.data)
        } catch (error) {
          console.log("Error while fetching User Data", error)
        }
      }

      useEffect(() => {
        fetchInstructor()
        getOptionsSpecs()
      }, [])

      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        try {
          const response = await axios.post("http://localhost:8000/api/instructor", formState);
          console.log("Instructor created successfully.", response);
          toast.success(response.data.message, { position: "top-right" })

          const newUser = {
            _id: response.data.data._id,
            first_name: formState.email,
            last_name: formState.password,
            age: formState.role,
            gender: formState.status,
            address: formState.status,
            user: formState.status,
            newData: true
        };

        setUsers((prevUser) => [newUser, ...prevUser]);
          setFormState({ first_name: '', last_name: '', age: '', gender: '', address: '', user: '' }); 
          setModalOpen(false);

          setTimeout(() => {
            setUsers(prevUser => 
                prevUser.map(user => 
                  user._id === newUser._id ? { ...user, newData: false } : user
                )
            );
        }, 800);
        } catch (error) {
          console.log("Error creating User:", error);
        }
        console.log(formState);
      };

      const deleteInstructor = async (userId) => {
        console.log("Init Delete")
        await axios.delete(`http://localhost:8000/api/instructor/${userId}`)
        .then((response) => {
          setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
          toast.success(response.data.message, {position:"top-right"})
        })
        
        .catch((error) => {
          console.log("Error in Instructor Delete", error)
        })
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
        />
    </div>
  )
}

export default InstructorCrud