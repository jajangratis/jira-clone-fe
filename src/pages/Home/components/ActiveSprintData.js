import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Grid, Box, IconButton, Button, Avatar } from "@mui/material";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from '@mui/material/Accordion';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import Tooltip from '@mui/material/Tooltip';



import { backlogGetDataParentChild } from "../actions/get-data"
import { backlogEditData } from '../actions/edit-backlog';
import { recreateAndReplace } from '../../../helper/recreate-reassign-object';
import { AssignmentIconWrap, TaskIconWrap, ExpandMoreIconWrap } from '../../../components/Icons';
import { sprintGetData } from '../../Sprints/actions/get-data';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const itemStyle = {width: '100vh'}

const ActiveSprintData = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const sprintState = useSelector(state => state.sprints)
    useEffect(() => {
        dispatch(sprintGetData())
    }, [dispatch])
    let activeSprint = sprintState?.result.filter(x => x.is_active === 1)[0]
    activeSprint = activeSprint ? sprintState?.result[0] : activeSprint
    const backlogParentChildState = useSelector(state => state.backlogsParentChild)
    const [parentChildData, setParentChildData] = useState(backlogParentChildState.result)
    
    
    const masterState = useSelector(state => state.master)
    const {user,data} = masterState.result
    const progressMaster = data?.filter(x => x.v_master === 'backlogprogress')

    useEffect(() => {
        dispatch(backlogGetDataParentChild(activeSprint?.c_sprint_id))
    }, [dispatch, activeSprint?.c_sprint_id ])
    useEffect(() => {
        setParentChildData(backlogParentChildState.result)
    }, [backlogParentChildState.result])
    return (
        <Box
            // direction="column"
            // justifyContent="center"
            // alignItems="flex-start"
            // spacing={2}
            // sx={{overflowX: 'scroll', maxHeight:'85vh',}}
        >       
            <Box sx={{display: 'flex', }}>
                {progressMaster?.length > 0 && progressMaster?.map(x => {
                    return (
                        <Tooltip title={`${x.v_description}`} arrow>
                            <Grid items xs={3} key={x.id}  sx={{p: '5px'}}>
                                    <Button style={{ backgroundColor: '#F4F5F7', marginBottom: '15px', width: '100%'}} disabled={true}>
                                        <Typography gutterBottom variant="h6"  >
                                            {x.v_value}
                                        </Typography>
                                    </Button>
                            </Grid>
                        </Tooltip>
                    )
                })}
            </Box>
            {parentChildData !== undefined && parentChildData.map(x => {
                return (
                    <DragDropContext 
                        onDragEnd={(result) => {
                            console.log({result});
                            let data = parentChildData.map(x => x.childData).flat().filter(x => x.c_backlog_id === result.draggableId)[0]
                            if (data !== undefined) {
                                dispatch(backlogEditData(recreateAndReplace(data, 'c_progress_id', result.destination.droppableId)))
                            }
                            let newDataArray = JSON.parse(JSON.stringify(parentChildData))
                            newDataArray = newDataArray.map(x => {
                                if (x.c_backlog_id === result.draggableId) {
                                    x.c_progress_id = result.destination.droppableId
                                } else {
                                    if (x.childData.map(z => z.c_backlog_id).includes(result.draggableId)) {
                                        x.childData.map(y => {
                                            if (y.c_backlog_id === result.draggableId) {
                                                y.c_progress_id = result.destination.droppableId
                                            } 
                                            return y
                                        })
                                    }
                                    
                                }
                                return x
                            })
                            // dispatch(backlogGetDataParentChild())
                            setParentChildData(newDataArray)
                        }}
                    >
                        <Accordion  style={{ width: '100%',}} key={x.c_backlog_id} defaultExpanded={true} >
                            <AccordionSummary
                                aria-controls={`'panel-content'${x.c_backlog_id}`}
                                id={`'panel-content'${x.c_backlog_id}`}
                                expandIcon={<ExpandMoreIconWrap/>}
                            ><Typography><AssignmentIconWrap color="success" sx={{ fontSize:'15px'}}/> {x.v_title}</Typography></AccordionSummary>
                            <AccordionDetails>
                                <Grid container sx={{p: '0px'}}>
                                    {progressMaster?.map(progress => {
                                        return (
                                            <Grid items xs={3} sx={{ backgroundColor: '#F4F5F7', p:'0px'}}>
                                                <Droppable droppableId={progress.c_value_id} >
                                                {(provided) => (
                                                    <List className={`${progress.c_value_id}list`} {...provided.droppableProps} ref={provided.innerRef} >
                                                    {x.childData.length > 0 && x.childData?.filter(x => x.c_progress_id === progress.c_value_id)?.map(({id, c_backlog_id, v_title, c_assignee, v_story_point}, index) => {
                                                        const assigneeUser = user ? user.filter(y => y.c_user_id === c_assignee)[0]?.v_fullname : c_assignee
                                                        return (
                                                        <Draggable key={id} draggableId={c_backlog_id} index={index}>
                                                            {(provided) => (
                                                            <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => history(`/backlogs/${c_backlog_id}?c_sprint_id=${activeSprint?.c_sprint_id}`)} sx={{p: '5px',  transition: '.1s ease',}} >
                                                                <Item style={itemStyle} >
                                                                    <Grid
                                                                        container
                                                                        direction="row"
                                                                        sx={{my: '6px',py: '2px'}}
                                                                    > 
                                                                        <Grid items xs={9} md={9} sx={{my: '6px', textAlign:'left', ml: '5px'}}><Typography><TaskIconWrap color="primary" sx={{ fontSize:'15px'}}/> {v_title}</Typography></Grid>
                                                                        <Grid items xs={12} md={12}>
                                                                            <Grid
                                                                                container
                                                                                direction="row"
                                                                                sx={{ textAlign:'left', ml: '5px'}}
                                                                            >
                                                                                <Grid items xs={10}><Typography>{`BG-`+id}</Typography></Grid>
                                                                                <Grid items xs={2} sx={{ textAlign:'right'}}>{assigneeUser ? <Avatar sx={{width: '20px', height: '20px', fontSize: '10px'}}>{`${assigneeUser[0]}${assigneeUser[assigneeUser.length-1]}`}</Avatar> : ""}</Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>  
                                                                </Item>
                                                            </ListItem>
                                                            )}
                                                        </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                    </List>
                                                )}
                                                </Droppable>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    
                    </DragDropContext>
                )
            })}
        </Box>
    )
}

export default ActiveSprintData



