import React, { useEffect, useState, useRef } from 'react'
// import  { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';


import SingleListItem from './SingleListItem'

const categoryAPI = require('../../api/category-api')


const SecondaryItemList = () => {

    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [error, setError] = useState()
    
    const [category, setCategory] = useState('')

    const getCategories = async () => {
        const apiRequest = await categoryAPI.read()

        if(apiRequest.response) {
            const categoriesFromResponse = apiRequest.categories
            for (let index = 0; index < categoriesFromResponse.length; index++) {
                let category = categoriesFromResponse[index]
                setCategories(prevArray => [...prevArray, category])
            }
            // return categoriesFromResponse
        } else {
            // return apiRequest.error
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // console.log(`with form state: ${category}`)
        
        const apiRequest = await categoryAPI.create(category)

        if(apiRequest.response) {
            console.log(apiRequest.response)
            window.location.reload(false);
        } else {
            console.log(apiRequest.error)
            setError(apiRequest.error)
        }
 
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    useEffect(() => {
        getCategories()
    }, [])

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
    

    return (
        <React.Fragment>
            <ListSubheader style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} component="div" inset>
                Categories
                <AddIcon onClick={handleOpen} />
            </ListSubheader>
            {/* {error && <p>{error}</p>} */}
            {categories.map(category => (
                <SingleListItem 
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
                        style ={{width: '100%'}}
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
                        style ={{width: '100%'}}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    Create
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default SecondaryItemList