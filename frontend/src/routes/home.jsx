// React Functions
import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom'


// Components
import LogoutButton from '../components/user/LogoutButton'
import CreateNoteForm from '../components/note/CreateNoteForm'

// CSS
import { Button, Container } from 'react-bootstrap'

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

  // async function readNotes(){
  //   const apiRequest = await noteAPI.read()
  //   // notes = apiRequest.notes
  //   // setNotes(apiRequest.notes)
  //   const notesFromResponse = apiRequest.notes
  //   notesFromResponse.forEach(note => {
  //     // notesArray.push(note)
  //     console.log(note)
  //     setNotes(oldArray => [...oldArray, note])
  //   })
  //   // setNotes(notesArray)
  //   // console.log(apiRequest.notes[0])
  //   console.log(notes)
  //   // return notesFromResponse
  // }


  useEffect(() => {
    async function readNotes(){
      const apiRequest = await noteAPI.read()

      const notesFromResponse = apiRequest.notes
      // console.log(notesFromResponse)

      setNotes(notesFromResponse.map(c => c))
      // console.log(notes)
    }
    readNotes()
  }, [setNotes])
  // // readNotes()

  return (
    <main>
      <Container className='mt-3'>
        <h2 className='mb-3'>Home</h2>
        <LogoutButton />
        {/* <CreateNoteButton /> */}
      </Container>
        <CreateNoteForm />
      <Container>
        {/* <NoteContainer notes={notes} /> */}
        {notes.map(note => (
          // console.log(note)
          // <Note key={note._id} title={note.title} content={note.content}/>
          <li style={{ listStyleType: "none" }} key={note._id}>
            <div className="mb-2 card">
              <div className="card-body">
                      <h5 className="card-title">{note.noteTitle}</h5>
                      <p className="card-text">{note.noteInput}</p>
                      <p style={{'color': 'rgb(255,0,0'}}>{error}</p>
                      <Button onClick={() => {updateNote(note._id)}} variant='secondary'>Update</Button>
                      <Button className='m-2' onClick={() => {deleteNote(note._id)}} variant='danger'>Delete</Button>
              </div>
            </div>
          </li>
        ))}
      </Container>
    </main>
  )
}