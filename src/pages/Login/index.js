import { Grid, Typography } from "@mui/material"
import FormLogin from './components/FormLogin'
import FormLogin2 from './components/FormLogin2'

import classes from './index.module.css'



const Login = () => {
    return (
        // <Grid
        //     container
        // >
        //     <Grid item xs={8} className={classes.layoutBlueLogin}>
        //         <Typography className={`${classes.textLogin} centered`} variant="h3">LOGIN</Typography>
        //     </Grid>
        //     <Grid item xs={4} className={classes.layoutLogin}>
        //     </Grid>
        // </Grid>
        <FormLogin2/>
    )
}

export default Login