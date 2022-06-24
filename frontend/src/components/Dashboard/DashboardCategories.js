import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';

import DashboardCategory from './DashboardCategory'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { readAllCategoriesAsync, selectCategories, selectCategoriesStatus, showCreateModal, closeCreateModal, selectOpenCreateModal, createCategoryAsync } from '../../redux/categories/categoriesSlice'


const categoryAPI = require('../../api/category-api')

const DashboardCategories = () => {

    // const [categories, setCategories] = useState([])
    const [error, setError] = useState()
    const open = useSelector(selectOpenCreateModal)

    const [category, setCategory] = useState('')

    const dispatch = useDispatch()

    // const getCategories = async () => {
    //     const apiRequest = await categoryAPI.read()

    //     if (apiRequest.response) {
    //         const categoriesFromResponse = apiRequest.categories
    //         for (let index = 0; index < categoriesFromResponse.length; index++) {
    //             let category = categoriesFromResponse[index]
    //             setCategories(prevArray => [...prevArray, category])
    //         }
    //         // return categoriesFromResponse
    //     } else {
    //         // return apiRequest.error
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createCategoryAsync(category))
        dispatch(readAllCategoriesAsync())

        handleClose()

        setCategory('')
    }

    const handleOpen = () => {
        dispatch(showCreateModal())
    }

    const handleClose = () => {
        dispatch(closeCreateModal())
    }

    useEffect(() => {
        dispatch(readAllCategoriesAsync())
    }, [])

    const categorieArray = useSelector(selectCategories)
    const categorieStatus = useSelector(selectCategoriesStatus)


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    if (categorieStatus === 'succeeded') {
        return (
            <>
                <ListSubheader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} component="div" inset>
                    Categories
                <AddIcon onClick={handleOpen} />
                </ListSubheader>
                {error && <p>{error}</p>}
                {categorieArray.map(category => (
                    <DashboardCategory
                        categoryTitle={category.categoryTitle}
                        key={uuidv4()}
                        id={category._id}

                    />
                ))}

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={style}>
                        <TextField
                            style={{ width: '100%' }}
                            margin="normal"
                            required
                            name="name"
                            label="Category Name"
                            type="text"
                            id="categoryTitle"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <Button
                            style={{ width: '100%' }}
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                    </Button>
                    </Box>
                </Modal>
            </>
        )
    }
}

export default DashboardCategories