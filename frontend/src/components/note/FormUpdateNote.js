// React Functions
import { React, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'



// CSS
import { Button, Container, Alert } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// API 
const noteAPI = require('../../api/note-api')
const categoryAPI = require('../../api/category-api')



export default function FormUpdateNote() {

  const [error, setError] = useState()

  const [show, setShow] = useState(false)
  const [categories, setCategories] = useState([])


  // for markdown
  const [value, setValue] = useState('')

  const titleRef = useRef()
  const categoryRef = useRef()

  
  const params = useParams()
  const navigate = useNavigate()

  const getNote = async () => {
    const id = params.id
    const apiRequest = await noteAPI.getNote(id)

    if(apiRequest){
      titleRef.current.value = apiRequest.note.noteTitle
      setValue(apiRequest.note.noteInput)
    } else {
      setError(apiRequest.error)
      setShow(true)
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      const title = titleRef.current.value
      const categoryID = categoryRef.current.value
      console.log(categoryID)

      const note = value


      const apiRequest = await noteAPI.update(params.id, title, note, categoryID)

      if (apiRequest.response) {
        return navigate(`/dashboard`)
    } else {
        setError(apiRequest.error)
        setShow(true)
    }    
  }

  const getCategories = async () => {
    const apiRequest = await categoryAPI.read()

    if(apiRequest.response) {
        const categoriesFromResponse = apiRequest.categories
        for (let index = 0; index < categoriesFromResponse.length; index++) {
            let category = categoriesFromResponse[index]
            setCategories(prevArray => [...prevArray, category])
        }
    } else {
        // return apiRequest.error
    }
}

  useEffect(() => {
    getNote()
    getCategories()
    // eslint-disable-next-line
  }, [])


  return (
    <Container data-color-mode="light">
      <h2 className='mt-3'>Update a Note</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mt-3 mb-3' controlId="form.Name">
            <Form.Control ref={titleRef} type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="form.Category">
            <select className="form-select">
              <option value={''}>Select Category</option>
              {categories.map(category => (
                <option 
                    key={category._id}
                    value={category._id}
                    ref={categoryRef}
                >{category.categoryTitle}</option>
            ))}
            </select>
        </Form.Group>
        <Form.Group className='mb-3' controlId="form.Textarea">
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