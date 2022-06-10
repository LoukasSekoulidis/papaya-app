import React from 'react'
import  { useNavigate } from 'react-router-dom'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';


const PrimaryItemList = () => {

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate(`/dashboard`)
        window.location.reload(false)
        return
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={handleOnClick}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="All Notes" />
            </ListItemButton>
        </React.Fragment>
    )
}

export default PrimaryItemList