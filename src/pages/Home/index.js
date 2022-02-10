import { Grid } from "@mui/material"
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"
import ActiveSprintData from "./components/ActiveSprintData"
import TopContent from "./components/TopContent"



const Home = () => {
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar />
            </Grid>
            <Grid item xs={11}>
                <Grid container direction='column'>
                    <TopBar/>
                    <Grid item xs={11}>
                        <TopContent/>
                        <Grid>
                            <ActiveSprintData/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home