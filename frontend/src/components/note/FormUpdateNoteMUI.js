// React Functions
import { React, useRef, useState, useEffect } from 'react'

// Markdown
import MDEditor from '@uiw/react-md-editor'

// CSS
import { Box, TextField, FormControl, FormGroup, Select, Button, InputLabel, Input, FormHelperText, MenuItem } from '@mui/material'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectApperance } from '../../redux/user/userSlice';
import { createNoteAsync, selectCurrentNoteID, updateNoteAsync } from '../../redux/notes/notesSlice'
import { readAllCategoriesAsync, selectCategories, selectCategoriesStatus, selectCurrentCategory } from '../../redux/categories/categoriesSlice'

// API
const noteAPI = require('../../api/note-api')
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

  const [selectedCategory, setSelectedCategory] = useState('')

  const apperance = useSelector(selectApperance)

  const currentNoteID = useSelector(selectCurrentNoteID)

  const getCategories = async () => {
    dispatch(readAllCategoriesAsync())
  }

  const getNote = async () => {
    // console.log('get note')
    // console.log(currentNoteID)
    const id = currentNoteID
    const apiRequest = await noteAPI.getNote(id)

    if(apiRequest){
      titleRef.current.value = apiRequest.note.noteTitle
      setValue(apiRequest.note.noteInput)
    } else {
      setError(apiRequest.error)
    //   setShow(true)
    }
  }

  useEffect(() => {
    getCategories()
    getNote()
  }, [])

  const titleRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const title = titleRef.current.value
    const categoryID = selectedCategory

    const note = value

    // console.log(title)
    // console.log(categoryID)
    // console.log(note)

    dispatch(updateNoteAsync({ id: currentNoteID,  title: title, note: note, categoryID: categoryID }))

    titleRef.current.value = ''
    setValue('')
    setSelectedCategory('')
  }

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    // console.log(e.target.value);
  }

if(categoriesStatus === 'succeeded') {
  return (
    <div>
      <Box component="form" onSubmit={handleSubmit} noValidate data-color-mode={apperance}>
        <TextField
              style ={{width: '100%', marginBottom: '10px'}}
              required
              id="username"
              name="username"
              label='Titel'
              inputRef={titleRef}
            />
        <FormGroup>
          <Select
            value={selectedCategory}
            onChange={handleChange}
            label='Select Category'
            placeholder='Select'
            defaultValue='Foobar'
          >
            {categoryArray.map(category => (
              <MenuItem
                key={category._id}
                value={category._id}
                id={category.categoryTitle}
              >{category.categoryTitle}</MenuItem>
            ))}
          </Select>
        </FormGroup>
        <FormGroup className='mb-3'>
          <MDEditor
            commands={[]}
            textareaProps={{
              placeholder: 'Please enter Markdown text',
            }}
            className='mt-3'
            value={value}
            onChange={setValue}
          />
        </FormGroup>
        <Button 
          variant='contained' 
          color='neutral' 
          type="submit"
        >
          Update
        </Button>
        {error && <p>{error}</p>}
      </Box>
    </div>
  )
  
}
}