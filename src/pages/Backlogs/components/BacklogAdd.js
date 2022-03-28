import { useEffect, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import { useNavigate } from 'react-router-dom';

import { Button, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { backlogSubtaskAddData } from '../actions/add-subtask';

const BacklogAdd = ({
    sprintData,
    taskData
}) => {
    const dispatch = useDispatch()
    const [newAssigne, setNewAssigne] = useState('');
    const [newStoryPoint, setNewStoryPoint] = useState('1');
    const [newTitle, setNewTitle] = useState('');
    const [isNewSub, setIsAddNewSub] = useState(false)
    const masterState = useSelector(state => state.master)
    const {data, user} = masterState.result
    const [isShow, setIsShow] = useState(false)
    const onFinishedAddNewSubHandler = (event) => {
        if(event.key === 'Enter'){
            dispatch(backlogSubtaskAddData({
                v_title: event.target.value,
                c_sprint_id: sprintData.c_sprint_id,
                c_backlog_id_parent: taskData?.c_backlog_id,
                c_assignee: newAssigne,
                v_story_point:newStoryPoint
            }))
            setIsAddNewSub(false)
        } else {
            setNewTitle(event.target.value)
        }
    }
    const onClickButton = (event) => {
        dispatch(backlogSubtaskAddData({
            v_title: newTitle,
            c_sprint_id: sprintData.c_sprint_id,
            c_backlog_id_parent: taskData?.c_backlog_id,
            c_assignee: newAssigne,
            v_story_point:newStoryPoint
        }))
        setIsAddNewSub(false)
        setIsShow(false)
    }
    const handleChangeNewAssigne = (event) => {
        setNewAssigne(event.target.value);
    };
    const handleChangeNewStoryPoint = (event) => {
        setNewStoryPoint(event.target.value);
    };
    const handleShow = () => {
        setIsShow(true)
    }
    return (
        isShow ? 
            <Box sx={{display: 'flex', mt: '15px'}}>
                <Box sx={{width: '90%'}}>
                    <TextField  variant="standard" onKeyPress={onFinishedAddNewSubHandler} sx={{width: '100%', mt: '12px'}} />
                </Box>
                <Box sx={{width: '20%', display: 'flex'}}>
                    <Select
                        value={newAssigne}
                        label="Assigne"
                        onChange={handleChangeNewAssigne}
                        fullWidth={true}
                        sx={{width: '200px', height: '45px'}}
                    >
                        {user.map(x => {
                            return <MenuItem value={x.c_user_id} key={x.id}>{x.v_fullname}</MenuItem>
                        })}
                    </Select>
                    <Select
                        value={newStoryPoint}
                        label="Story Point"
                        onChange={handleChangeNewStoryPoint}
                        fullWidth={true}
                        sx={{width: '200px', height: '45px'}}
                    >
                        {data.filter(x => x.v_master === 'storypoint').map(x => {
                            return <MenuItem value={x.c_value_id} key={x.id}>{x.v_value}</MenuItem>
                        })}
                    </Select>
                </Box>
                <Box sx={{width: '5%'}}>
                    <Button onClick={onClickButton} sx={{width: '10px', height: '45px'}}>OK</Button>
                </Box>
            </Box>
        : 
            <Box 
                display="flex" 
                alignItems="center"
                justifyContent="center"
            >
                <Button onClick={handleShow} sx={{width: '20px'}}>Add</Button>
            </Box>
    )
}

export default BacklogAdd