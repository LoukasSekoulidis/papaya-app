import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import ContextMenuNote from '../misc/ContextMenuNote'

import { DragNDrop } from '../misc/DragNDrop'

import { selectApperance } from '../../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

import { setCreateOrUpdate, setCurrentNoteID } from '../../redux/notes/notesSlice'


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const Note = ({ id, title, input, updateNote, deleteNote, error }) => {

    const [contextMenu, setContextMenu] = React.useState(null);
    const apperance = useSelector(selectApperance)
    const dispatch = useDispatch()

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

    const showUpdateWindow = () => {
        dispatch(setCurrentNoteID(id))
        dispatch(setCreateOrUpdate('update'))
    }

    const card = (
        <React.Fragment>
          <CardContent 
            sx={{ mb: 5 }} 
            data-color-mode={apperance} 
            onClick={showUpdateWindow} 
            onContextMenu={handleContextMenu} 
            draggable 
            onDrag={(e) => DragNDrop.handleDrag(e, id, title)} 
            onDragEnd={(e) => DragNDrop.handleDrop(e)}
        >
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            {/* <Typography variant="body2"> */}
                <MDEditor.Markdown source={input} />
            {/* </Typography> */}
            <ContextMenuNote 
                contextMenu={contextMenu} 
                handleClose={handleClose} 
                deleteNote={deleteNote} 
                id={id}
            />
            {/* {error && <p style={{ 'color': 'rgb(255,0,0' }}>{error}</p>} */}
          </CardContent>
        </React.Fragment>
      );
      

    return (
        <Box sx={{ minWidth: 275, mb: 1 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}

export default Note
