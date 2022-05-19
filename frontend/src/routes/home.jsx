// React Functions
import React, { useEffect, useState } from 'react'

// Components
import LogoutButton from '../components/LogoutButton'
// import CreateNoteButton from '../components/CreateNoteButton'
// import NoteContainer from '../components/NoteContainer'
import CreateNoteForm from '../components/CreateNoteForm'
// import Note from '../components/Note'

// CSS
import { Container } from 'react-bootstrap'

const noteAPI = require('../api/note-api')


export default function Home() {

  // api call to get notes

  const [notes, setNotes] = useState([])

  // readNotes()

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
          <li key={note._id}>
            <div className="card w-50">
              <div className="card-body">
                      <h5 className="card-title">{note.noteTitle}</h5>
                      <p className="card-text">{note.noteInput}</p>
                      {/* <a href="#" class="btn btn-primary">Button</a> */}
              </div>
            </div>
          </li>
        ))}
      </Container>
    </main>
  )
}