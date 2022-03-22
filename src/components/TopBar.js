import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { Box, Grid, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { logoutAction } from '../pages/Login/actions/auth-actions';
import { ArrowBackIosNewIconWrap } from './Icons';




const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

const TopBar = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const authState = useSelector(state => state.auth)
  const[showMenu, setShowMenu] = useState(false)
  const handleClick = (event) => {
      setShowMenu(event.currentTarget);
  };
  const handleClose = (event) => {
      setShowMenu(false);
  };
  const handleLogout = (event) => {
    setShowMenu(false);
    history('/login')
    dispatch(logoutAction())
  };
  return (
      <Box sx={{
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid black',
        mb: '5px'
      }}>
        <Box>
            <IconButton onClick={() => {
              history(-1)
            }}><ArrowBackIosNewIconWrap/></IconButton>
        </Box>
        <Box sx={{width: '50%', ml: '50%'}}>
          <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
          >
            <Grid item xs={12}>
                <Button
                    id="demo-customized-button"
                    aria-controls={showMenu ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={showMenu ? 'true' : undefined}
                    variant="text"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                  <Typography gutterBottom variant="body" component="div" className={`centered`} >
                    Hi. {authState.result.email}
                  </Typography>
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={showMenu}
                    open={showMenu}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogout} disableRipple>
                        Logout
                    </MenuItem>
                </StyledMenu>
            </Grid>
          </Grid>
        </Box>
      </Box>
  )
}

export default TopBar