import * as React from 'react';
import { useState, useEffect } from 'react'

import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux'
import { readAllCategoriesAsync, updateCategoryAsync } from '../../redux/categories/categoriesSlice';
import { selectToken } from '../../redux/user/userSlice'

const categoryAPI = require('../../api/category-api')

export default function ContextMenuCategory({ contextMenu, handleClose, categoryID, deleteCategory }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const token = useSelector(selectToken)

    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')

    const dispatch = useDispatch()

    // handleOpen for modal
    const handleOpen = () => {
        handleClose()
        setOpen(true)
    }
    // handleClose for modal
    const handleCloseModal = () => {
        setOpen(false)
        // close context menu on closing update modal
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const update = {
            id: categoryID,
            title: category,
            color: color
        }

        dispatch(updateCategoryAsync(update))
        dispatch(readAllCategoriesAsync())
        setCategory('')
    }

    const getCategory = async () => {
        const response = await categoryAPI.getOne(token, categoryID)
        if(response.ok) {
            setCategory(response.category.categoryTitle)
            setColor(response.category.color)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])
    

    return (
        <div>

            <Menu
                style={{ 'boxShadow': '1px' }}
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <Paper sx={{ width: 240, maxWidth: '100%', 'boxShadow': 'none' }}>
                    <MenuItem onClick={handleOpen}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Update</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => { deleteCategory(categoryID) }}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Paper>
            </Menu>

            <Modal
                open={open}
                onClose={handleCloseModal}
            >
                <Box component="form" onSubmit={handleSubmit} sx={style}>
                    <TextField
                        style={{ width: '100%' }}
                        margin="normal"
                        required
                        name="name"
                        label="Category Name"
                        type="text"
                        id="categoryTitle"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <TextField
                        style={{ width: '100%' }}
                        margin="normal"
                        name="color"
                        label="Category Color"
                        type="text"
                        id="categoryColor"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <ListItemIcon style={{ color: 'red' }} onClick={(e) => setColor('red')}>
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'blue' }} onClick={(e) => setColor('blue')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'yellow' }} onClick={(e) => setColor('yellow')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'green' }} onClick={(e) => setColor('green')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'brown' }} onClick={(e) => setColor('brown')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'black' }} onClick={(e) => setColor('black')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'gray' }} onClick={(e) => setColor('gray')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'pink' }} onClick={(e) => setColor('pink')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'violet' }} onClick={(e) => setColor('violet')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'coral' }} onClick={(e) => setColor('coral')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'teal' }} onClick={(e) => setColor('teal')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <ListItemIcon style={{ color: 'orange' }} onClick={(e) => setColor('orange')} >
                        <NoiseControlOffIcon />
                    </ListItemIcon>
                    <Button
                        style={{ width: '100%' }}
                        color="dark"
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
            </Button>
                </Box>
            </Modal>

        </div>
    );
}
