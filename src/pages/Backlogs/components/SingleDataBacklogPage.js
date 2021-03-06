import {useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { backlogGetData } from "../actions/get-data"
import Stack from '@mui/material/Stack';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import SingleDataBacklogContents from "./SingleDataBacklogContents";
import { backlogTaskGetData } from '../actions/get-task-data'
import { backlogGetDataDetail } from '../actions/detail-backlog'

const SingleDataBacklogPage = () => {
    const backlogState = useSelector(state => state.backlogsDetail)
    const sprintState = useSelector(state => state.sprints)
    let {result: backlogData} = backlogState
    let {result: sprintData} = sprintState
    const {c_backlog_id} = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    
    const dispatch = useDispatch()
    const history = useNavigate()
    const [open, setOpen] = useState(true);
    // const [singleData, setSingleData] = useState(backlogData.filter(x => x.backlogs_data !== null).map(x => x.backlogs_data).flat().filter(x => x.c_backlog_id === c_backlog_id)[0])
    // const [singleData, setSingleData] = useState(backlogData.filter(x => x.c_backlog_id === c_backlog_id)[0])
    // const [singleDataSprint, setSingleDataSprint] = useState(singleData?.c_sprint_id)
    useEffect(() => {
        dispatch(backlogTaskGetData(c_backlog_id))
        dispatch(backlogGetData())
        dispatch(backlogGetDataDetail())
    }, [])
    // useEffect(() => {
    //     dispatch(backlogTaskGetData(c_backlog_id))
    //     setSingleData(backlogData.filter(x => x.backlogs_data !== null).map(x => x.backlogs_data).flat().filter(x => x.c_backlog_id === c_backlog_id)[0])
    //     setSingleDataSprint(singleData?.c_sprint_id)
    // }, [backlogData, singleData?.c_sprint_id, c_backlog_id, dispatch])
    const handleOpen = () => setOpen(true);
    const handleClose = () => history('/home');
    return (
        <Stack spacing={2}>
            <SingleDataBacklogContents 
                handleClose={handleClose} 
                handleOpen={handleOpen} 
                open={open} 
                taskData={backlogData.filter(x => x.c_backlog_id === c_backlog_id)[0]}
                sprintData={sprintData.filter(x => x.c_sprint_id === searchParams.get("c_sprint_id"))[0]} 
                fullscreen={true}
            />
        </Stack>
    )
}

export default SingleDataBacklogPage