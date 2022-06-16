import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ContextMenuNote({contextMenu, handleClose, id, deleteNote}) {

  return (
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
                <MenuItem onClick={() => {deleteNote(id)}}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
                {/* <Typography variant="body2" color="text.secondary">
                    ⌘X
                </Typography> */}
                </MenuItem>
        </Paper>
      </Menu>
  );
}
