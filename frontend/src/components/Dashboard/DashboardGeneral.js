import React from 'react'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useDispatch } from 'react-redux'
import { readAllNotesAsync } from '../../redux/notes/notesSlice'
import { setCurrentCategoryID, setCurrentCategoryName } from '../../redux/categories/categoriesSlice'


const DashboardGeneral = () => {

    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(readAllNotesAsync())
        dispatch(setCurrentCategoryID(''))
        dispatch(setCurrentCategoryName(''))
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

export default DashboardGeneral