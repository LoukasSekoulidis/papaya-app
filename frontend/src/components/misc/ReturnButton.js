import React from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';


const ReturnButton = () => {

    const navigate = useNavigate()


    const navToDashobard = () => {
        return navigate('/dashboard')
    }


    return (
    <Button 
        onClick={navToDashobard}
        variant="contained"
        // color='neutral'
        sx={{ ml: 2 }}
    >
        Back
    </Button>
    )
}

export default ReturnButton