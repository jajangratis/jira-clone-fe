import { useState } from 'react';


import { Grid } from "@mui/material"
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"
import FormSprintAdd from "./components/FormSprintAdd"
import SprintContents from "./components/SprintContents"
import BoxOverflowY from '../../components/BoxOverflowY';





const Sprints = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar />
            </Grid>
            <Grid item xs={11}>
                <BoxOverflowY sx={{ml: '5px'}}>
                    <TopBar/>
                    <FormSprintAdd open={open} handleOpen={handleOpen} handleClose={handleClose}/>
                    <SprintContents/>
                </BoxOverflowY>
                {/* <Grid container direction='column'>
                    <TopBar/>
                    <Grid item xs={1} style={{margin: '10px'}}>
                        <FormSprintAdd open={open} handleOpen={handleOpen} handleClose={handleClose}/>
                    </Grid>
                    <Grid item xs={10} style={{margin: '10px'}}>
                        <SprintContents/>
                    </Grid>
                </Grid> */}
            </Grid>
        </Grid>
    )
}

export default Sprints