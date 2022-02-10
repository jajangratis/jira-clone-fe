import { Grid } from "@mui/material"
import FormLogin from './components/FormLogin'

import classes from './index.module.css'

const Login = () => {
    return (
        <Grid
            container
        >
            <Grid item xs={8} className={classes.layoutBlueLogin}>
                <h1 className={`${classes.textLogin} centered`}>LOGIN</h1>
            </Grid>
            <Grid item xs={4} className={classes.layoutLogin}>
                <FormLogin/>
            </Grid>
        </Grid>
    )
}

export default Login