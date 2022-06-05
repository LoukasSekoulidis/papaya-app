import React, { useEffect, useState } from 'react'
// import  { useNavigate } from 'react-router-dom'


import ListSubheader from '@mui/material/ListSubheader';
import SingleListItem from './SingleListItem'

const categoryAPI = require('../../api/category-api')


const SecondaryItemList = () => {

    const [categories, setCategories] = useState([])
    // const navigate = useNavigate()


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

    // const handleOnClick = (id) => {
    //     // return navigate(`/dashboard/${id}`)
    // }
    
    useEffect(() => {
        getCategories()
    }, [])
    

    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                categories
            </ListSubheader>
            {categories.map(category => (
                <SingleListItem 
                    categoryTitle={category.categoryTitle}
                    key={category._id} 
                    id={category._id}
                />
            ))}
        </React.Fragment>
    )
}

export default SecondaryItemList