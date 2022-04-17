import { useEffect, useState } from 'react';
import { Grid, Box, Typography, Select, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { InputPassword, InputText } from "../../../components/Input"
import ErrorForm from '../../../components/ErrorForm';
import { usersAddData } from '../actions/add-data';


const TEXT_ERROR = {
    duplicate_email: 'Email Telah Terdaftar',
    invalid_email: 'Format Email Salah',
}
const UserAddForm = () => {
    const usersState = useSelector(state => state.users)
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const [role, setRole] = useState()
    const masterState = useSelector(state => state.master)
    const {data, user} = masterState.result
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    const validateForm = values => {
        if (!values.email && values.email.length === 0) {
          setError('email_required');
        } 
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          && values.email.length > 0
        ) {
          setError('invalid_email');
        }
        // if (values.password.length === 0) {
        //   setError('password_required');
        // }
        return
    }
    let initial = { email: '', password: '', fullname: '' }
    console.log({usersState});
    useEffect(() => {
        if (usersState.error) {
            setError(usersState.errorMessage)
        }
    }, [usersState.error, usersState.errorMessage])
    return (
        <Box >
            <Typography> Tambah User </Typography>
            <Formik
                initialValues={initial}
                validate={validateForm}
                onSubmit={(values, { setSubmitting }) => {
                    let concatedValue = JSON.parse(JSON.stringify(values))
                    concatedValue.role = role
                    dispatch(usersAddData(concatedValue))
                }}
            >
                {({ isSubmitting, isValidating }) => (
                <Box sx={{width: '20rem'}}>
                    <Form>
                        <Grid container direction="column" spacing={{ xs: 2, md: 3, mb: 5 }} sx={{width: '20rem'}}>
                            <Grid item xs={3}>
                                {error && <ErrorForm message={TEXT_ERROR[error]} />}
                            </Grid>
                            <Grid item xs={3}>
                                <Field label = "fullname" name="fullname" placeholder = "Masukkan nama lengkap Anda disini" component={InputText} sx={{width: '14rem'}}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Field label = "email" name="email" placeholder = "Masukkan email Anda disini" component={InputText} sx={{width: '14rem'}}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Field label = "password" name="password" component={InputPassword} sx={{width: '14rem'}}/>
                            </Grid>
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
                                <Button type="submit" className={`centered`} variant="contained">
                                    <Typography>Add</Typography>
                                </Button>
                            </Grid>

                        </Grid>
                    </Form>
                </Box>
                )}
            </Formik>
        </Box>
    )
}

export default UserAddForm