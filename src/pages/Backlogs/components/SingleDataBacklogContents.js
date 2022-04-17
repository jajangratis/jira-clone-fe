import { useEffect, useState } from 'react';
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
import { BoltIconWrap, AssignmentIconWrap } from '../../../components/Icons';
import { useDispatch, useSelector } from 'react-redux'
import { backlogTaskGetData } from '../actions/get-task-data'
import { backlogSubtaskEditData } from '../actions/edit-backlog'
import { backlogGetData } from '../actions/get-data'
import { backlogSubtaskDeleteData } from '../actions/delete-backlog'
import { backlogGetDataDetail } from '../actions/detail-backlog'
import { recreateAndReplace } from '../../../helper/recreate-reassign-object';

import AlertDialog from '../../../components/Dialog';
import BacklogAdd from './BacklogAdd';
import TextEditor from './TextEditor';





export default function SingleDataBacklogContents({
    open=false,
    handleOpen,
    handleClose,
    taskData,
    sprintData,
    fullscreen = false,
}) {
    const style = fullscreen ? {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height:700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 29,
        p: 4,
    } : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height:700,
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

    const [taskDataState, setTaskDataState] = useState(taskData)

    const [storyPointEdit, setStoryPointEdit] = useState(false)
    const [assigneEdit, setAssigneeEdit] = useState(false)
    const [progressEdit, setProgressEdit] = useState(false)
    const [titleEdit, setTitleEdit] = useState(false)
    const [descriptionEdit, setDescriptionEdit] = useState(false)
    const [weblinkEdit, setWeblinkEdit] = useState(false)
    const [designLinkEdit, setDesignLinkEdit] = useState(false)
    const [repoLinkEdit, setRepoLinkEdit] = useState(false)
    const [titleData, setTitleData] = useState(taskDataState?.v_title)
    const [descriptionData, setDescriptionData] = useState(taskDataState?.v_description)
    const [weblinkData, setWeblinkData] = useState(taskDataState?.v_web_link)
    const [designLinkData, setDesignLinkData] = useState(taskDataState?.v_design_link)
    const [repoLinkData, setRepoLinkData] = useState(taskDataState?.v_repo_link)
    

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
                // return recreateValue('v_story_point', event.target.value, prevState)
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_story_point', event.target.value)))
                return recreateAndReplace(prevState, 'v_story_point', event.target.value)
            })
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
                // return recreateValue('c_assignee', event.target.value, prevState)
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'c_assignee', event.target.value)))
                return recreateAndReplace(prevState, 'c_assignee', event.target.value)
            })
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
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'c_progress_id', event.target.value)))
                return recreateAndReplace(prevState, 'c_progress_id', event.target.value)
            })
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
                    dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_title', event.target.value)))
                    return recreateAndReplace(prevState, 'v_title', event.target.value)
                })
                setTitleEdit(false)
            }
        }
    }
    const handleOnBlurTitle = (event) => {
        if (event.target.value !== undefined) {
            setTitleData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_title', event.target.value)))
                return recreateAndReplace(prevState, 'v_title', event.target.value)
                
            })
            setTitleEdit(false)
        }
    }

    // HANDLE Description
    const handleOnClickDescription = () => {
        setDescriptionEdit(true)
    }
    const handleOnBlurDescription = (event) => {
        if (event.target.value !== undefined) {
            setDescriptionData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_description', event.target.value)))
                return recreateAndReplace(prevState, 'v_description', event.target.value)
                
            })
            setDescriptionEdit(false)
        }
    }
    // HANDLE Weblink
    const handleOnClickWeblink = () => {
        setWeblinkEdit(true)
    }
    const handleOnBlurWeblink = (event) => {
        if (event.target.value !== undefined) {
            setWeblinkData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_web_link', event.target.value)))
                return recreateAndReplace(prevState, 'v_web_link', event.target.value)
                
            })
            setWeblinkEdit(false)
        }
    }
    // HANDLE DESING LINK
    const handleOnClickDesignLink = () => {
        setDesignLinkEdit(true)
    }
    const handleOnBlurDesignLink = (event) => {
        if (event.target.value !== undefined) {
            setDesignLinkData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_web_link', event.target.value)))
                return recreateAndReplace(prevState, 'v_web_link', event.target.value)
                
            })
            setDesignLinkEdit(false)
        }
    }
    // HANDLE REPO LINK
    const handleOnClickRepoLink = () => {
        setRepoLinkEdit(true)
    }
    const handleOnBlurRepoLink = (event) => {
        if (event.target.value !== undefined) {
            setRepoLinkData(event.target.value)
            setTaskDataState((prevState, props) => {
                dispatch(backlogSubtaskEditData(recreateAndReplace(prevState, 'v_repo_link', event.target.value)))
                return recreateAndReplace(prevState, 'v_repo_link', event.target.value)
                
            })
            setRepoLinkEdit(false)
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
                                <Box >
                                    <Box sx={{display:'flex', fontSize: '5px'}}>
                                        <AssignmentIconWrap color="success"/>
                                        <Breadcrumbs aria-label="breadcrumb">
                                            {taskDataState.c_backlog_id_parent ? 
                                            <Link
                                                underline="none"
                                                color="inherit"
                                                onClick={() => history(`/backlogs/${taskDataState.c_backlog_id_parent}?c_sprint_id=${sprintData.c_sprint_id ? sprintData.c_sprint_id : sprintData}`)}
                                                sx={{cursor: 'pointer'}}
                                            >
                                                BG-{backlogsDetailData.filter(x => x.c_backlog_id === taskDataState.c_backlog_id_parent)[0].id}
                                            </Link>
                                            : ''}
                                            <Link
                                                underline="none"
                                                color="text.primary"
                                                onClick={() => history(`/backlogs/${taskDataState.c_backlog_id}?c_sprint_id=${sprintData.c_sprint_id ? sprintData.c_sprint_id : sprintData}`)}
                                                aria-current="page"
                                                sx={{cursor: 'pointer'}}
                                            >
                                                BG-{backlogsDetailData.filter(x => x.c_backlog_id === taskDataState.c_backlog_id)[0].id}
                                            </Link>
                                        </Breadcrumbs>
                                    </Box>
                                    <Box sx={{marginBottom: '5px', ml:'5px', mt: '10px'}}>
                                        <Typography variant="h6" gutterBottom  onClick={handleOnClickTitle}>
                                            {titleEdit ? 
                                                <TextField 
                                                    variant="outlined" 
                                                    defaultValue={taskDataState.v_title}  
                                                    value={titleData} 
                                                    onKeyPress={handleOnKeyPressTitle} 
                                                    onChange={(event) => {
                                                        setTitleData(event.target.value)
                                                    }}
                                                    onBlur={handleOnBlurTitle}
                                                />
                                                : taskDataState.v_title
                                            }
                                        </Typography>
                                        <Typography style={{height: '290px', whiteSpace: 'pre-line'}} onClick={handleOnClickDescription}>
                                            { descriptionEdit ? 
                                                // <TextEditor/>
                                                <TextField 
                                                    multiline={true} 
                                                    variant="outlined" 
                                                    defaultValue={taskDataState.v_description}  
                                                    value={descriptionData} 
                                                    onChange={(event) => {
                                                        setDescriptionData(event.target.value)
                                                    }}
                                                    onBlur={handleOnBlurDescription}
                                                    minRows={10}
                                                    maxRows={20}
                                                    sx={{width: '450px'}}
                                                />
                                                :taskDataState.v_description
                                            }
                                        </Typography>
                                        <Typography onDoubleClick={handleOnClickWeblink}>
                                            Link Web : 
                                            { weblinkEdit ? 
                                                // <WEBLINK/>
                                                <TextField 
                                                    multiline={true} 
                                                    variant="outlined" 
                                                    defaultValue={taskDataState.v_web_link}  
                                                    value={weblinkData} 
                                                    onChange={(event) => {
                                                        setWeblinkData(event.target.value)
                                                    }}
                                                    onBlur={handleOnBlurWeblink}
                                                    size={'small'}
                                                />
                                                : taskDataState.v_web_link ? <Link href={taskDataState.v_web_link ? taskDataState.v_web_link : '#'} rel="noreferrer" target="_blank" >Click Here</Link> : '-'
                                            }
                                        </Typography>
                                        <Typography onDoubleClick={handleOnClickDesignLink}>
                                            Design Mockup : 
                                            { designLinkEdit ? 
                                                // <DesignLink/>
                                                <TextField 
                                                    multiline={true} 
                                                    variant="outlined" 
                                                    defaultValue={taskDataState.v_design_link}  
                                                    value={designLinkData} 
                                                    onChange={(event) => {
                                                        setDesignLinkData(event.target.value)
                                                    }}
                                                    onBlur={handleOnBlurDesignLink}
                                                    size={'small'}
                                                />
                                                :<Link href={taskDataState.v_design_link ? taskDataState.v_design_link : '#'} rel="noreferrer" target="_blank" >Click Here</Link>
                                            }
                                        </Typography>
                                        <Typography onDoubleClick={handleOnClickRepoLink}>
                                            Repository : 
                                            { repoLinkEdit ? 
                                                // <Repo/>
                                                <TextField 
                                                    multiline={true} 
                                                    variant="outlined" 
                                                    defaultValue={taskDataState.v_repo_link}  
                                                    value={repoLinkData} 
                                                    onChange={(event) => {
                                                        setRepoLinkData(event.target.value)
                                                    }}
                                                    onBlur={handleOnBlurRepoLink}
                                                    size={'small'}
                                                />
                                                :<Link href={taskDataState.v_repo_link ? taskDataState.v_repo_link : '#'} rel="noreferrer" target="_blank" >Click Here</Link>
                                            }
                                        </Typography>
                                        <Typography gutterBottom component="div" onClick={handleOnClickAssigne} >
                                            Assigne : 
                                            {assigneEdit ? 
                                            <Select
                                                id="assigneedit"
                                                value={taskDataState.c_assignee}
                                                label="Assigne"
                                                onChange={handleOnChangeAssigne}
                                                onBlur={handleOnCloseAssigne}
                                                sx={{height: '35px', ml: '5px'}}
                                            >
                                                {user.map(x => {
                                                    return <MenuItem key={x.c_user_id} value={x.c_user_id} >{x.v_fullname}</MenuItem>
                                                })}
                                            </Select>
                                            : user ? user.filter(y => y.c_user_id === taskDataState.c_assignee)[0]?.v_fullname : taskDataState.c_assignee}
                                            
                                        </Typography>
                                        <Typography gutterBottom component="div" onClick={handleOnClickStoryPoint}>
                                            Story Point : 
                                            {storyPointEdit ?
                                            <Select
                                                id="storypointedit"
                                                value={taskDataState.v_story_point}
                                                label="Story Point"
                                                onChange={handleOnChangeStoryPoint}
                                                onBlur={handleOnCloseStory}
                                                sx={{height: '35px', ml: '5px'}}
                                            >
                                                {data.filter(x => x.v_master === 'storypoint').map(x => {
                                                    return <MenuItem key={x.c_value_id} value={x.c_value_id}>{x.v_value}</MenuItem>
                                                })}
                                            </Select>
                                            : taskDataState.v_story_point }
                                        </Typography>
                                        <Typography gutterBottom component="div" onClick={handleOnClickProgress}>
                                            Progress: 
                                            {progressEdit ? 
                                            <Select
                                                id="progressedit"
                                                value={taskDataState.c_progress_id}
                                                label="Progress"
                                                onChange={handleOnChangeProgress}
                                                onBlur={handleOnCloseProgress}
                                                sx={{height: '35px', ml: '5px'}}
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
                                    </Box>
                                </Box>
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
                            taskState.result?.length > 0 ? 
                                taskState.result.map(x => {
                                    return <Grid container direction='row' alignItems="center" style={{border: '1px solid', marginTop: '5px'}} onClick={() => history(`/backlogs/${x.c_backlog_id}?c_sprint_id=${sprintData.c_sprint_id ? sprintData.c_sprint_id : sprintData}`)}>
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
                    {/* {!taskDataState?.c_backlog_id_parent ?
                    : ''} */}
                </Grid>
            </Box>
        </Modal>
    );
}