import React from 'react'

import  { useNavigate } from 'react-router-dom'


import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SingleListItem = ({categoryTitle, id}) => {

  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/dashboard/${id}`)
    window.location.reload(false)
    return
}
  
  return (
      // <React.Fragment>
        <ListItemButton onClick={handleOnClick}>
        <ListItemIcon>
            <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={categoryTitle} />
        </ListItemButton>
    // </React.Fragment>
  )
}

export default SingleListItem