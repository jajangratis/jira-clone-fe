import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



// Render Prop
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions/auth-actions';
import ErrorForm from '../../../components/ErrorForm';
import { CircularProgress } from '@mui/material';

const TEXT_ERROR = {
    email_required: 'Email Wajib diisi',
    password_required: 'Password Wajib diisi',
    invalid_email: 'Format Email Salah',
    invalid_auth: 'Email atau Password Salah'
}
  

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Bagidata
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function FormLogin2() {
    const authState = useSelector(state => state.auth)
    const history = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const loginHandler = (values) => {
        dispatch(loginAction(values))
    }
    
    useEffect(() => {
        if (!authState.isLoading) {
            console.log(authState?.result?.token !== undefined && authState.error === false);
            if (authState?.result?.token !== undefined && authState.error === false) {
                setLoading(false)
                history('/home')
            } else {
                setError(authState?.result?.msg)
                setLoading(false)
            }
        } else {
            setLoading(true)
        }
    }, [authState, history, error, loading])

    const handleSubmit = (event) => {
        // event.preventDefault();
        const data = new FormData(event.currentTarget);
        // alert(JSON.stringify({email: data.get('email'), password: data.get('password')}))
        loginHandler({email: data.get('email'), password: data.get('password')})
    };
    
    return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                {error && <ErrorForm message={TEXT_ERROR[error]} title="Terdapat masalah"/>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading?<CircularProgress/>: 'Sign In'}
                </Button>
                {/* <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid> */}
                <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>
    );
}