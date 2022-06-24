import { React, useRef, useState, useEffect } from 'react'

import {Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// import 


const UserPreferences = () => {

  const userNameRef = useRef()
  let error

  const navigate = useNavigate()

  const navToDashobard = () =>
  {
    return navigate('/dashboard')
  }

  const handleSubmit = () => {

  }

  const getUser = () => {
    // userNameRef.current.value = 
  }

  useEffect(() => {
    getUser()
  }, [])
  

  const mdTheme = createTheme({
    breakpoints: {
      values: {
        md: 1125,
      }
    },
    palette: {
      neutral: {
        main: '#fff',
        contrastText: '#000'
      },
      dark: {
        main: '#000',
        contrastText: '#fff'
      }
    }
  })

  return (
    <div>
        <ThemeProvider theme={mdTheme}>
        <Container style={{width:"50%"}}>
        <h2>User Preferences</h2>
        <h5 className='mt-3'>Update your User Name</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mt-3 mb-3' controlId="form.Name">
              <Form.Control ref={userNameRef} value type="text" placeholder="Enter title" />
          </Form.Group>
        </Form>
        {error}
        <Button 
          color='dark'
          onClick={navToDashobard}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Done
        </Button>
      </Container>
      </ThemeProvider>
    </div>
  )
}

export default UserPreferences