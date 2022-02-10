import Styles from './styles';
import { NavLink } from "react-router-dom"

import { PlaylistAddCheckIconWrap, ListIconWrap, EventNoteIconWrap } from './Icons';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

const NavigationBar = () => {
    const classes = Styles.NavigationBar();
    const navList = [
        {to: '/home', label: 'Active Sprint', icon: (<PlaylistAddCheckIconWrap style={{color: 'white', fontSize: 30}}/>)},
        {to: '/backlogs', label: 'Backlogs', icon: (<ListIconWrap style={{color: 'white', fontSize: 30}}/>)},
        {to: '/sprints', label: 'Sprints', icon:(<EventNoteIconWrap style={{color: 'white', fontSize: 30}}/>)}
    ]
    return (
    <Grid item direction='column' className={classes.wrapperNav} style={{paddingTop: '10px', paddingBottom: '10px'}}>
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
                            backgroundColor: 'primary.main',
                            },
                        }}
                    >
                        <Typography gutterBottom variant="body1" component="div">
                            {nav.icon}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            {nav.label}
                        </Typography>
                    </Box>
                </NavLink>
            )
        })}
    </Grid>
    )
}

export default NavigationBar
