import React from 'react'
import './styles/Modal.css'
import './styles/ModalAnims.css'

const CRUDModal = ({ setOpenModal, modalData: { title, content, fields }, handleSubmit, closeModals, imagesPreview, formik }) => {
  console.log(imagesPreview)
  return (
    <div
      className="modalBackground"
      onClick={() => {
        closeModals();
      }}
    >
      <div
        className="modal increase-modal fit-cont"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{content}</p>
        <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
          <rect x="0" y="0" fill="none" width="100%" height="100%" rx="3" ry="3"></rect>
        </svg>
        <form className="crud-form " onSubmit={handleSubmit}
        >
          {formik ? (
            fields.map((field, index) => (
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

                field.type == 'text' || field.type == 'textarea' || field.type == 'password' || field.type == 'email' || field.type == 'number' ? (
                  <div className="formik-group">
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
                        onBlur={formik.handleBlur}

                      />
                    </div>
                    {formik.touched[field.name] && formik.errors[field.name] ? (
                      <span className='error-span' style={{ color: 'red' }}>{formik.errors[field.name]}</span>
                    ) : null}
                  </div>

                ) : field.type == 'select' ? (
                  <div className="formik-group">
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
                        {field.options == undefined ? (
                          <option></option>
                        ) : (
                          field.options.map((option, index) => (
                            <option key={index} value={option._id}>{option[field.requestFor]}</option>
                          ))
                        )
                        }
                      </select>
                    </div>
                    {formik.touched[field.name] && formik.errors[field.name] ? (
                      <span className='error-span' style={{ color: 'red' }}>{formik.errors[field.name]}</span>
                    ) : null}
                  </div>

                ) : field.type == 'file' ? (
                  <div className="formik-group">
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
                        multiple
                      />
                    </div>
                  </div>

                ) : (
                  <div></div>
                )
            ))
          ) : (
            fields.map((field, index) => (
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

                field.type == 'text' || field.type == 'textarea' || field.type == 'password' || field.type == 'email' || field.type == 'number' ? (
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
                      {field.options == undefined ? (
                        <option></option>
                      ) : (
                        field.options.map((option, index) => (
                          <option key={index} value={option._id}>{option[field.requestFor]}</option>
                        ))
                      )
                      }
                    </select>
                  </div>
                ) : field.type == 'file' ? (
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
                      multiple
                    />
                  </div>
                ) : (
                  <div></div>
                )
            ))
          )


          }

          <div className="images-container">
            {
              Array.isArray(imagesPreview) && imagesPreview.length > 0 ? (
                imagesPreview.map((img) => {
                  // console.log(img)
                  return (
                    <div className="preview-container">
                      <img src={img} alt="" />
                    </div>
                  )
                })
              ) : (
                <div></div>
              )
            }
          </div>

          <div className="form-control">
            <span className='secondary-button' onClick={() => { closeModals() }}>Cancel</span>
            <button className='prime-button' type="submit">Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default CRUDModal