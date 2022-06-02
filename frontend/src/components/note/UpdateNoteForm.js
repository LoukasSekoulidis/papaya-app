// React Functions
import { React, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'



// CSS
import { Button, Container, Alert } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// API 
const noteAPI = require('../../api/note-api')


export default function UpdateNoteForm() {

  const [error, setError] = useState()

  const [show, setShow] = useState(false)

  // for markdown
  const [value, setValue] = useState('')

  const titleRef = useRef()
  const noteRef = useRef()
  
  const params = useParams()
  const navigate = useNavigate()

  const getNote = async () => {
    const id = params.id
    const apiRequest = await noteAPI.getNote(id)

    if(apiRequest){
      titleRef.current.value = apiRequest.note.noteTitle
      // noteRef.current.value = apiRequest.note.noteInput
      setValue(apiRequest.note.noteInput)
    } else {
      setError(apiRequest.error)
      setShow(true)
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      const title = titleRef.current.value
      // const note = noteRef.current.value

      const note = value


      const apiRequest = await noteAPI.update(params.id, title, note)

      if (apiRequest.response) {
        return navigate(`/home`)
    } else {
        setError(apiRequest.error)
        setShow(true)
    }    
  }

  useEffect(() => {
    getNote()
  }, [])


  return (
    <Container data-color-mode="light">
      <h2 className='mt-3'>Update a Note</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mt-3 mb-3' controlId="form.Name">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="form.Textarea">
            <Form.Label>Note</Form.Label>
            <MDEditor 
              className='mt-3'
              value={value} 
              onChange={setValue}
            />
        </Form.Group>
        <Button className='mb-3' variant="primary" type="submit">
        Update
      </Button>
      </Form>
      {/* <div>{error}</div> */}
      <Alert show={show} key={'danger'} variant={'danger'}>
      {error}
      </Alert>
    </Container>
  )
}