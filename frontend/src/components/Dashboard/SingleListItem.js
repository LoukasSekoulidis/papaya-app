import React from 'react'

import  { useNavigate } from 'react-router-dom'


import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

import ContextMenuCategorySideBar from '../misc/ContextMenuCategorySideBar'

const categoryAPI = require('../../api/category-api')

const SingleListItem = ({categoryTitle, id}) => {

  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/dashboard/${id}`)
    window.location.reload(false)
    return
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

  const deleteCategory = async () => {
      const apiRequest = await categoryAPI.remove(id)

      if(apiRequest.response) {
          console.log(apiRequest.response)
          window.location.reload(false);
      } else {
          console.log(apiRequest.error)
          // setError(apiRequest.error)
      }
  };
  
  return (
      <div onContextMenu={handleContextMenu}>
        <ListItemButton onClick={handleOnClick}>
        <ListItemIcon>
            <NoiseControlOffIcon/>
        </ListItemIcon>
        <ListItemText primary={categoryTitle} />
        </ListItemButton>
        <ContextMenuCategorySideBar 
          contextMenu={contextMenu} 
          handleClose={handleClose} 
          categoryID={id} 
          deleteCategory={deleteCategory}
          // updateCategory={() => {updateCategory()}}
        />
    </div>
  )
}

export default SingleListItem