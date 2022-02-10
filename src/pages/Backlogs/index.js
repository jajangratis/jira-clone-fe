import { Grid } from "@mui/material"
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"

const Backlogs = () => {
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar />
            </Grid>
            <Grid item xs={11}>
                <Grid container direction='column'>
                    <TopBar/>
                    <Grid item xs={11}>
                        <p> Backlogs Content</p>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Backlogs