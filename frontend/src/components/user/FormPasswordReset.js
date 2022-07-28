import { React, useState } from "react"

import { useNavigate } from 'react-router-dom'

import { TextField, Box, Container, Button } from '@mui/material';

const userAPI = require('../../api/user-api')


function FormPasswordReset() {

    const [mail, setMail] = useState('')
    const [error, setError] = useState()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(mail)
        const apiRequest = await userAPI.resetPassword(mail)
        console.log(apiRequest)
        if (apiRequest.ok) {
            console.log('response!!!!')
            return navigate('/dashboard')
        } else {
            setError(apiRequest.error)
        }

    }

    return (
        < Container component="main" maxwidth="xs" >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* <Box component="form" noValidate sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}> */}
                <TextField
                    style={{ width: '50%' }}
                    margin="normal"
                    name="userMail"
                    label="userMail"
                    type="text"
                    id="userMail"
                    onChange={(e) => setMail(e.target.value)}
                />
                <Button
                    style={{ width: '50%' }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Reset Password
                 </Button>
            </Box>
        </Container >
    )
}

export default FormPasswordReset
