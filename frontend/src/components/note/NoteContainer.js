// React Functions
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { readNotesByCategoryAsync, readAllNotesAsync, selectNotes, selectNoteStatus, deleteNoteAsync, setCreateOrUpdate, selectNoteAction } from '../../redux/notes/notesSlice'

import { CircularProgress, Button } from '@mui/material'

// Components
import Note from './Note'
import { margin } from '@mui/system'



export default function NoteContainer() {

  const [error, setError] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams()
  const categoryID = params.id

  const deleteNote = (id) => {
    dispatch(deleteNoteAsync(id))
    
    if (categoryID === undefined) {
      dispatch(readAllNotesAsync())
    } else {
      dispatch(readNotesByCategoryAsync(categoryID))
    }
  }

  const updateNote = (id) => {
    dispatch(setCreateOrUpdate('update'))
    // return navigate(`/dashboard/note/${id}`)
  }

  const showCreateNote = () => {
    dispatch(setCreateOrUpdate('create'))
  }

  // const readNotesByCategory = async () => {
  //   const apiRequest = await noteAPI.getNotesByCategory(categoryID)
  //   const notesFromResponse = apiRequest.notes
  //   setNotes(notesFromResponse)
  // }

  const notesStatus = useSelector(selectNoteStatus)
  const notesArray = useSelector(selectNotes)

  useEffect(() => {
    if (categoryID === undefined) {
      dispatch(readAllNotesAsync())
    } else {
      dispatch(readNotesByCategoryAsync(categoryID))
    }
    // eslint-disable-next-line
  }, [])

  if (notesStatus === 'succeeded') {
    return (
      <React.Fragment>
        <Button 
          onClick={showCreateNote}
          variant="contained" 
          color="dark"
          style={{
            width: '100%',
            margin: '0 0 20px 0'
          }}
        >Create Note</Button>
        {notesArray.map(note => (
          <Note
            note={note}
            id={note._id}
            title={note.noteTitle}
            input={note.noteInput}
            updateNote={updateNote}
            deleteNote={deleteNote}
            error={error}
            key={uuidv4()}
          />
        ))}
      </React.Fragment>
    )
  } else if (notesStatus === 'loading') {
    // TBD
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
        <CircularProgress color='dark' />
      </div>
    )
  }
}