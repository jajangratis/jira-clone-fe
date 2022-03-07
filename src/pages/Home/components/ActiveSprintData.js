import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from '@mui/material/Accordion';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

import { backlogGetDataParentChild } from "../actions/get-data"
import { backlogEditData } from '../actions/edit-backlog';


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
    const backlogParentChildState = useSelector(state => state.backlogsParentChild)
    const [parentChildData, setParentChildData] = useState(backlogParentChildState.result)
    
    
    const masterState = useSelector(state => state.master)
    const {user,data} = masterState.result
    const progressMaster = data?.filter(x => x.v_master === 'backlogprogress')

    useEffect(() => {
        dispatch(backlogGetDataParentChild())
    }, [dispatch])
    useEffect(() => {
        setParentChildData(backlogParentChildState.result)
    }, [backlogParentChildState.result])

    function recreate(obj, recreateObj, value) {
        let newValue = JSON.parse(JSON.stringify(obj))
        newValue[recreateObj] = value
        return newValue
    }
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
        >
                <Grid container >
                    {progressMaster.length > 0 && progressMaster.map(x => {
                        return (
                            <Grid items xs={3} key={x.id}>
                                <Item>
                                    <Typography gutterBottom variant="h6" component="div" className={`centered`} >
                                        {x.v_value}
                                    </Typography>
                                </Item>
                            </Grid>
                        )
                    })}
                </Grid>
                {parentChildData !== undefined && parentChildData.map(x => {
                    return (
                        <DragDropContext onDragEnd={(result) => {
                            console.log(result)
                            let data = parentChildData.map(x => x.childData).flat().filter(x => x.c_backlog_id === result.draggableId)[0]
                            if (data !== undefined) {
                                dispatch(backlogEditData(recreate(data, 'c_progress_id', result.destination.droppableId)))
                                dispatch(backlogGetDataParentChild())
                            }
                        }}>
                            <Accordion  style={{ width: '100%', backgroundColor: '#f0f0f0' }} key={x.c_backlog_id}>
                                <AccordionSummary
                                    aria-controls={`'panel-content'${x.c_backlog_id}`}
                                    id={`'panel-content'${x.c_backlog_id}`}
                                >{x.v_title}</AccordionSummary>
                                <Grid container>
                                    {progressMaster?.map(progress => {
                                        return (
                                            <Grid items xs={3}>
                                                <Droppable droppableId={progress.c_value_id}>
                                                {(provided) => (
                                                    <List className={`${progress.c_value_id}list`} {...provided.droppableProps} ref={provided.innerRef} >
                                                    {x.childData.length > 0 && x.childData?.filter(x => x.c_progress_id === progress.c_value_id)?.map(({id, c_backlog_id, v_title, c_assignee, v_story_point}, index) => {
                                                        return (
                                                        <Draggable key={id} draggableId={c_backlog_id} index={index} >
                                                            {(provided) => (
                                                            <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => history('/backlogs/'+c_backlog_id)}>
                                                                <Item style={itemStyle}>
                                                                <Grid
                                                                    container
                                                                    direction="column"
                                                                    justifyContent="flex-start"
                                                                    alignItems="flex-start"
                                                                > 
                                                                    <Grid items xs={6}><Typography>{v_title}</Typography></Grid>
                                                                    <Grid items xs={6}>
                                                                        <Grid
                                                                            container
                                                                            direction="row"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                        >
                                                                            <Grid items xs={10}><Typography>{`BACKLOG-`+id}</Typography></Grid>
                                                                            <Grid items xs={2}><Typography>{user ? user.filter(y => y.c_user_id === c_assignee)[0]?.v_fullname : c_assignee}</Typography></Grid>
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
                            </Accordion>
                        
                        </DragDropContext>
                    )
                })}
        </Stack>
    )
}

export default ActiveSprintData



