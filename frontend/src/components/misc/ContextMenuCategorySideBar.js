import * as React from 'react';
import { useState } from 'react'

import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';

const categoryAPI = require('../../api/category-api')


export default function ContextMenuCategorySideBar({contextMenu, handleClose, categoryID, deleteCategory}) {

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

    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState('')

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
        const updatedTitle = category

        const apiRequest = await categoryAPI.update(categoryID, updatedTitle)
    
        if(apiRequest.response) {
            console.log(apiRequest.response)
            window.location.reload(false);
        } else {
            console.log(apiRequest.error)
            // setError(apiRequest.error)
        }
    }

    return (
      <div>

      <Menu
        style={{'boxShadow': '1px'}}
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
            contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <Paper sx={{ width: 240, maxWidth: '100%', 'boxShadow': 'none'}}>
                <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Rename</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {deleteCategory(categoryID)}}>
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
                style ={{width: '100%'}}
                margin="normal"
                required
                name="name"
                label="Category Name"
                type="text"
                id="categoryTitle"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <Button
                style ={{width: '100%'}}
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
