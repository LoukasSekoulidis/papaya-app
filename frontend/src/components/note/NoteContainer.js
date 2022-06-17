// React Functions
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { readNotesByCategoryAsync, readAllNotesAsync, selectNotes, selectNoteStatus, deleteNoteAsync } from '../../redux/notes/notesSlice'

// Components
import Note from './Note'

const noteAPI = require('../../api/note-api')


export default function NoteContainer() {

  const [notes, setNotes] = useState([])
  const [error, setError] = useState()
  // use this to pre select category in selector
  const [selectedCategory, setSelectedCategory] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams()
  const categoryID = params.id

  const deleteNote = (id) => {
    dispatch(deleteNoteAsync(id))
    if (id === undefined) {
      dispatch(readAllNotesAsync())
    } else {
      dispatch(readNotesByCategoryAsync(id))
    }
  }

  const updateNote = (id) => {
    return navigate(`/dashboard/note/${id}`)
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
      <>
        <h1> Loading... </h1>
      </>
    )
  }
}