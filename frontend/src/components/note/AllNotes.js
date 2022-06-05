// React Functions
import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom'


// Components
import SingleNote from './SingleNote'

// CSS
import { Container } from 'react-bootstrap'

const noteAPI = require('../../api/note-api')


export default function Home() {

  const [notes, setNotes] = useState([])
  const [error, setError] = useState()

  const navigate = useNavigate()

  const deleteNote = async (id) => {
    const apiRequest = await noteAPI.remove(id)

    if(apiRequest.response) {
      window.location.reload(false);    
    } else {
      setError(apiRequest.error)
    }
  }

  const updateNote = (id) => {
    return navigate(`note/${id}`)

  }

  const readNotes = async () => {
      const apiRequest = await noteAPI.read()
      const notesFromResponse = apiRequest.notes
      setNotes(notesFromResponse)
  }

  useEffect(() => {
    readNotes()
  }, [])

  return (
    <React.Fragment>
      <Container>
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
      </Container>
    </React.Fragment>
  )
}