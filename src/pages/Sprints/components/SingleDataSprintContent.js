import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import Modal from '@mui/material/Modal';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


import { InputText, InputDate } from '../../../components/Input';
import { sprintDeleteData } from '../actions/delete-data';
import { sprintEditData } from '../actions/edit-data';

import { sprintActivateData } from '../actions/activate-sprint';
import { sprintFinishData } from '../actions/finish-sprint';

import ErrorForm from '../../../components/ErrorForm';
import { DeleteIconWrap, ModeEditIconWrap, PauseIconWrap, PlayArrowIconWrap } from '../../../components/Icons';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleDataSprintContent({
    open=false,
    handleOpen,
    handleClose,
    sprintData,
}) {
    const sprintsState = useSelector(state => state.sprints)
    const errorSprintState = sprintsState?.errorMessage?.msg
    const ERROR_MESSAGE = useMemo(() => {
        return {
            'invalid_date': 'Tanggal Mulai dan Finish tidak sesuai',
            'duplicated_active_sprint': 'Tidak dapat mengaktifkan sprint jika masih ada sprint aktif'
        }
    }, [])
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        setErrorMessage(ERROR_MESSAGE[errorSprintState])
    }, [errorSprintState, ERROR_MESSAGE])
  
    const initial = {
        c_sprint_id: sprintData?.c_sprint_id,
        v_sprint_title: sprintData?.v_sprint_title,
        v_sprint_description: sprintData?.v_sprint_description,
        d_start_sprint: sprintData?.d_start_sprint,
        d_finish_sprint: sprintData?.d_finish_sprint,
    }

    const validateForm = values => {
        if (values.d_start_sprint > values.d_finish_sprint) {
            setErrorMessage(ERROR_MESSAGE['invalid_date'])
        } else {
            setErrorMessage(null)
        }
        return
    }

    const deleteDataHandler = () => {
        alert("Data will be delete")
        dispatch(sprintDeleteData(sprintData))
        if (errorMessage === null) {
            handleClose()
        }
    }
    const editDataHandler = (values) => {
        alert("edit data")
        dispatch(sprintEditData(values))
        if (errorMessage === null) {
            handleClose()
        }
    }

    
    
    const activateDataHandler = () => {
        dispatch(sprintActivateData(sprintData))
        if (errorMessage === null) {
            handleClose()
        }
    }
    const finishDataHandler = () => {
        dispatch(sprintFinishData(sprintData))
        if (errorMessage === null) {
            handleClose()
        }
    }
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik
                    initialValues={initial}
                    validate={validateForm}
                    onSubmit={(values, { setSubmitting }) => {
                        if (errorMessage === null) {
                            // alert(JSON.stringify(values))
                            editDataHandler(values)
                            handleClose()
                        } else {
                            setSubmitting(false)
                        }

                    }}
                    >
                    {({ isSubmitting, isValidating }) => (
                        <div style={{}}>
                            {errorMessage != null && <ErrorForm message={errorMessage} />}
                            <Form>
                                <Grid container direction='column' spacing={3}>
                                    <Grid item xs={3}>
                                        <Field label="Title" name="v_sprint_title" placeholder = "Masukkan judul sprint" component={InputText} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Field label="Description" name="v_sprint_description" placeholder = "Deskripsi" component={InputText} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Field label="Start Sprint" name="d_start_sprint" placeholder = "Tanggal Mulai" component={InputDate} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Field label="Finish Sprint" name="d_finish_sprint" placeholder = "Tanggal Selesai" component={InputDate} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container direction='row' columnSpacing={1} >
                                            <Grid item xs={'auto'}>
                                                <Button type="submit" variant="contained" startIcon={<ModeEditIconWrap />}>
                                                   <Typography>Edit</Typography>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={'auto'}>
                                                <Button variant="contained" onClick={deleteDataHandler} color="error" startIcon={<DeleteIconWrap/>}>
                                                    <Typography>Delete</Typography>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={'auto'}>
                                                {
                                                    sprintData.is_active === 0 && sprintData.is_finish === 0 ? 
                                                        <Button variant="contained" onClick={activateDataHandler} startIcon={<PlayArrowIconWrap/>}>
                                                            <Typography>Start</Typography>
                                                        </Button>
                                                    :   
                                                        <Button variant="contained" onClick={finishDataHandler} disabled={sprintData.is_finish === 1} startIcon={<PauseIconWrap/>}>
                                                            <Typography>Finish</Typography>
                                                        </Button>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </div>
                    )}
                </Formik>
            </Box>
        </Modal>
        </div>
    );
}