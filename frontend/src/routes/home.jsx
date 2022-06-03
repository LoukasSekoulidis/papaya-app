// React Functions
import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom'


// Components
import LogoutButton from '../components/user/LogoutButton'
import CreateNoteForm from '../components/note/CreateNoteForm'
import SingleNote from '../components/note/SingleNote'

// CSS
import { Container } from 'react-bootstrap'

const noteAPI = require('../api/note-api')


export default function Home() {

  // api call to get notes

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
    <main>
      <Container className='mt-3'>
        <h2 className='mb-3'>Home</h2>
        <LogoutButton />
      </Container>
        <CreateNoteForm />
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
    </main>
  )
}