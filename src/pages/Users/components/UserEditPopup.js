import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Formik, Form, Field } from 'formik';

import { useNavigate } from 'react-router-dom';

import { Grid, MenuItem, Select,  } from '@mui/material';
import { ModeEditIconWrap } from '../../../components/Icons';
import { useDispatch, useSelector } from 'react-redux'

import ErrorForm from '../../../components/ErrorForm';
import { InputText, InputPassword } from '../../../components/Input';
import { usersEditData } from '../actions/edit-data';


export default function UserEditPopup({
    open=false,
    handleOpen,
    handleClose,
    fullscreen = false,
    userData
}) {
    const TEXT_ERROR = {
        email_required: 'Email Wajib diisi',
        password_required: 'Password Wajib diisi',
        invalid_email: 'Format Email Salah',
        invalid_auth: 'Email atau Password Salah'
    }
    const style = fullscreen ? {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height:700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 29,
        p: 4,
    } : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height:700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const masterState = useSelector(state => state.master)
    const {data, user} = masterState.result
    const dispatch = useDispatch()
    const history = useNavigate()
    const [error, setError] = useState()
    const [role, setRole] = useState(userData?.c_role_id)
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    const validateForm = values => {
        if (!values.v_email && values.v_email.length === 0) {
          setError('email_required');
        } 
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.v_email)
          && values.v_email.length > 0
        ) {
          setError('invalid_email');
        }
        // if (values.password.length === 0) {
        //   setError('password_required');
        // }
        return
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Formik
                    initialValues={userData}
                    validate={validateForm}
                    onSubmit={(values, { setSubmitting }) => {
                        let concatedValue = JSON.parse(JSON.stringify(values))
                        concatedValue.c_role_id = role
                        dispatch(usersEditData(concatedValue))
                        handleClose()
                    }}
                    >
                    {({ isSubmitting, isValidating }) => (
                        <Box style={{}}>
                            {error && <ErrorForm message={TEXT_ERROR[error]} />}
                            <Form>
                                <Grid container direction='column' spacing={3}>
                                    <Grid item xs={3}>
                                        <Field label="email" name="v_email" disabled={true} component={InputText} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Field label="fullname" name="v_fullname" placeholder = "Nama Lengkap" component={InputText} />
                                    </Grid>
                                    {/* <Grid item xs={3}>
                                        <Field label="password" name="v_password" placeholder = "Password"  component={InputPassword} />
                                    </Grid> */}
                                    <Grid item xs={3}>
                                        <Typography>Role</Typography>
                                        <Select
                                            value={role}
                                            label="role"
                                            onChange={handleChangeRole}
                                            fullWidth={true}
                                            sx={{ height: '45px'}}
                                        >
                                            {data.filter(x => x.v_master === 'role').map(x => {
                                                return <MenuItem value={x.c_value_id} key={x.id}>{x.v_value}</MenuItem>
                                            })}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container direction='row' columnSpacing={1} >
                                            <Grid item xs={'auto'}>
                                                <Button type="submit" variant="contained" startIcon={<ModeEditIconWrap />}>
                                                   <Typography>Edit</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}