// React Functions
import React, { useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { readAllNotesAsync, selectNotes } from '../../redux/notes/notesSlice'

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
  
  console.log('selector')
  const notesArray = useSelector(selectNotes)

  const params = useParams()
  const categoryID = params.id

  const deleteNote = async (id) => {
    const apiRequest = await noteAPI.remove(id)

    if(apiRequest.response) {
      window.location.reload(false);    
    } else {
      setError(apiRequest.error)
    }
  }

  const updateNote = (id) => {
    return navigate(`/dashboard/note/${id}`)

  }

  const readAllNotes = async () => {
      // const apiRequest = await noteAPI.read()
      // const notesFromResponse = apiRequest.notes
      // setNotes(notesFromResponse)
      // dispatch(readAllNotesAsync())
      
  }

  const readNotesByCategory = async () => {
    const apiRequest = await noteAPI.getNotesByCategory(categoryID)
    const notesFromResponse = apiRequest.notes
    setNotes(notesFromResponse)
  }

  // useEffect(() => {
  //   if(categoryID === undefined) {
  //     readAllNotes()
  //   } else {
  //     readNotesByCategory(categoryID)
  //     // setSelectedCategory(categoryID)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  useEffect(() => {
    console.log('useeffect')
    dispatch(readAllNotesAsync())
    setNotes(notesArray)
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
          {notes !== null && notes.map(note => (
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
}