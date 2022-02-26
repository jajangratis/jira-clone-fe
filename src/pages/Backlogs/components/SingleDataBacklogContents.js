import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { Grid, Stack } from '@mui/material';
import { BoltIconWrap, BookIconWrap } from '../../../components/Icons';
import { useDispatch, useSelector } from 'react-redux'
import { backlogTaskGetData } from '../actions/get-task-data'
import { backlogSubtaskAddData } from '../actions/add-subtask';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SingleDataBacklogContents({
    open=false,
    handleOpen,
    handleClose,
    taskData,
    sprintData,
}) {
    console.log({taskData,
        sprintData});
    const taskState = useSelector(state => state.backlogTasks)
    const masterState = useSelector(state => state.master)
    const {data, user} = masterState.result
    const dispatch = useDispatch()
    const [isNewSub, setIsAddNewSub] = useState(false)
    const [newAssigne, setNewAssigne] = useState('');

    
    useEffect(() => {
        if (taskState !== undefined && taskData !== undefined) {
            dispatch(backlogTaskGetData(taskData.c_backlog_id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, backlogTaskGetData, taskData])
    
    const onAddNewSubHandler = () => {
        setIsAddNewSub(true)
    }
    const onFinishedAddNewSubHandler = (event) => {
        if(event.key === 'Enter'){
            console.log('enter press here! ')
            dispatch(backlogSubtaskAddData({
                v_title: event.target.value,
                c_sprint_id:sprintData.c_sprint_id,
                c_backlog_id_parent: taskData.c_backlog_id,
                c_assignee: newAssigne,
            }))
            setIsAddNewSub(false)
        }
    }
    const handleChangeNewAssigne = (event) => {
        setNewAssigne(event.target.value);
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid
                    container
                    direction='row'
                >
                    <Grid items xs={7}>
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            {taskData ? (
                                <div>
                                    <div style={{display:'flex',  marginBottom: '5px'}}>
                                        <BookIconWrap/>
                                        <Typography>Backlogs</Typography>
                                    </div>
                                    <Typography variant="h3" gutterBottom component="div">{taskData.v_title}</Typography>
                                    <Typography variant="h6" gutterBottom component="div" style={{height: '300px'}}>{taskData.v_description}</Typography>
                                    <Typography variant="h6" gutterBottom component="div">Assigne :{user ? user.filter(y => y.c_user_id === taskData.c_assignee)[0]?.v_fullname : taskData.c_assignee}</Typography>
                                    <Typography variant="h6" gutterBottom component="div">Story Point :{taskData.v_story_point}</Typography>
                                    <Typography variant="h6" gutterBottom component="div">Progress: {data ? data.filter(y => y.c_value_id === taskData.c_progress_id)[0]?.v_value : taskData.c_progress_id}</Typography>
                                </div>
                            ) : <Typography></Typography>}
                            
                        </Stack>
                    </Grid>
                    <Grid items xs={5}>
                        <Grid container direction='row' alignItems="center" >
                            <Grid items xs={9}>
                                <Typography>Subtask</Typography>
                            </Grid>
                            <Grid items xs={3} >
                                <Button variant="contained" style={{marginLeft: '19px'}} onClick={onAddNewSubHandler}>ADD</Button>
                            </Grid>
                        </Grid>
                        {
                            taskState.result.length > 0 ? 
                                taskState.result.map(x => {
                                    return <Grid container direction='row' alignItems="center" style={{border: '1px solid', marginTop: '5px'}}>
                                        <Grid items xs={3}>
                                            <BoltIconWrap/>
                                        </Grid>
                                        <Grid items xs={6}>
                                            <Typography variant="body" gutterBottom component="div">{x.v_title}</Typography>
                                        </Grid>
                                        <Grid items xs={3}>
                                            <Typography variant="body" gutterBottom component="div">{user ? user.filter(y => y.c_user_id === x.c_assignee)[0]?.v_fullname : x.c_assignee}</Typography>
                                        </Grid>
                                    </Grid>
                                })
                             : ''
                        }
                        {isNewSub && 
                            <Grid container direction='row' alignItems="center" style={{border: '1px solid', marginTop: '5px'}}>
                                <Grid items xs={6}>
                                    <TextField  variant="standard" onKeyPress={onFinishedAddNewSubHandler}/>
                                </Grid>
                                <Grid items xs={6}>
                                <Select
                                    value={newAssigne}
                                    label="Assigne"
                                    onChange={handleChangeNewAssigne}
                                    
                                >
                                    {user.map(x => {
                                        return <MenuItem value={x.c_user_id} key={x.id}>{x.v_fullname}</MenuItem>
                                    })}
                                </Select>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}