import {Box, Grid} from '@mui/material'
import NavigationBar from "../../components/NavigationBar"
import TopBar from "../../components/TopBar"
import UserList from './components/UserList'
import UserManagement from './components/UserManagement'



const Users = () => {
    return (
        <Grid container>
            <Grid item xs={1}>
                <NavigationBar />
            </Grid>
            <Grid item xs={11}>
                <Grid container direction='column'>
                    <TopBar/>
                    <Grid item xs={10} style={{margin: '10px'}}>
                        <UserManagement/>
                        <UserList/>
                    </Grid>
                </Grid>
                
            </Grid>
        </Grid>
    )
}

export default Users