import Styles from './styles';
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';

import { PlaylistAddCheckIconWrap, ListIconWrap, EventNoteIconWrap, EngineeringIconWrap } from './Icons';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

const NavigationBar = () => {
    const authState = useSelector(state => state.auth)
    const classes = Styles.NavigationBar();
    let navList = [
        {to: '/home', label: 'Active Sprint', icon: (<PlaylistAddCheckIconWrap sx={{color: 'white', fontSize: '35px'}}/>)},
        {to: '/backlogs', label: 'Backlogs', icon: (<ListIconWrap sx={{color: 'white', fontSize: '35px'}}/>)},
        {to: '/sprints', label: 'Sprints', icon:(<EventNoteIconWrap sx={{color: 'white', fontSize: '35px'}}/>)},
        
    ]
    if (authState?.result?.role === 'productowner') {
        navList.push({to: '/users', label: 'Users', icon:(<EngineeringIconWrap sx={{color: 'white', fontSize: '35px'}}/>)})
    }
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            height: '100vh',
        }}>
            {navList.map(nav => {
                return (
                    <NavLink to={nav.to} className={(navData) => navData.isActive ? `${classes.menuBar} ${classes.activeBar}`: `${classes.menuBar}`} style={{textDecoration: 'none', color:'white'}}>
                        {/* <Grid container direction='row' alignItems={'center'} justifyContent="space-evenly">
                            <Grid item xs={2}>
                                {nav.icon}
                            </Grid>
                            <Grid item xs={10}>
                                <Typography gutterBottom variant="body1" component="div">
                                    {nav.label}
                                </Typography>
                            </Grid>
                        </Grid> */}
                        <Box
                            sx={{
                                width: '100%',
                                height: '40%',
                                '&:hover': {
                                    backgroundColor: '#222E61',
                                },
                            }}
                        >
                            <Typography sx={{fontSize: '40px'}}>
                                {nav.icon}
                            </Typography>
                            <Typography gutterBottom >
                                {nav.label}
                            </Typography>
                        </Box>
                    </NavLink>
                )
            })}
        </Box>
    )
}

export default NavigationBar
