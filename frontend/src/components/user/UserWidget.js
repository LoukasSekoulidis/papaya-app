import * as React from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import  { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setApperance, selectUserAdminStatus } from '../../redux/user/userSlice';

const userAPI = require('../../api/user-api')



const UserWidget = () => {

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminStatus = useSelector(selectUserAdminStatus)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    userAPI.logout()
    window.location.reload(false)
    // return navigate('/')
  }

  const navToUserPreferences = () => {
    return navigate('/userPreferences')
  }

  const navToUserManagment = () => {
    return navigate('/control')
  }

  if(adminStatus) {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => {dispatch(setApperance('light'))}} >
            <ListItemIcon>
              <Brightness7Icon fontSize='small' />
            </ListItemIcon>
            Light Mode
          </MenuItem>
          <MenuItem onClick={() => {dispatch(setApperance('dark'))}} >
            <ListItemIcon>
              <Brightness4Icon fontSize='small' />
            </ListItemIcon>
            Dark Mode
          </MenuItem>
          <Divider />
          <MenuItem onClick={navToUserPreferences}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Preferences
          </MenuItem>
          <MenuItem onClick={navToUserManagment}>
            <ListItemIcon>
            <Settings fontSize="small" />
            </ListItemIcon>
            User Managment
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => {dispatch(setApperance('light'))}} >
            <ListItemIcon>
              <Brightness7Icon fontSize='small' />
            </ListItemIcon>
            Light Mode
          </MenuItem>
          <MenuItem onClick={() => {dispatch(setApperance('dark'))}} >
            <ListItemIcon>
              <Brightness4Icon fontSize='small' />
            </ListItemIcon>
            Dark Mode
          </MenuItem>
          <Divider />
          <MenuItem onClick={navToUserPreferences}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Preferences
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default UserWidget
