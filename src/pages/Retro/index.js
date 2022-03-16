
import { useState } from 'react';


import { Grid } from "@mui/material"
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"
import RetroContent from './components/RetroContent';
import { useParams } from 'react-router-dom';


const Retro = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {c_sprint_id} = useParams()
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar />
            </Grid>
            <Grid item xs={11}>
                <Grid container direction='column'>
                    <TopBar/>
                    <Grid item xs={1} style={{margin: '10px'}}>
                        {/* <FormSprintAdd open={open} handleOpen={handleOpen} handleClose={handleClose}/> */}
                    </Grid>
                    <Grid item xs={10} style={{margin: '10px'}}>
                        <RetroContent c_sprint_id={c_sprint_id}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Retro