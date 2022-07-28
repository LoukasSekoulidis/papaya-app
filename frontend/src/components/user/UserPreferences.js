import { React, useState, useEffect } from 'react'

import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'


import { useNavigate } from 'react-router-dom';

import { selectApperance, selectToken, selectUserID } from '../../redux/user/userSlice';
import { useSelector } from 'react-redux';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputLabel, Box, Typography, Modal, FormControl, InputAdornment, IconButton, FilledInput } from '@mui/material';

const userAPI = require('../../api/user-api')


const UserPreferences = () => {


  const [userName, setUserName] = useState()
  const [userMail, setUserMail] = useState()

  const [userPasswordCurrent, setUserPasswordCurrent] = useState()
  const [userPasswordNew, setUserPasswordNew] = useState()
  const [userPasswordConfirm, setUserPasswordConfirm] = useState()

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false)
  const [showPasswordNew, setShowPasswordNew] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const [error, setError] = useState()
  const [confirm, setConfirm] = useState()
  
  const [showOpenEditModal, setShowOpenEditModal] = useState(false)

  const [colorHeadline, setColorHeadline] = useState()

  // const token = useSelector(selectToken) 
  // const token = localStorage.getItem(LOCAL_STORAGE_KEY)
  const token = useSelector(selectToken)
  const userID = useSelector(selectUserID)
  const apperance = useSelector(selectApperance)
  const navigate = useNavigate()

  const navToDashobard = () => {
    return navigate('/dashboard')
  }

  const togglePasswordCurrent = () => {
    setShowPasswordCurrent(!showPasswordCurrent)
  }

  const togglePasswordNew = () => {
    setShowPasswordNew(!showPasswordNew)
  }

  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const hideConfirmDelete = () => {
    setShowConfirmDelete(false)
  }

  const hideEditUserModal = () => {
    setShowOpenEditModal(false)
  }

  const openConfirmDelete = () => {
    setShowConfirmDelete(true)
  }

  const openEditModal = () => {
    setShowOpenEditModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await userAPI.update(token, userID, userName, userMail)
    if(response.ok) {
      setConfirm('You successfully updated your Profile.')
    }

  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()

    if(!(userPasswordNew === userPasswordConfirm)){
      setError('Passwords do not match, please re-type.')
      return
    }

    // TODO API CALL TO CHANGE ONLY PASSWORD
    const response = await userAPI.updatePassword(token, userID, userPasswordCurrent, userPasswordNew)
    if(response.ok) {
      setConfirm('Your password has been successfully updated.')
    }

  }

  const deleteUser = async () => {
    const response = await userAPI.deleteUser(token, userID)
    if(response.ok) {
      return navigate('/delete')
      // return window.location.reload(false)
    } else {
      setError(response.error)
    }
  }

  const handleConfirmDelete = () => {
    deleteUser()
    hideConfirmDelete()
}

  const getUser = async () => {
      const response = await userAPI.getUser(userID, token)
      if(response.ok) {
        setUserName(response.user.userName)
        setUserMail(response.user.userMail)
      }
  }

  useEffect(() => {
    getUser()
    if(apperance === 'light'){
      setColorHeadline('black')
    } else {
      setColorHeadline('white')
    }
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
          <Modal 
            // show={showConfirmDelete} 
            // onHide={hideConfirmDelete}
            open={showConfirmDelete} 
            onClose={hideConfirmDelete}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you really want to delete your account?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please consider, that this can't be undone.
                <br></br>
                <Button 
                  variant="contained" 
                  color='error'
                  onClick={handleConfirmDelete}
                  sx={{ mt: 2 }}
                  >
                    Confirm
                </Button>
                <Button 
                  // className='m-2' 
                  id="CancelDeleteUserButton" 
                  variant="contained" 
                  color='success'
                  onClick={hideConfirmDelete}
                  sx={{ ml: 2, mt: 2 }}
                >
                    Cancel
                </Button>
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={showOpenEditModal}
            onClose={hideEditUserModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Password
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please type in your current Password and your new one to change it.
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {/* Input Field Current Password */}
                <FormControl 
                  style={{marginBottom: '15px', marginTop: '10px'}}
                  fullWidth
                  required
                  variant='standard'
                >
                  <InputLabel 
                    style={{fontWeight: 'normal', marginLeft: '5px'}}
                  >Current Password</InputLabel>
                  <FilledInput
                    type={showPasswordCurrent ? 'text' : 'password'}
                    value={userPasswordCurrent}
                    onChange={(e) => {setUserPasswordCurrent(e.target.value)}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordCurrent}
                          edge="end"
                        >
                          {showPasswordCurrent ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {/* Input Field New Password */}
                <FormControl 
                  style={{marginBottom: '15px'}}
                  fullWidth
                  required
                  variant='standard'
                >
                  <InputLabel 
                    style={{fontWeight: 'normal', marginLeft: '5px'}}
                  >New Password</InputLabel>
                  <FilledInput
                    type={showPasswordNew ? "text" : "password"}
                    name='userPasswordNew' 
                    value={userPasswordNew}
                    onChange={(e) => {setUserPasswordNew(e.target.value)}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordNew}
                          edge="end"
                        >
                          {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {/* Input Field New Password Confirm */}
                <FormControl 
                  style={{marginBottom: '25px'}}
                  fullWidth
                  required
                  variant='standard'
                >
                  <InputLabel 
                    style={{fontWeight: 'normal', marginLeft: '5px'}}
                  >Confirm New Password</InputLabel>
                  <FilledInput
                    type={showPasswordConfirm ? "text" : "password"}
                    name='userPasswordConfirm' 
                    value={userPasswordConfirm}
                    onChange={(e) => {setUserPasswordConfirm(e.target.value)}}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordConfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                      {/* <InputLabel style={{fontWeight: 'bold', marginTop: '10px'}}>New Password</InputLabel>
                      <Form.Control 
                        id="userPasswordNewInput" 
                        // type="password" 
                        type={showPassword ? "text" : "password"}
                        name='userPasswordNew' 
                        value={userPasswordNew}
                        onChange={(e) => {setUserPasswordNew(e.target.value)}}
                      />
                      <InputLabel style={{fontWeight: 'bold', marginTop: '10px'}}>Confirm New Password</InputLabel>
                      <Form.Control 
                        id="userPasswordConfirmInput" 
                        // type="password" 
                        type={showPassword ? "text" : "password"}
                        name='userPasswordConfirm' 
                        value={userPasswordConfirm}
                        onChange={(e) => {setUserPasswordConfirm(e.target.value)}}
                      /><i className="fa fa-eye-slash" aria-hidden="true"></i> */}
                  {/* </Form.Group> */}
                  { error && <p style={{ color: 'red' }}>{ error }</p>}
                  <Button 
                    type='submit' 
                    // color='neutral' 
                    variant='contained'
                  >
                    Update
                  </Button>
                  <Button 
                    variant='contained'
                    // color='neutral'
                    sx={{ ml: 2 }}
                    onClick={hideEditUserModal}
                  >
                    Cancel
                  </Button>
                  {/* <Button 
                    variant='contained'
                    // color='neutral'
                    sx={{ ml: 2 }}
                    onClick={togglePassword}
                  >
                    Show Password
                  </Button> */}
            {/* </Form> */}
            </Box>
            </Box>
        </Modal>
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
                className='mt-3 mb-5' 
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
                      User Password
                  </InputLabel>
                  <Form.Control 
                    style={{ marginBottom: '10px' }}
                    readOnly
                    id='userPasswordInput'
                    value={'password'}
                    type="password" 
                  />
                  <Button 
                    // color='dark'
                    onClick={openEditModal}
                    variant="outlined" 
                    color='error'
                    // color='red'
                    // sx={{ ml: 2 }}
                  >
                    Change Password
                  </Button>
                  <Button 
                    // color='dark'
                    onClick={openConfirmDelete}
                    variant="contained" 
                    color='error'
                    // color='red'
                    sx={{ ml: 2 }}
                  >
                    Delete Account
                  </Button>
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