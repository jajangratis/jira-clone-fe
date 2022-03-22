import { Grid } from "@mui/material"
import BoxOverflowY from "../../components/BoxOverflowY"
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"
import BacklogContents from "./components/BacklogContents"



const Backlogs = () => {
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar />
            </Grid>
            <Grid item xs={11}>
                <BoxOverflowY>
                    <TopBar/>
                    <BacklogContents />
                </BoxOverflowY>
                {/* <Grid container direction='column'>
                    <TopBar/>
                    <Grid item xs={11}>
                       <BacklogContents/>
                    </Grid> 
                </Grid> */}
            </Grid>
        </Grid>
    )
}

export default Backlogs