// React Functions
import { React, useRef, useState, useEffect } from 'react'

// Markdown
import MDEditor from '@uiw/react-md-editor'

// CSS
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAsync } from '../../redux/notes/notesSlice'
import { readAllCategoriesAsync, selectCategories, selectCategoriesStatus, selectCurrentCategory } from '../../redux/categories/categoriesSlice'

// API
const categoryAPI = require('../../api/category-api')


export default function FormCreateNote() {
  const dispatch = useDispatch()

  const categoryArray = useSelector(selectCategories)
  const categoriesStatus = useSelector(selectCategoriesStatus)

  // const currentSelectedCategory = useSelector(selectCurrentCategory)


  // for markdown
  const [value, setValue] = useState('')

  const [error, setError] = useState()

  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState()


  const getCategories = async () => {
    dispatch(readAllCategoriesAsync())
  }

  useEffect(() => {
    getCategories()
  }, [])

  const titleRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const title = titleRef.current.value
    const categoryID = selectedCategory

    const note = value

    dispatch(createNoteAsync({ title: title, note: note, categoryID: categoryID }))

    titleRef.current.value = ''
    setValue('')
    setSelectedCategory('')
  }

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  }

if(categoriesStatus === 'succeeded') {
  return (
    <div>
      <Form onSubmit={handleSubmit} data-color-mode="light">
        <Form.Group className='mb-3' controlId="form.Name">
          <Form.Control ref={titleRef} type="text" placeholder="Title" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="form.Category">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleChange}
          >
            <option value={''}>Select Category</option>
            {categoryArray.map(category => (
              <option
                key={category._id}
                value={category._id}
                id={category.categoryTitle}

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
        <Button className='mb-3' variant="dark" type="submit">
          CREATE
      </Button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}
}