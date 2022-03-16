import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as moment from 'moment';
import { Box, Grid, Typography } from "@mui/material"
import Button from '@mui/material/Button';


// import { BoltIconWrap } from "../../../components/Icons";
import { sprintGetData } from '../../Sprints/actions/get-data';
import { sprintFinishData } from '../../Sprints/actions/finish-sprint';
import AlertDialog from '../../../components/Dialog';
import {finishPrompt} from '../wording'

const TopContent = ({timesprint}) => {
    const dispatch = useDispatch()
    const sprintState = useSelector(state => state.sprints)
    useEffect(() => {
        dispatch(sprintGetData())
    }, [dispatch])
    let activeSprint = sprintState?.result.filter(x => x.is_active === 1)[0]
    activeSprint = activeSprint ? sprintState?.result[0] : activeSprint
    let finishDate = moment(activeSprint?.d_finish_sprint.substring(0,10), 'YYYY-MM-DD').format('YYYY-MM-DD')
    const diff = moment().diff(finishDate, 'days')

    const finishDataHandler = () => {
        dispatch(sprintFinishData(activeSprint))
        dispatch(sprintGetData())
    }
    return (
        <Grid container direction='row' sx={{mt: '1em', mb: '1em'}} >
            <Grid item xs={6}>
                <Box sx={{display: 'flex'}} >
                    <Typography sx={{pr:'15px', pl:'15px', py: '0.5em'}}>{isNaN(diff) ? 'Finished' : `${diff} Days Remaining`}</Typography>
                    <AlertDialog 
                        wordingButton={"Complete Sprint"}
                        wording={finishPrompt}
                        onClickAction={finishDataHandler}
                        variant="contained"
                        isDisable={diff <= 0 && activeSprint.is_active === 1}
                    />
                </Box>
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