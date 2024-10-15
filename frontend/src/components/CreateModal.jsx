import React from 'react'
import './styles/Modal.css'
import './styles/ModalAnims.css'

const CreateModal = ({ setOpenModal, modalData: { title, content, fields }, handleSubmit, closeModals  }) => {
  console.log(fields)
  return (
    <div 
      className="modalBackground" 
      onClick={() => {
        closeModals();
      }}
    >
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{content}</p>
        <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
          <rect x="0" y="0" fill="none" width="100%" height="100%" rx="3" ry="3"></rect>
        </svg>
        <form className="crud-form" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            field.col ? (
              <div key={index} className="input-group-col">

                <div className="col">
                  <label>{field.label}</label>
                  <input 
                    type={field.type} 
                    name={field.name} 
                    placeholder={field.placeholder} 
                    value={field.value} 
                    onChange={field.onChange} 
                    required={field.required}
                    className={field.className}
                  />
                </div>

                <div className="col" key={field.name2}>
                  <label>{field.label2}</label>
                  <input 
                    type={field.type2} 
                    name={field.name2} 
                    placeholder={field.placeholder2} 
                    value={field.value2} 
                    onChange={field.onChange2} 
                    required={field.required2}
                    className={field.className2}
                  />
                </div>
              </div>
            ) :
            
            field.type == 'text' || field.type == 'textarea' || field.type == 'password' ||  field.type == 'email' || field.type == 'number' ?(
              <div key={field.name} className="input-group">
              <label>{field.label}</label>
              <input 
                type={field.type} 
                name={field.name} 
                placeholder={field.placeholder} 
                value={field.value} 
                onChange={field.onChange} 
                required={field.required}
                className={field.className}
              />
            </div>
            ) : field.type == 'select' ? (
              <div key={field.name} className="input-group">
                <label>{field.label}</label>
                <select 
                  type={field.type} 
                  name={field.name} 
                  placeholder={field.placeholder} 
                  value={field.value} 
                  onChange={field.onChange} 
                  required={field.required}
                  className={field.className}
                >
                  <option value="null">Choose an option</option>
                  { field.options == undefined ? (
                      <option></option>
                    ) : (
                        field.options.map((option, index) => (
                        <option key={index} value={option._id}>{option[field.requestFor]}</option>
                      ))
                    )
                  }
                </select>
              </div>
            ) : (
              <div></div>
            )
          ))}
          
          <div className="form-control">
            <span className='secondary-button' onClick={() => {closeModals()}}>Cancel</span>
            <button className='prime-button' type="submit">Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default CreateModal