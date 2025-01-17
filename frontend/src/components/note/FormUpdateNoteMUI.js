// React Functions
import { React, useState, useEffect } from 'react'

// Markdown
import MDEditor from '@uiw/react-md-editor'

// CSS
import { Box, TextField, FormGroup, Select, Button, MenuItem } from '@mui/material'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectApperance, selectToken } from '../../redux/user/userSlice';
import { selectCurrentNoteID, updateNoteAsync } from '../../redux/notes/notesSlice'
import { readAllCategoriesAsync, selectCategories, selectCategoriesStatus } from '../../redux/categories/categoriesSlice'
import { selectNoteAction, readAllNotesAsync } from '../../redux/notes/notesSlice'


// API
const noteAPI = require('../../api/note-api')

export default function FormCreateNote({ setUpdated }) {
    const dispatch = useDispatch()

    const categoryArray = useSelector(selectCategories)
    const categoriesStatus = useSelector(selectCategoriesStatus)

    const [noteTitle, setNoteTitle] = useState('')
    const [noteText, setNoteText] = useState('')

    const [error, setError] = useState()

    const [categories, setCategories] = useState([])

    const [selectedCategory, setSelectedCategory] = useState('')

    const [updating, setUpdating] = useState('false')

    const apperance = useSelector(selectApperance)

    const currentNoteID = useSelector(selectCurrentNoteID)

    const noteAction = useSelector(selectNoteAction)

    const token = useSelector(selectToken)
    // const updating = useSelector(selectUpdatingStatus)

    const getCategories = async () => {
        dispatch(readAllCategoriesAsync())
    }

    const getNote = async () => {
        const id = currentNoteID
        const apiRequest = await noteAPI.getNote(token, id)

        if (apiRequest) {
            setNoteTitle(apiRequest.note.noteTitle)
            setNoteText(apiRequest.note.noteInput)
        } else {
            setError(apiRequest.error)
            //   setShow(true)
        }
    }

    useEffect(() => {
        getCategories()
        getNote()
    }, [noteAction])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const id = currentNoteID
        const categoryTitle = selectedCategory

        dispatch(updateNoteAsync({ token, id, noteTitle, noteInput: noteText, categoryTitle }))
        setUpdated(true)
        dispatch(readAllNotesAsync())
    }

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    if (categoriesStatus === 'succeeded') {
        return (
            <div>
                <Box component="form" onSubmit={handleSubmit} noValidate data-color-mode={apperance}>
                    <TextField
                        style={{ width: '100%', marginBottom: '10px' }}
                        required
                        id="username"
                        name="username"
                        label='Titel'
                        value={noteTitle}
                        onChange={(e) => { setNoteTitle(e.target.value) }}
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
                            // remove comment to remove toolbar
                            // commands={[]}
                            textareaProps={{
                                placeholder: 'Please enter Markdown text',
                            }}
                            className='mt-3'
                            value={noteText}
                            onChange={setNoteText}
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