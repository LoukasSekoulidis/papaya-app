import React from 'react'
import { useNavigate } from 'react-router-dom'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useDispatch, useSelector } from 'react-redux'
import { readAllNotesAsync } from '../../redux/notes/notesSlice'
import { selectCategories } from '../../redux/categories/categoriesSlice'



const DashboardGeneral = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(readAllNotesAsync())
        return
    }

    const categories = useSelector(selectCategories)

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

export default DashboardGeneral