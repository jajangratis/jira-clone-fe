import {useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { backlogGetData } from "../actions/get-data"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from '@mui/material/Accordion';
import { BoltIconWrap, AssignmentIconWrap } from "../../../components/Icons";
import SingleDataBacklogContents from "./SingleDataBacklogContents";
import BacklogAdd from "./BacklogAdd";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const BacklogContents = () => {
    const backlogState = useSelector(state => state.backlogs)
    let {result: backlogData} = backlogState
    const masterState = useSelector(state => state.master)
    const {user} = masterState.result
    const dispatch = useDispatch()
    const [backlog, setbacklog] = useState([])
    const [open, setOpen] = useState(false);
    const [singleData, setSingleData] = useState()
    const [singleDataSprint, setSingleDataSprint] = useState()
    
    useEffect(() => {
        dispatch(backlogGetData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setbacklog(backlogData)
    }, [backlogData])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <Box spacing={2}  >
            <SingleDataBacklogContents handleClose={handleClose} handleOpen={handleOpen} open={open} taskData={singleData} sprintData={singleDataSprint}/>
            {
                backlogState.isLoading ? 
                    <Box height={80} sx={{top: '50%', left: '50%'}}>
                        <CircularProgress/>
                    </Box> 
                :
                backlogData.length > 0 ?
                    backlogData.map(backlog => 
                        <Accordion  style={{ width: '100%', backgroundColor: '#F4F5F7' }} key={backlog.c_backlog_id} defaultExpanded={true}>
                            <AccordionSummary
                                aria-controls={`'panel-content'${backlog.c_sprint_id}`}
                                id={`'panel-content'${backlog.c_sprint_id}`}
                            >
                            <Grid 
                                container 
                                direction='row'
                                alignItems="center" 
                            >
                                <Grid items xs={1}>
                                    <BoltIconWrap/>
                                </Grid>
                                <Grid items xs={2}>
                                    <Typography>{backlog.v_sprint_title}</Typography>
                                </Grid>
                                <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Typography> {backlog.backlogs_data ? backlog.backlogs_data.reduce((partialSum, a) => partialSum + parseInt(a.v_story_point), 0) : 0} Total Point, {backlog.backlogs_data ? backlog.backlogs_data.length : 0} Backlogs</Typography>
                                </Grid> 
                            </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                {backlog.backlogs_data ?
                                    backlog.backlogs_data.map(x => 
                                        (   
                                            <Box  
                                                onClick={() => {
                                                    setSingleData(x)
                                                    setSingleDataSprint(backlog)
                                                    handleOpen()
                                                }}
                                                sx={{
                                                    mb: '5px',
                                                    border: '1px solid black',
                                                    display: 'flex',
                                                }}
                                            
                                            >
                                                <Box sx={{display: 'flex', mt: '5px', width: '85%'}}>
                                                    <AssignmentIconWrap color="success" sx={{ fontSize:'20px'}}/>
                                                    <Typography>{x.v_title}</Typography>
                                                </Box>
                                                <Box sx={{mt: '5px', pl: '25px',display: 'flex', width: '15%'}}>
                                                    <Typography>({x.v_story_point})</Typography>
                                                    <Typography>{user ? user.filter(y => y.c_user_id === x.c_assignee)[0]?.v_fullname : x.c_assignee}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    )
                                : ''}
                                <BacklogAdd sprintData={backlog} taskData={singleData}/>
                            </AccordionDetails>
                        </Accordion>
                )
                : 
                <Box sx={{top: '50%', left: '50%'}}>
                    <Typography>Empty</Typography>
                </Box> 
            }
            
        </Box>
    )
}

export default BacklogContents