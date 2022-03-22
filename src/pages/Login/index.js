import { Grid, Typography } from "@mui/material"
import FormLogin from './components/FormLogin'
import FormLogin2 from './components/FormLogin2'

import classes from './index.module.css'



const Login = () => {
    return (
        // <Grid
        //     container component="main" sx={{ height: '100vh' }}
        // >
        //     {/* <Grid item xs={8} className={classes.layoutBlueLogin}>
        //         <Typography className={`${classes.textLogin} centered`} variant="h3">LOGIN</Typography>
        //     </Grid> */}
        //     <Grid
        //         item
        //         xs={false}
        //         sm={4}
        //         md={7}
        //         sx={{
        //             backgroundImage: 'url(https://source.unsplash.com/random)',
        //             backgroundRepeat: 'no-repeat',
        //             backgroundColor: (t) =>
        //             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //             backgroundSize: 'cover',
        //             backgroundPosition: 'center',
        //         }}
        //     />
        //     <Grid item xs={5} className={classes.layoutLogin}>
        //         <FormLogin/>
        //     </Grid>
        // </Grid>
        <FormLogin2/>
    )
}

export default Login