import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Grid } from "@mui/material"
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"
import ActiveSprintData from "./components/ActiveSprintData"
import TopContent from "./components/TopContent"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = () => {
    const masterState = useSelector(state => state.master)
    const {user,data} = masterState.result
    const progressMaster = data?.filter(x => x.v_master === 'backlogprogress')
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar/>
            </Grid>
            <Grid item xs={11}>
                <Grid container direction='column'>
                    <TopBar/>
                    <TopContent/>
                    
                    <Grid item xs={11}>
                        <Grid>
                            <ActiveSprintData/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home