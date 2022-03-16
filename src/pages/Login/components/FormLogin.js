// Render Prop
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Box, Typography } from '@mui/material';

import { InputText,InputPassword } from '../../../components/Input';
import { loginAction } from '../actions/auth-actions';
import ErrorForm from '../../../components/ErrorForm';

import classes from '../index.module.css'

const TEXT_ERROR = {
  email_required: 'Email Wajib diisi',
  password_required: 'Password Wajib diisi',
  invalid_email: 'Format Email Salah',
  invalid_auth: 'Email atau Password Salah'
}

const LoginForm = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState()

  const loginHandler = (values) => {
    dispatch(loginAction(values))
  }
  
  const authState = useSelector(state => state.auth)
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
  let initial = { email: '', password: '' }
  return (
      <Formik
        initialValues={initial}
        validate={validateForm}
        onSubmit={(values, { setSubmitting }) => {
          if (error !== undefined && authState.result.msg === undefined) {
              setError(error)
          } else {
            loginHandler(values)
            if (authState.error || error) {
              setError(authState.result.msg)
              setSubmitting(false)
            } else {
              history('/home')
            }
          }
        }}
      >
        {({ isSubmitting, isValidating }) => (
          <Box sx={{width: '20rem'}}>
            <Form>
              <Grid container direction="column" spacing={{ xs: 2, md: 3 }} sx={{width: '20rem'}}>
                <Grid item xs={3}>
                  {error && <ErrorForm message={TEXT_ERROR[error]} />}
                </Grid>
                <Grid item xs={3}>
                  <Field label = "email" name="email" placeholder = "Masukkan email Anda disini" component={InputText} sx={{width: '14rem'}}/>
                </Grid>
                <Grid item xs={3}>
                  <Field label = "password" name="password" component={InputPassword} sx={{width: '14rem'}}/>
                </Grid>
                <Grid item xs={3}>
                  {authState.isLoading ? <CircularProgress/> : <Button type="submit" disabled={isSubmitting && !isValidating} className={`${classes.btnStyle} centered`} variant="contained">
                    <Typography>Login</Typography>
                  </Button>}
                </Grid>

              </Grid>
            </Form>
          </Box>
        )}
      </Formik>
  )
};

export default LoginForm;
