import React from 'react'

import { useNavigate } from 'react-router-dom'


import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

import ContextMenuCategory from '../misc/ContextMenuCategory'

import { useDispatch } from 'react-redux'
import { readNotesByCategoryAsync } from '../../redux/notes/notesSlice'
import { readAllCategoriesAsync, deleteCategoryAsync, setCurrentCategoryID, setCurrentCategoryName } from '../../redux/categories/categoriesSlice';

import { DragNDrop } from '../misc/DragNDrop'

const categoryAPI = require('../../api/category-api')

const DashboardCategory = ({ categoryTitle, id, catColor }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(readNotesByCategoryAsync(id))
        dispatch(setCurrentCategoryID(id))
        dispatch(setCurrentCategoryName(categoryTitle))
        return navigate('/dashboard/' + id)
    }

    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const deleteCategory = () => {
        dispatch(deleteCategoryAsync(id))
        dispatch(readAllCategoriesAsync())
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <ListItemButton onClick={handleOnClick} draggable onDragOver={(e) => DragNDrop.handleOver(e, id)}>
                <ListItemIcon style={{ color: catColor }}>
                    <NoiseControlOffIcon />
                </ListItemIcon>
                <ListItemText primary={categoryTitle} />
            </ListItemButton>
            <ContextMenuCategory
                contextMenu={contextMenu}
                handleClose={handleClose}
                categoryID={id}
                deleteCategory={deleteCategory}
            // updateCategory={() => {updateCategory()}}
            />
        </div>
    )
}

export default DashboardCategory