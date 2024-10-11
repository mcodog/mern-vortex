import CustomModal from './CustomModal';
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { BiSolidTrashAlt, BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { RiAlarmWarningFill } from "react-icons/ri";

import { MdModeEdit } from "react-icons/md";
import { IoMdTrash, IoMdEye, IoMdAlert } from "react-icons/io";

const Datatable = ({ crudData = { crudTitle: 'Default Title', content: 'Default content message.' },
        modalData,
        handleSubmit, 
        apiData,
        modalOpen, 
        setModalOpen,
        crudType,
        deleteHandler,
        formFields }) => {

    const apiList = apiData
    // console.log(crudType)
    
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
                            setModalOpen(true);
                        }}
                    >
                        <FaPlus /> &nbsp; Add New
                    </button>

                    {modalOpen && <CustomModal modalData={modalData} setOpenModal={setModalOpen} handleSubmit={handleSubmit} />}
                </div>
            </div>

            <div className="data-table__container table-container">
                <table>
                    <thead>
                        <tr>
                            {!(crudType == undefined) ? (
                                modalData.fields).map((field, index) => (
                                    !(field.col == undefined) && field.col == true ? (
                                        <th key={field.name}>Name</th>
                                    ) : (
                                        <th key={field.name}>{field.label}</th>
                                    )
                                )
                            ) : (
                                <th></th>
                            )}
                        <th className='table-control'>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crudType == 'category' ? (
                            apiList.length > 0 ? (
                                apiList.map((data, index) => (
                                    <tr key={index} className={data.newData ? 'pop-in' : ''}>
                                        <td>{data.title}</td>
                                        <td>{data.description}</td>
                                        <td className='table-control'>
                                        {/* import { MdModeEdit } from "react-icons/md";
                                        import { IoMdTrash, IoMdEye, IoMdAlert } from "react-icons/io"; */}
                                            <span className='table-icon prime-icon'><MdModeEdit /></span>
                                            <span className='table-icon neutral-icon'><IoMdEye /></span>
                                            <span className='table-icon warning-icon'><IoMdAlert /></span>
                                            <span className='table-icon danger-icon' onClick={() => deleteHandler(data._id)}><IoMdTrash /></span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='full-width'>
                                    <td className='no-border'>No data available.</td>
                                </tr>
                            )
                        ) : crudType == 'specialization' ?  (
                            apiList.length > 0 ? (
                                apiList.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.title}</td>
                                        <td>{data.description}</td>
                                        {data.category == null ? (
                                            <td>No Category Assigned</td>
                                        ) : (
                                            <td>{data.category.title}</td>
                                        )}
                                        <td className='table-control'>
                                            <span className='table-icon prime-icon'><MdModeEdit /></span>
                                            <span className='table-icon neutral-icon'><IoMdEye /></span>
                                            <span className='table-icon warning-icon'><IoMdAlert /></span>
                                            <span className='table-icon danger-icon' onClick={() => deleteHandler(data._id)}><IoMdTrash /></span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='full-width'>
                                    <td className='no-border'>No data available.</td>
                                </tr>
                            )
                        
                        ) : crudType == 'user' ?  (
                            apiList.length > 0 ? (
                                apiList.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.email}</td>
                                        <td>{data.password}</td>
                                        <td>{data.role}</td>
                                        <td>{data.status}</td>
                                        <td className='table-control'>
                                            <span className='table-icon prime-icon'><MdModeEdit /></span>
                                            <span className='table-icon neutral-icon'><IoMdEye /></span>
                                            <span className='table-icon warning-icon'><IoMdAlert /></span>
                                            <span className='table-icon danger-icon' onClick={() => deleteHandler(data._id)}><IoMdTrash /></span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='full-width'>
                                    <td className='no-border'>No data available.</td>
                                </tr>
                            )
                        ): crudType == 'instructor' ?  (
                            apiList.length > 0 ? (
                                apiList.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.first_name} {data.last_name}</td>
                                        <td>{data.age}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.address}</td>
                                        <td className='table-control'>
                                            <span className='table-icon prime-icon'><MdModeEdit /></span>
                                            <span className='table-icon neutral-icon'><IoMdEye /></span>
                                            <span className='table-icon warning-icon'><IoMdAlert /></span>
                                            <span className='table-icon danger-icon' onClick={() => deleteHandler(data._id)}><IoMdTrash /></span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='full-width'>
                                    <td className='no-border'>No data available.</td>
                                </tr>
                            )
                        ) : (
                            <div></div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Datatable;