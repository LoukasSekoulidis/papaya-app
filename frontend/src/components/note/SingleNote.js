import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import ContextMenuStyle from '../misc/ContextMenuStyle'


const SingleNote = ({id, title, input, updateNote, deleteNote, error}) => {


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
  
  return (
    <React.Fragment>
      <div onClick={() => {if(!contextMenu) { updateNote(id)}}} onContextMenu={handleContextMenu}>
        <li style={{ listStyleType: "none" }} key={id}>
          <div data-color-mode="light" className="mb-2 card">
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <MDEditor.Markdown source={input} />
              {error && <p style={{'color': 'rgb(255,0,0'}}>{error}</p>}
              <ContextMenuStyle contextMenu={contextMenu} handleClose={handleClose} deleteNote={deleteNote} id={id}/>
            </div>
          </div>
        </li>
      </div>
    </React.Fragment>
  )
}

export default SingleNote
