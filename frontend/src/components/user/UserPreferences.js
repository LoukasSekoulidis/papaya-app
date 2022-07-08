import { React, useRef, useState, useEffect } from 'react'

import {Container, FormControl } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'


import { useNavigate } from 'react-router-dom';

import { selectApperance, selectToken, selectUserID } from '../../redux/user/userSlice';
import { useSelector } from 'react-redux';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { InputLabel, Box, Typography } from '@mui/material';

const LOCAL_STORAGE_KEY = 'papaya.token'

// import 

const userAPI = require('../../api/user-api')


const UserPreferences = () => {


  const [userName, setUserName] = useState()
  const [userMail, setUserMail] = useState()
  const [userPassword, setUserPassword] = useState()
  const [userPasswordConfirm, setUserPasswordConfirm] = useState()
  const [error, setError] = useState()
  const [confirm, setConfirm] = useState()

  const [colorHeadline, setColorHeadline] = useState()

  // const token = useSelector(selectToken) 
  const token = localStorage.getItem(LOCAL_STORAGE_KEY)
  const userID = useSelector(selectUserID)
  const apperance = useSelector(selectApperance)
  const navigate = useNavigate()

  const navToDashobard = () =>
  {
    return navigate('/dashboard')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!(userPassword === userPasswordConfirm)){
      setError('Passwords do not match, please re-type.')
      return
    }

    const response = await userAPI.update(token, userID, userName, userMail, userPassword)
    if(response.ok) {
      setConfirm('You successfully updated your Profile.')
    }

  }

  const getUser = async () => {
      const response = await userAPI.getUser(userID, token)
      if(response.ok) {
        setUserName(response.user.userName)
        setUserMail(response.user.userMail)
        setUserPassword(response.user.password)
        setUserPasswordConfirm(response.user.password)
      }
  }

  useEffect(() => {
    getUser()
    if(apperance === 'light'){
      setColorHeadline('black')
    } else {
      setColorHeadline('white')
    }
    console.log(apperance)
    console.log(colorHeadline)
  }, [])
  

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          headline: {
            main: '#57f542',
            contrastText: '#fff' 
          },
          neutral: {
            main: '#fff',
            contrastText: '#000'
          },
          dark: {
            main: '#000',
            contrastText: '#fff'
          },
          }
        : {
          headline: {
            main: '#57f542',
            contrastText: '#fff' 
          },
          neutral: {
            main: '#000',
            contrastText: '#fff'
          },
          dark: {
            main: '#fff',
            contrastText: '#000'

          },
          }),
    },
  });

  const darkModeTheme = createTheme(getDesignTokens(apperance))
  // const darkModeTheme = createTheme(getDesignTokens('dark'))
  // const darkModeTheme = createTheme(getDesignTokens('light'))

  return (
    <div>
        <ThemeProvider theme={darkModeTheme}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            height: '100vh',
            overflow: 'auto',
          }}
        >
            <Container  style={{width:"50%"}}>
              {/* <Typography
              component="h1"
              variant="h5"
              color='headline'
            >
              Test
            </Typography> */}
            <h2 style={{marginTop: '20px', color: colorHeadline}}>User Preferences</h2>
            <h5 style={{marginTop: '30px', color: colorHeadline}} className='mt-3'>Update your User Information</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group 
                className='mt-3 mb-3' 
                // controlId="form.Name"
              >
                  <InputLabel>
                      User Name
                  </InputLabel>
                  <Form.Control 
                    style={{ marginBottom: '10px' }}
                    id='userNameInput'
                    value={userName} 
                    onChange={(e) => {setUserName(e.target.value)}} 
                    type="text" 
                    placeholder="Enter User Name" 
                  />
                  <InputLabel>
                      User Mail
                  </InputLabel>
                  <Form.Control 
                    style={{ marginBottom: '10px' }}
                    id='userMailInput'
                    value={userMail}
                    onChange={(e) => {setUserMail(e.target.value)}} 
                    type="email" 
                    placeholder="Enter Email" 
                  />
                  <InputLabel>
                      Password
                  </InputLabel>
                  <Form.Control 
                    style={{ marginBottom: '10px' }}
                    id='userPasswordInput'
                    value={userPassword}
                    onChange={(e) => {setUserPassword(e.target.value)}} 
                    type="password" 
                    placeholder="Enter Password" 
                  />
                  <InputLabel>
                      Confirm Password
                  </InputLabel>
                  <Form.Control 
                    style={{ marginBottom: '10px' }}
                    id='userPasswordConfirmInput'
                    value={userPasswordConfirm}
                    onChange={(e) => {setUserPasswordConfirm(e.target.value)}} 
                    type="password" 
                    placeholder="Confirm Password" 
                  />
                { error && <p style={{ color: 'red' }}>{ error }</p>}
                { confirm && <p style={{ color: 'green' }}>{ confirm }</p>}

              </Form.Group>
              <Button 
                type='submit' 
                color='dark' 
                variant='contained'
              >
                Save
              </Button>
              <Button 
              // color='dark'
              onClick={navToDashobard}
              variant="contained"
              color='neutral'
              sx={{ ml: 2 }}
            >
              Back
            </Button>
            </Form>
          
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default UserPreferences