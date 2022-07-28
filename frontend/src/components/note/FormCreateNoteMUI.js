// React Functions
import { React, useRef, useState, useEffect } from 'react'

// Markdown
import MDEditor from '@uiw/react-md-editor'

// CSS
import { Box, TextField, FormGroup, Select, Button, MenuItem } from '@mui/material'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { createNoteAsync } from '../../redux/notes/notesSlice'
import { readAllCategoriesAsync, selectCategories, selectCategoriesStatus } from '../../redux/categories/categoriesSlice'

import { selectApperance } from '../../redux/user/userSlice';

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

        const note = value + ' '

        dispatch(createNoteAsync({ title: title, note: note, categoryID: categoryID }))

        titleRef.current.value = ''
        setValue('')
        setSelectedCategory('')
    }

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
        // console.log(e.target.value);
    }

    if (categoriesStatus === 'succeeded') {
        return (
            <div>
                <Box component="form" onSubmit={handleSubmit} noValidate data-color-mode={apperance}>
                    <TextField
                        style={{ width: '100%' }}
                        margin="normal"
                        required
                        id="username"
                        name="username"
                        // placeholder='Title'
                        label='Titel'
                        inputRef={titleRef}
                    />
                    <FormGroup>
                        <Select
                            margin='dense'
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
                            value={value}
                            onChange={setValue}
                        />
                    </FormGroup>
                    <Button
                        variant='contained'
                        color='neutral'
                        type="submit"
                    >
                        Create
        </Button>
                    {error && <p>{error}</p>}
                </Box>
            </div>
        )

    }
}