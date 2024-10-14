import CreateModal from './CreateModal';
import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { BiSolidTrashAlt, BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { RiAlarmWarningFill } from "react-icons/ri";

import { MdModeEdit } from "react-icons/md";
import { IoMdTrash, IoMdEye, IoMdAlert } from "react-icons/io";

import { CSSTransition } from 'react-transition-group';
import axiosInstance from 'axios'
import { useAxiosLoader } from 'use-axios-loader'

import loaderGif from '../assets/loader-main.gif';

const Datatable = ({ crudData = { crudTitle: 'Default Title', content: 'Default content message.' },
        modalData,
        handleSubmit, 
        apiData,
        modalOpen, 
        setModalOpen,
        crudType,
        deleteHandler,
        editData,  }) => {

    const [loading] = useAxiosLoader(axiosInstance)
    const [delayedLoading, setDelayedLoading] = useState(true); 
    const delayDuration = 1000; 

    const [loadedData, setLoadedData] = useState(null)

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

    const apiList = apiData
    console.log("modalData", modalData)

    const loadModalCreate = () => {
        console.log("passedData", modalData)
        setLoadedData(modalData)
        setModalOpen(true)
    }

    const loadModalEdit = () => {
        setLoadedData(editData)
        setModalOpen(true)
    }
    
    return (
        <div className="data-table">
            <div className="data-table__controls">
                <div className="search">
                    <input type="text" placeholder='Search...' />
                </div>
                <div className="data-controls">
                    <button
                        className='prime-button'
                        onClick={() => {
                            loadModalCreate()
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
                        <CreateModal modalData={modalData} setOpenModal={setModalOpen} handleSubmit={handleSubmit} />
                    </CSSTransition>

                </div>
            </div>

            <div className="data-table__container table-container">
            {delayedLoading
                ? <div className='loader-container'>
                    <img className='loader-img' src={loaderGif} alt="Loading..." />
                </div>
                : 
                    <table>
                        <thead>
                            <tr>
                                {!(crudType == undefined) ? (
                                    modalData.fields).map((field, index) => (
                                        !(field.col == undefined) && field.col == true ? (
                                            <th key={index}>Name</th>
                                        ) : (
                                            <th key={index}>{field.label}</th>
                                        )
                                    )
                                ) : (
                                    <th></th>
                                )}
                            <th className='table-control'>Controls</th>
                            </tr>
                        </thead>
                        
                                <tbody>
                                    {apiList.length > 0 ? (
                                        apiList.map((data, index) => (
                                            <tr key={data._id} className={data.newData ? 'pop-in' : ''}>
                                                {modalData.fields.map((field, index) => (
                                                    field.withForeign ? (
                                                        data[field.name] == null ? (
                                                            <td>No Data Assigned.</td>
                                                        ) : (
                                                            <td>{data[field.requestFor]}</td>
                                                        )
                                                    ) : (
                                                        <td>{data[field.name]}</td>
                                                    )
                                                    
                                                ))}
                                                <td className='table-control'>
                                                    <span className='table-icon prime-icon' onClick={() => loadModalEdit()}><MdModeEdit /></span>
                                                    <span className='table-icon neutral-icon'><IoMdEye /></span>
                                                    <span className='table-icon warning-icon'><IoMdAlert /></span>
                                                    <span className='table-icon danger-icon' onClick={() => deleteHandler(data._id)}><IoMdTrash /></span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>No Data Available.</tr>
                                    )}
                                </tbody>
                        
                    </table>
            }
            </div>
        </div>
    );
};

export default Datatable;