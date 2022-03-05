import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { useNavigate } from 'react-router-dom';

import { Grid, Stack } from '@mui/material';
import { BoltIconWrap, BookIconWrap } from '../../../components/Icons';
import { useDispatch, useSelector } from 'react-redux'
import { backlogTaskGetData } from '../actions/get-task-data'
import { backlogSubtaskEditData } from '../actions/edit-backlog'
import { backlogSubtaskAddData } from '../actions/add-subtask';
import { backlogGetData } from '../actions/get-data'
import { backlogSubtaskDeleteData } from '../actions/delete-backlog'
import { backlogGetDataDetail } from '../actions/detail-backlog'


import AlertDialog from '../../../components/styles/Dialog';
import BacklogAdd from './BacklogAdd';




export default function SingleDataBacklogContents({
    open=false,
    handleOpen,
    handleClose,
    taskData,
    sprintData,
    fullscreen = false,
}) {
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
    const taskState = useSelector(state => state.backlogTasks)
    const backlogsDetail = useSelector(state => state.backlogsDetail)
    const backlogsDetailData = backlogsDetail?.result
    const masterState = useSelector(state => state.master)
    const {data, user} = masterState.result
    const dispatch = useDispatch()
    const history = useNavigate()
    const [isNewSub, setIsAddNewSub] = useState(false)
    const [newAssigne, setNewAssigne] = useState('');

    const [taskDataState, setTaskDataState] = useState(taskData)

    const [storyPointEdit, setStoryPointEdit] = useState(false)
    const [assigneEdit, setAssigneeEdit] = useState(false)
    const [progressEdit, setProgressEdit] = useState(false)
    const [titleEdit, setTitleEdit] = useState(false)
    const [descriptionEdit, setDescriptionEdit] = useState(false)
    const [titleData, setTitleData] = useState(taskDataState?.v_title)
    const [descriptionData, setDescriptionData] = useState(taskDataState?.v_description)

    function recreateValue(obj, value, prevState) {
        let result = {
            "id": prevState.id,
            "c_backlog_id": prevState.c_backlog_id,
            "c_backlog_id_parent": prevState.c_backlog_id_parent,
            "v_title": prevState.v_title,
            "v_description": prevState.v_description,
            "c_assignee": prevState.c_assignee,
            "v_story_point": prevState.v_story_point,
            "v_priority": prevState.v_priority,
            "c_progress_id": prevState.c_progress_id,
            "d_created_date": prevState.d_created_date,
            "v_created_by": prevState.v_created_by,
            "d_updated_date": prevState.d_updated_date,
            "v_updated_by": prevState.v_updated_by,
            "c_status_id": prevState.c_status_id,
        }
        result[obj] = value
        return result
    }
    useEffect(() => {
        dispatch(backlogGetDataDetail())
    }, [dispatch])

    useEffect(() => {
        if (taskDataState !== undefined) {
            dispatch(backlogTaskGetData(taskDataState.c_backlog_id))
            dispatch(backlogGetData())
        }
    }, [dispatch, taskDataState])

    useEffect(() => {
        setTaskDataState(taskData)
    }, [taskData])
    
    const onAddNewSubHandler = () => {
        setIsAddNewSub(true)
    }

    // HANDLER STORY POINT
    const handleOnClickStoryPoint = () => {
        setStoryPointEdit(true)
    }
    const handleOnChangeStoryPoint = (event) => {
        // TODO dispatch ke db
        if (event.target.value !== undefined) {
            setTaskDataState((prevState, props) => {
                return recreateValue('v_story_point', event.target.value, prevState)
            })
            dispatch(backlogSubtaskEditData(taskDataState))
            setStoryPointEdit(false)
        }
    }
    const handleOnCloseStory = () => {
        setStoryPointEdit(false)
    }

    // HANDLER ASSIGNE
    const handleOnClickAssigne = () => {
        setAssigneeEdit(true)
    }
    const handleOnChangeAssigne = (event) => {
        // TODO dispatch ke db
        
        if (event.target.value !== undefined) {
            setTaskDataState((prevState, props) => {
                return recreateValue('c_assignee', event.target.value, prevState)
            })
            dispatch(backlogSubtaskEditData(taskDataState))
            setAssigneeEdit(false)
        }        
    }
    const handleOnCloseAssigne = () => {
        setAssigneeEdit(false)
    }

    // HANDLE PROGRESS
    const handleOnClickProgress = () => {
        setProgressEdit(true)
    }
    const handleOnChangeProgress = (event) => {
        // TODO dispatch ke db
        if (event.target.value !== undefined) {
            setTaskDataState((prevState, props) => {
                return recreateValue('c_progress_id', event.target.value, prevState)
            })
            dispatch(backlogSubtaskEditData(taskDataState))
            setProgressEdit(false)
        }
    }
    const handleOnCloseProgress = () => {
        setProgressEdit(false)
    }

    // HANDLE TITLE
    const handleOnClickTitle = () => {
        setTitleEdit(true)
    }
    const handleOnKeyPressTitle = (event) => {
        if(event.key === 'Enter'){
            if (event.target.value !== undefined) {
                setTitleData(event.target.value)
                setTaskDataState((prevState, props) => {
                    dispatch(backlogSubtaskEditData(recreateValue('v_title', event.target.value, prevState)))
                    return recreateValue('v_title', event.target.value, prevState)
                })
                setTitleEdit(false)
            }
        }
    }
    const handleOnBlurTitle = (event) => {
        if (event.target.value !== undefined) {
            setTitleData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateValue('v_title', event.target.value, prevState)))
                return recreateValue('v_title', event.target.value, prevState)
            })
            setTitleEdit(false)
        }
    }

    // HANDLE Description
    const handleOnClickDescription = () => {
        setDescriptionEdit(true)
    }
    const handleOnKeyPressDescription = (event) => {
        if(event.key === 'Enter'){
            if (event.target.value !== undefined) {
                setDescriptionData(event.target.value)
                setTaskDataState((prevState, props) => {
                    dispatch(backlogSubtaskEditData(recreateValue('v_description', event.target.value, prevState)))
                    return recreateValue('v_description', event.target.value, prevState)
                })
                setDescriptionEdit(false)
            }
        }
    }
    const handleOnBlurDescription = (event) => {
        if (event.target.value !== undefined) {
            setDescriptionData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateValue('v_description', event.target.value, prevState)))
                return recreateValue('v_description', event.target.value, prevState)
            })
            setDescriptionEdit(false)
        }
    }
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
                            {taskDataState ? (
                                <div>
                                    <div style={{display:'flex',  marginBottom: '5px'}}>
                                        <BookIconWrap/>
                                        
                                        
                                            <Breadcrumbs aria-label="breadcrumb">
                                                {taskDataState.c_backlog_id_parent ? 
                                                <Link
                                                    underline="hover"
                                                    color="inherit"
                                                    onClick={() => history('/backlogs/'+taskDataState.c_backlog_id_parent)}
                                                >
                                                    {backlogsDetailData.filter(x => x.c_backlog_id === taskDataState.c_backlog_id_parent)[0].v_title}
                                                </Link>
                                                : ''}
                                                <Link
                                                    underline="hover"
                                                    color="text.primary"
                                                    onClick={() => history('/backlogs/'+taskDataState.c_backlog_id)}
                                                    aria-current="page"
                                                >
                                                    {backlogsDetailData.filter(x => x.c_backlog_id === taskDataState.c_backlog_id)[0].v_title}
                                                </Link>
                                            </Breadcrumbs>
                                            
                                            
                                        
                                        
                                    </div>
                                    <Typography variant="h3" gutterBottom component="div" onClick={handleOnClickTitle}>
                                        {titleEdit ? 
                                            <TextField 
                                                variant="outlined" 
                                                defaultValue={taskDataState.v_title}  
                                                value={titleData} 
                                                onKeyPress={handleOnKeyPressTitle} 
                                                onBlur={handleOnBlurTitle}
                                            />
                                            : taskDataState.v_title
                                        }
                                    </Typography>
                                    <Typography variant="h6" gutterBottom component="div" style={{height: '300px'}} onClick={handleOnClickDescription}>
                                        { descriptionEdit ? 
                                            <TextField 
                                                multiline={true} 
                                                variant="outlined" 
                                                size={'medium'} 
                                                defaultValue={taskDataState.v_description}  
                                                value={descriptionData} 
                                                onKeyPress={handleOnKeyPressDescription} 
                                                onBlur={handleOnBlurDescription}
                                            />
                                            :taskDataState.v_description
                                        }
                                    </Typography>
                                    <Typography variant="h6" gutterBottom component="div" onClick={handleOnClickAssigne}>
                                        Assigne : 
                                        {assigneEdit ? 
                                        <Select
                                            id="assigneedit"
                                            value={taskDataState.c_assignee}
                                            label="Assigne"
                                            onChange={handleOnChangeAssigne}
                                            onBlur={handleOnCloseAssigne}
                                        >
                                            {user.map(x => {
                                                return <MenuItem key={x.c_user_id} value={x.c_user_id}>{x.v_fullname}</MenuItem>
                                            })}
                                        </Select>
                                        : user ? user.filter(y => y.c_user_id === taskDataState.c_assignee)[0]?.v_fullname : taskDataState.c_assignee}
                                        
                                    </Typography>
                                    <Typography variant="h6" gutterBottom component="div" onClick={handleOnClickStoryPoint}>
                                        Story Point : 
                                        {storyPointEdit ?
                                        <Select
                                            id="storypointedit"
                                            value={taskDataState.v_story_point}
                                            label="Story Point"
                                            onChange={handleOnChangeStoryPoint}
                                            onBlur={handleOnCloseStory}
                                        >
                                            {data.filter(x => x.v_master === 'storypoint').map(x => {
                                                return <MenuItem key={x.c_value_id} value={x.c_value_id}>{x.v_value}</MenuItem>
                                            })}
                                        </Select>
                                        : taskDataState.v_story_point }
                                    </Typography>
                                    <Typography variant="h6" gutterBottom component="div" onClick={handleOnClickProgress}>
                                        Progress: 
                                        {progressEdit ? 
                                        <Select
                                            id="progressedit"
                                            value={taskDataState.c_progress_id}
                                            label="Progress"
                                            onChange={handleOnChangeProgress}
                                            onBlur={handleOnCloseProgress}
                                        >
                                            {data.filter(x => x.v_master === 'backlogprogress').map(x => {
                                                return <MenuItem key={x.c_value_id} value={x.c_value_id}>{x.v_value}</MenuItem>
                                            })}
                                        </Select>
                                        : data ? data.filter(y => y.c_value_id === taskDataState.c_progress_id)[0]?.v_value : taskDataState.c_progress_id}
                                    </Typography>
                                    <AlertDialog title={"Hapus backlog?"} wording={"Anda Akan menghapus backlog ini beserta dependensinya"} wordingButton={"Delete Backlog"} onClickAction={() => {
                                        dispatch(backlogSubtaskDeleteData(taskDataState))
                                        dispatch(backlogGetData())
                                        handleClose()
                                        window.location.reload(false);
                                    }}/>
                                </div>
                            ) : <Typography></Typography>}
                            
                        </Stack>
                    </Grid>
                    {!taskDataState?.c_backlog_id_parent ?
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
                                taskState.result?.length > 0 ? 
                                    taskState.result.map(x => {
                                        return <Grid container direction='row' alignItems="center" style={{border: '1px solid', marginTop: '5px'}} onClick={() => history('/backlogs/'+x.c_backlog_id)}>
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
                                <BacklogAdd sprintData={sprintData} taskData={taskData}/>
                            }
                        </Grid>
                    : ''}
                </Grid>
            </Box>
        </Modal>
    );
}