// React Functions
import React, { useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'


// Components
import SingleNote from './SingleNote'

const noteAPI = require('../../api/note-api')


export default function AllNotes() {

  const [notes, setNotes] = useState([])
  const [error, setError] = useState()

  const navigate = useNavigate()

  const params = useParams()
  const id = params.id

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
    const apiRequest = await noteAPI.getNotesByCategory(id)
    const notesFromResponse = apiRequest.notes
    setNotes(notesFromResponse)
  }

  useEffect(() => {
    if(id === undefined) {
      readAllNotes()
    } else {
      readNotesByCategory(id)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {/* <Container> */}
          {notes.map(note => (
            <SingleNote 
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