import {useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { backlogGetData } from "../actions/get-data"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from '@mui/material/Accordion';
import { BoltIconWrap, BookIconWrap, AssignmentIconWrap } from "../../../components/Icons";
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
    const [isNewSub, setIsAddNewSub] = useState(backlogData.map(x => x.c_sprint_id).reduce((a, v) => ({ ...a, [v]: false}), {}) )
    
    useEffect(() => {
        dispatch(backlogGetData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setbacklog(backlogData)
        setIsAddNewSub(backlogData.map(x => x.c_sprint_id).reduce((a, v) => ({ ...a, [v]: false}), {}) )
    }, [backlogData])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <Box spacing={2} sx={{overflowX: 'scroll', maxHeight:'95vh',}}>
            <SingleDataBacklogContents handleClose={handleClose} handleOpen={handleOpen} open={open} taskData={singleData} sprintData={singleDataSprint}/>
            {
                backlogData.length > 0 ?
                    backlogData.map(backlog => 
                        <Accordion  style={{ width: '100%', backgroundColor: '#f0f0f0' }} key={backlog.c_backlog_id} defaultExpanded={true}>
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
                                                }}
                                            
                                            >
                                                <Grid container direction='row' alignItems="center"  style={{backgroundColor: 'white', border: '0.5px solid'}}>
                                                    <Grid items xs={2} sx={{ml: '5px'}}>
                                                        <Typography><AssignmentIconWrap color="success" sx={{ fontSize:'20px'}}/> {x.v_title} ({x.v_story_point})</Typography>
                                                    </Grid>
                                                    <Grid items xs={9} sx={{textAlign: 'right', ml:'75px'}}>
                                                        <Typography>{user ? user.filter(y => y.c_user_id === x.c_assignee)[0]?.v_fullname : x.c_assignee}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        )
                                    )
                                : ''}
                                {/* {isNewSub[backlog.c_sprint_id] ?  <BacklogAdd sprintData={backlog} taskData={singleData}/> : <Typography className={`centered`} onClick={() => {
                                    setIsAddNewSub((prev, curr) => {
                                        let newPrev = prev
                                        newPrev[backlog.c_sprint_id] = true
                                        console.log({prev, newPrev, curr}, backlog.c_sprint_id);
                                        return newPrev
                                    })
                                    console.log({UU: isNewSub}, isNewSub[backlog.c_sprint_id]);
                                }}>Add Backlog</Typography>} */}
                                <BacklogAdd sprintData={backlog} taskData={singleData}/>
                            </AccordionDetails>
                        </Accordion>
                    )
                : <p>Empty</p>
            }
            
        </Box>
    )
}

export default BacklogContents