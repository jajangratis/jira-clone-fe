import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';


import { InputText, InputDate } from '../../../components/Input';
import { sprintAddData } from '../actions/add-data';
import ErrorForm from '../../../components/ErrorForm';



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

export default function FormSprintAdd({
    open=false,
    handleOpen,
    handleClose
}) {
    const ERROR_MESSAGE = {
        'invalid_date': 'Tanggal Mulai dan Finish tidak sesuai'
    }
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState(null)
  
    const initial = {
        v_sprint_title: '',
        v_sprint_description: '',
        d_start_sprint: moment().format('YYYY-MM-DD').toString(),
        d_finish_sprint: moment().format('YYYY-MM-DD').toString(),
    }

    const validateForm = values => {
        console.log({values});
        if (values.d_start_sprint > values.d_finish_sprint) {
            setErrorMessage(ERROR_MESSAGE['invalid_date'])
        } else {
            setErrorMessage(null)
        }
        return
    }

    const inputDataHandler = (values) => {
        dispatch(sprintAddData(values))
    }
    return (
        <div>
        <Button variant="contained" onClick={handleOpen}>
            Create Sprint
        </Button>
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
                            inputDataHandler(values)
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
                                        <Button type="submit" variant="contained">
                                            Add
                                        </Button>
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