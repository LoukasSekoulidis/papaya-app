// React Functions
import { React, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


// CSS
import { Button, Container, Alert } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// API 
const noteAPI = require('../../api/note-api')


export default function UpdateNoteForm() {

  const [error, setError] = useState()

  const [show, setShow] = useState(false)

  const titleRef = useRef()
  const noteRef = useRef()
  
  const params = useParams()
  const navigate = useNavigate()

  const getNote = async () => {
    const id = params.id
    const apiRequest = await noteAPI.getNote(id)

    if(apiRequest){
      titleRef.current.value = apiRequest.note.noteTitle
      noteRef.current.value = apiRequest.note.noteInput
    } else {
      setError(apiRequest.error)
      setShow(true)
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      const title = titleRef.current.value
      const note = noteRef.current.value


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
    <Container>
      <h2 className='mt-3'>Update a Note</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mt-3 mb-3' controlId="form.Name">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="form.Textarea">
            <Form.Label>Note</Form.Label>
            <Form.Control ref={noteRef} as="textarea" rows={3} />
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