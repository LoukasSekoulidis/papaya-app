import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import ListItemIcon from '@mui/material/ListItemIcon';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';

import DashboardCategory from './DashboardCategory'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { readAllCategoriesAsync, selectCategories, selectCategoriesStatus, showCreateModal, closeCreateModal, selectOpenCreateModal, createCategoryAsync } from '../../redux/categories/categoriesSlice'

const DashboardCategories = () => {

    const [error, setError] = useState()
    const open = useSelector(selectOpenCreateModal)

    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(category + '  ' + color)
        dispatch(createCategoryAsync({ category: category, color: color }))
        dispatch(readAllCategoriesAsync())

        handleClose()

        setCategory('')
        setColor('')
    }

    const handleOpen = () => {
        dispatch(showCreateModal())
    }

    const handleClose = () => {
        dispatch(closeCreateModal())
    }

    useEffect(() => {
        dispatch(readAllCategoriesAsync())
    //eslint-disable-next-line
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
                        catColor={category.color}
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
                        <TextField
                            style={{ width: '100%' }}
                            margin="normal"
                            name="color"
                            label="Category Color"
                            type="text"
                            id="categoryColor"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <ListItemIcon style={{ color: 'red' }} onClick={(e) => setColor('red')}>
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'blue' }} onClick={(e) => setColor('blue')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'yellow' }} onClick={(e) => setColor('yellow')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'green' }} onClick={(e) => setColor('green')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'brown' }} onClick={(e) => setColor('brown')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'black' }} onClick={(e) => setColor('black')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'gray' }} onClick={(e) => setColor('gray')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'pink' }} onClick={(e) => setColor('pink')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'violet' }} onClick={(e) => setColor('violet')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'coral' }} onClick={(e) => setColor('coral')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'teal' }} onClick={(e) => setColor('teal')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
                        <ListItemIcon style={{ color: 'orange' }} onClick={(e) => setColor('orange')} >
                            <NoiseControlOffIcon />
                        </ListItemIcon>
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