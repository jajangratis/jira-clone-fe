import {useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { sprintGetData } from "../actions/get-data"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



import { BoltIconWrap } from "../../../components/Icons";

import indexClasses from '../index.module.css'

import SingleDataSprintContent from "./SingleDataSprintContent";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SprintContents = () => {
    const sprintState = useSelector(state => state.sprints)
    let {result: sprintData} = sprintState
    const dispatch = useDispatch()
    const [sprint, setSprint] = useState([])
    const [open, setOpen] = useState(false);
    const [singleData, setSingleData] = useState()
    
    useEffect(() => {
        dispatch(sprintGetData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setSprint(sprintData)
    }, [sprintData])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSearch = (event) => {
        dispatch(sprintGetData({search: event.target.value}))
    }
    const handleResetSearch = () => {
        dispatch(sprintGetData())
    }
    const activeData = sprint.filter(x => x.is_finish === 0 && x.is_active === 1)
    const planningData = sprint.filter(x => x.is_finish === 0 && x.is_active === 0)
    const finishedData = sprint.filter(x => x.is_finish === 1)

    return (
        
            <Stack spacing={2}>
                <SingleDataSprintContent handleClose={handleClose} handleOpen={handleOpen} open={open} sprintData={singleData}/>
                <TextField
                    id="sprint-searchj"
                    label="Cari Sprint"
                    type="search"
                    variant="standard"
                    margin="normal"
                    onChange={handleSearch}
                    onEmptied={handleResetSearch}
                />
                {/* <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                >
                </Grid> */}
                {sprint.length > 0 ? (
                    <div>
                        <Grid items xs={12} spacing={2}>
                            <Typography gutterBottom variant="h6" component="div">
                                Active Sprint
                            </Typography>
                            <Stack spacing={2} >
                                {activeData.length > 0 && activeData.map(x => {
                                    let startDate = x.d_start_sprint ? x.d_start_sprint.split('T'):['']
                                    let endDate = x.d_finish_sprint ? x.d_finish_sprint.split('T'):['']
                                    return <Item className={indexClasses.hoveredItem} onClick={() => {
                                        console.log(x);
                                        setOpen(true) 
                                        setSingleData(x)
                                    }}>
                                        <Grid container direction='row' alignItems="center">
                                            <Grid items xs={1}>
                                                <BoltIconWrap/>
                                            </Grid>
                                            <Grid items xs={2}>
                                                {x.v_sprint_title}
                                            </Grid>
                                            <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                Duration {startDate[0]} - {endDate[0]}
                                            </Grid>
                                        </Grid>
                                    </Item>
                                })}
                            </Stack>
                            <Divider/>
                        </Grid>
                        <Grid items xs={12}>
                            <Typography gutterBottom variant="h6" component="div">
                                Plan Sprint
                            </Typography>
                            <Stack spacing={2}>
                                {planningData.length > 0 && planningData.map(x => {
                                    let startDate = x.d_start_sprint ? x.d_start_sprint.split('T'):['']
                                    let endDate = x.d_finish_sprint ? x.d_finish_sprint.split('T'):['']
                                    return <Item className={indexClasses.hoveredItem} onClick={() => {
                                        console.log(x);
                                        setOpen(true) 
                                        setSingleData(x)
                                    }}>
                                        <Grid container direction='row' alignItems="center">
                                            <Grid items xs={1}>
                                                <BoltIconWrap/>
                                            </Grid>
                                            <Grid items xs={2}>
                                                {x.v_sprint_title}
                                            </Grid>
                                            <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                Duration {startDate[0]} - {endDate[0]}
                                            </Grid>
                                        </Grid>
                                    </Item>
                                })}
                            </Stack>
                            <Divider/>
                        </Grid>
                        <Grid items xs={12}>
                            <Typography gutterBottom variant="h6" component="div">
                                Finished Sprint
                            </Typography>
                            <Stack spacing={2}>
                                {finishedData.length > 0 && finishedData.map(x => {
                                    let startDate = x.d_start_sprint ? x.d_start_sprint.split('T'):['']
                                    let endDate = x.d_finish_sprint ? x.d_finish_sprint.split('T'):['']
                                    return <Item className={indexClasses.hoveredItem} onClick={() => {
                                        console.log(x);
                                        setOpen(true) 
                                        setSingleData(x)
                                    }}>
                                        <Grid container direction='row' alignItems="center">
                                            <Grid items xs={1}>
                                                <BoltIconWrap/>
                                            </Grid>
                                            <Grid items xs={2}>
                                                {x.v_sprint_title}
                                            </Grid>
                                            <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                Duration {startDate[0]} - {endDate[0]}
                                            </Grid>
                                        </Grid>
                                    </Item>
                                })}
                            </Stack>
                        </Grid>
                    </div>
                ) : <p>Empty</p>}
            </Stack>
            
        
    )
}

export default SprintContents