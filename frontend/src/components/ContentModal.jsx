import React, { useState, useEffect } from 'react'
import './styles/Modal.css'
import './styles/ModalAnims.css'
import axios from 'axios'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, MenuItem, Select, InputLabel, FormControl, Grid, Divider } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

const steps = ['Add General Information', 'Design Content', 'Summary'];

const ContentModal = ({ data, closeModals }) => {
  const [course, setCourse] = useState(data.data.data)
  const [contentCount, setContentCount] = useState(0)
  const [formData, setFormData] = useState({
    contentType: '',
    title: '',
    description: '',
    duration: '',
    notes: '',
    chapters: [{ title: '', description: '' }],
    questions: [{ question: '', options: '', correctAnswer: '' }],
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: '', description: '' }],
    });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', options: '', correctAnswer: '' }],
    });
  };

  const handleChangeChapters = (e, index) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[index][name] = value;
    setFormData({
      ...formData,
      chapters: updatedChapters,
    });
  };

  const handleChangeQuestions = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][name] = value;
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div
      className="modalBackground"
      onClick={() => {
        closeModals();
      }}
    >
      <div
        className="modal increase-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Adding content for {course.title}</h2>
        <p>Fill out the following information to add a content for {ContentModal.title}</p>
        <div className="stepper-container">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : activeStep == 0 ? (
              <div className="active-step__container">
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {/* Content Type */}
                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Content Type</InputLabel>
                      <Select
                        name="contentType"
                        value={formData.contentType}
                        onChange={handleChange}
                        label="Content Type"
                      >
                        <MenuItem value="Learning Module">Learning Module</MenuItem>
                        <MenuItem value="Examination Module">Examination Module</MenuItem>
                        <MenuItem value="Video Discussion">Video Discussion</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Title */}
                  <Grid item xs={4}>
                    <TextField
                      label="Title"
                      variant="outlined"
                      fullWidth
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Duration */}
                  <Grid item xs={4}>
                    <TextField
                      label="Duration (In Minutes)"
                      variant="outlined"
                      fullWidth
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                {/* Description */}
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  sx={{ mb: 2, maxHeight: 250 }}
                  multiline
                  rows={3}
                />

                {/* Notes */}
                <TextField
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  sx={{ mb: 2, maxHeight: 100 }}
                  multiline
                  rows={2}
                />
                <React.Fragment>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}
                    <Button className='contained-prime' variant="contained" onClick={handleNext} disabled={formData.contentType === ''}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              </div>
            ) : activeStep == 1 ? (
              <div className="active-step__container">
                {
                  formData.contentType == 'Learning Module' ? (
                    <div className='maxed-container'>
                      {formData.chapters.map((chapter, index) => (
                        <div key={index}>
                          <TextField
                            label="Chapter Title"
                            variant="outlined"
                            fullWidth
                            name="title"
                            value={chapter.title}
                            onChange={(e) => handleChangeChapters(e, index)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            label="Chapter Content"
                            variant="outlined"
                            fullWidth
                            name="description"
                            value={chapter.description}
                            onChange={(e) => handleChangeChapters(e, index)}
                            sx={{ mb: 2, maxHeight: 250 }}
                            multiline
                            rows={3}
                          />
                        </div>
                      ))}
                      <div className="collapsible-table__controls">
                        <button className="add-content" onClick={handleAddChapter}>
                          <FaPlus /> &nbsp; Add New Chapter
                        </button>
                      </div>
                    </div>
                  ) : formData.contentType == 'Examination Module' ? (
                    <div className='maxed-container'>
                      {formData.questions.map((item, index) => (
                        <div key={index}>
                          <TextField
                            label="Question"
                            variant="outlined"
                            fullWidth
                            name="question"
                            value={item.question}
                            onChange={(e) => handleChangeQuestions(e, index)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            label="Options (Separate with ',')"
                            variant="outlined"
                            fullWidth
                            name="options"
                            value={item.options}
                            onChange={(e) => handleChangeQuestions(e, index)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            label="Correct Answer"
                            variant="outlined"
                            fullWidth
                            name="correctAnswer"
                            value={item.correctAnswer}
                            onChange={(e) => handleChangeQuestions(e, index)}
                            sx={{ mb: 2 }}
                          />
                        </div>
                      ))}
                      <div className="collapsible-table__controls">
                        <button className="add-content" onClick={handleAddQuestion}>
                          <FaPlus /> &nbsp; Add New Question
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='maxed-container'>
                      <TextField
                        label="URL"
                        variant="outlined"
                        fullWidth
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className='margin-top'
                      />
                    </div>
                  )
                }
                <React.Fragment>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}
                    <Button className='contained-prime' variant="contained" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              </div>

            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}><h4>Summary</h4></Typography>
                <Divider />
                <div className="summary-text margin-top"><strong>Content Type:</strong> {formData.contentType}</div>
                <div className="summary-text"><strong>Title:</strong> {formData.title}</div>
                <div className="summary-text"><strong>Description:</strong> {formData.description}</div>
                <div className="summary-text"><strong>Duration:</strong> {formData.duration}</div>
                {
                  formData.contentType == 'Learning Module' ? (
                    <div className="summary-text"><strong>No. of Chapters:</strong> {formData.chapters.length}</div>
                  ) : formData.contentType == 'Examination Module' ? (
                    <div className="summary-text"><strong>No. of Questions:</strong> {formData.questions.length}</div>
                  ) : (
                    <div className="summary-text"><strong>Video Link:</strong> {formData.url}</div>
                  )
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}
                  <Button className='contained-prime' variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
        {/* <div className="form-control">
          <span className='secondary-button'>Cancel</span>
          <button className='prime-button' type="submit">Submit</button>
        </div> */}
      </div>
    </div>
  )
}

export default ContentModal