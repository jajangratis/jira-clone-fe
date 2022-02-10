import { Grid } from "@mui/material"
import Button from '@mui/material/Button';
import { BoltIconWrap } from "../../../components/Icons";


const TopContent = () => {
    return (
        <Grid container direction='row' style={{marginTop: '1em'}} >
            <Grid item xs={6}>
                <Grid container direction='row' alignItems="flex-start" >
                    <Grid item xs={4}>
                        <p><BoltIconWrap/>Few Days Remaining</p>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained">
                            Complete Sprint
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid items xs={6}>
                <Grid container direction='row' justifyContent="flex-end">
                    <Grid item >
                        <Button variant="contained">
                            Retrospective
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TopContent