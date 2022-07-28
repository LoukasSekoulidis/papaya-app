import React from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userSlice';


const ReturnAndLogoutButton = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const navToDashobard = () => {
        dispatch(logout())
        return navigate('/')
    }


    return (
    <Button 
        onClick={navToDashobard}
        variant="contained"
        // color='neutral'
        sx={{ ml: 2 }}
    >
        Back to Landing
    </Button>
    )
}

export default ReturnAndLogoutButton