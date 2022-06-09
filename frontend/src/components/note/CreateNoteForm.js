// React Functions
import { React, useRef, useState, useEffect } from 'react'

// Markdown
import MDEditor from '@uiw/react-md-editor'

// CSS
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// API
const noteAPI = require('../../api/note-api')
const categoryAPI = require('../../api/category-api')


export default function CreateNoteForm() {

  // for markdown
  const [value, setValue] = useState('')

  const [error, setError] = useState()

  const [categories, setCategories] = useState([])


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
        getCategories()
    }, [])

  const titleRef = useRef()
  const categoryRef = useRef()

  const handleSubmit = async (e) => {
      e.preventDefault()

      const title = titleRef.current.value
      const categoryID = categoryRef.current.value
      console.log(categoryID)

      const note = value

      const apiRequest = await noteAPI.create(title, note, categoryID)

      if (apiRequest.response) {
        // window.location.reload(false);    
    } else {
        setError(apiRequest.error)
    }

    
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} data-color-mode="light">
        <Form.Group className='mb-3' controlId="form.Name">
            <Form.Control ref={titleRef} type="text" placeholder="Title" />
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
              commands={[]}
              textareaProps={{
                placeholder: 'Please enter Markdown text',
              }}
              className='mt-3'
              value={value} 
              onChange={setValue} 
            />
        </Form.Group>
        <Button className='mb-3' variant="primary" type="submit">
        Create
      </Button>
      {error && <p>{error}</p>}
      </Form>
    </div>
  )
}