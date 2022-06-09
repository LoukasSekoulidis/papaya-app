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

export default function ContextMenuStyle({contextMenu, handleCloseContextMenu, categoryID, deleteCategory, updateCategory}) {

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

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
      <div>

      <Menu
        style={{'boxShadow': '1px'}}
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
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
        onClose={handleClose}
        >
        <Box component="form" onSubmit={() => {updateCategory(category)}} sx={style}>
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
            Create
            </Button>
        </Box>
    </Modal>

    </div>
  );
}
