import {useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { sprintGetData } from "../actions/get-data"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid, Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



import { BoltIconWrap } from "../../../components/Icons";

import indexClasses from '../index.module.css'

import SingleDataSprintContent from "./SingleDataSprintContent";
import BoxOverflowY from "../../../components/BoxOverflowY";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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

    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
            <BoxOverflowY>
                <SingleDataSprintContent handleClose={handleClose} handleOpen={handleOpen} open={open} sprintData={singleData}/>
                <TextField
                    id="sprint-searchj"
                    label="Cari Sprint"
                    type="search"
                    variant="standard"
                    margin="normal"
                    onChange={handleSearch}
                    onEmptied={handleResetSearch}
                    fullWidth={true}
                />
                {/* <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                >
                </Grid> */}
                {sprint.length > 0 ? (
                    <Box>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ml: '5px'}}>
                                    <Tab label="Active Sprint" {...a11yProps(0)} sx={{width: `${100/3}%`}}/>
                                    <Tab label="Plan Sprint" {...a11yProps(1)} sx={{width: `${100/3}%`}}/>
                                    <Tab label="Finish Sprint" {...a11yProps(2)} sx={{width: `${100/3}%`}}/>
                                </Tabs>
                            </Box>
                        <TabPanel value={value} index={0}>
                        <Stack spacing={2} >
                                {activeData.length > 0 && activeData.map(x => {
                                    let startDate = x.d_start_sprint ? x.d_start_sprint.split('T'):['']
                                    let endDate = x.d_finish_sprint ? x.d_finish_sprint.split('T'):['']
                                    return <Item className={indexClasses.hoveredItem} onClick={() => {
                                        setOpen(true) 
                                        setSingleData(x)
                                    }}>
                                        <Grid container direction='row' alignItems="center">
                                            <Grid items xs={1}>
                                                <BoltIconWrap/>
                                            </Grid>
                                            <Grid items xs={2}>
                                                <Typography>
                                                    {x.v_sprint_title}
                                                </Typography>
                                            </Grid>
                                            <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <Typography>
                                                    Duration {startDate[0]} - {endDate[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                })}
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack spacing={2}>
                                {planningData.length > 0 && planningData.map(x => {
                                    let startDate = x.d_start_sprint ? x.d_start_sprint.split('T'):['']
                                    let endDate = x.d_finish_sprint ? x.d_finish_sprint.split('T'):['']
                                    return <Item className={indexClasses.hoveredItem} onClick={() => {
                                        setOpen(true) 
                                        setSingleData(x)
                                    }}>
                                        <Grid container direction='row' alignItems="center">
                                            <Grid items xs={1}>
                                                <BoltIconWrap/>
                                            </Grid>
                                            <Grid items xs={2}>
                                                <Typography>
                                                    {x.v_sprint_title}
                                                </Typography>
                                            </Grid>
                                            <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <Typography>
                                                    Duration {startDate[0]} - {endDate[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                })}
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
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
                                                <Typography>
                                                    {x.v_sprint_title}
                                                </Typography>
                                            </Grid>
                                            <Grid items xs={9} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <Typography>
                                                    Duration {startDate[0]} - {endDate[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                })}
                            </Stack>
                        </TabPanel>
                        </Box>
                    </Box>
                ) : <Box>
                        {sprintState.isLoading ? <CircularProgress/> : <Typography>Kosong</Typography>}
                    </Box>}
            </BoxOverflowY>
            
        
    )
}

export default SprintContents