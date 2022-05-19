// React Functions
import { React, useRef, useState } from 'react'
import  { useNavigate } from 'react-router-dom'


// CSS
import { Button, Container, Alert } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// API

const noteAPI = require('../api/note-api')

export default function CreateNoteForm() {

  const [error, setError] = useState()

  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const titleRef = useRef()
  const noteRef = useRef()

  const handleSubmit = async (e) => {
      e.preventDefault()

      const title = titleRef.current.value
      const note = noteRef.current.value

      const apiRequest = await noteAPI.create(title, note)

      if (apiRequest.response) {
        window.location.reload(false);    
    } else {
        setError(apiRequest.error)
        setShow(true)
    }

    
  }

  return (
    <Container>
      <h2 className='mt-3'>Create a Note</h2>
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
        Create
      </Button>
      </Form>
      {/* <div>{error}</div> */}
      <Alert show={show} key={'danger'} variant={'danger'}>
      {error}
      </Alert>
    </Container>
  )
}