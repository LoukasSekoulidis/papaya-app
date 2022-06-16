// React Functions
import React, { useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'


// Components
import Note from './Note'

const noteAPI = require('../../api/note-api')


export default function NoteContainer() {

  const [notes, setNotes] = useState([])
  const [error, setError] = useState()
  // use this to pre select category in selector
  const [selectedCategory, setSelectedCategory] = useState()

  const navigate = useNavigate()

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
      const apiRequest = await noteAPI.read()
      const notesFromResponse = apiRequest.notes
      setNotes(notesFromResponse)
  }

  const readNotesByCategory = async () => {
    const apiRequest = await noteAPI.getNotesByCategory(categoryID)
    const notesFromResponse = apiRequest.notes
    setNotes(notesFromResponse)
  }

  useEffect(() => {
    if(categoryID === undefined) {
      readAllNotes()
    } else {
      readNotesByCategory(categoryID)
      // setSelectedCategory(categoryID)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {/* <Container> */}
          {notes.map(note => (
            <Note 
              note={note} 
              id={note._id} 
              title={note.noteTitle} 
              input={note.noteInput} 
              updateNote={updateNote} 
              deleteNote={deleteNote} 
              error={error} 
              key={note._id}
            />
          ))}
      {/* </Container> */}
    </React.Fragment>
  )
}