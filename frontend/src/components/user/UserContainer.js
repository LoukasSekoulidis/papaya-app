import React from 'react'

import { useEffect, useState } from 'react'
import { selectToken } from '../../redux/user/userSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



import { Container, Modal, Form, Button, ToggleButton } from 'react-bootstrap'

import UserCard from '../user/UserCard'
const userAPI = require('../../api/user-api')

const UserContainer = () => {

    const token = useSelector(selectToken)

    const [allUsers, setAllUsers] = useState()
    const [gotAllUsers, setGotAllUsers] = useState(false)

    const [error, setError] = useState()

    const navigate = useNavigate()


    // states for form edit
    const [userMailEditState, setUserMailEditState] = useState()
    const [userNameEditState, setUserNameEditState] = useState()
    const [userPasswordEditState, setUserPasswordEditState] = useState()
    const [isAdminEditState, setIsAdminEditState] = useState()
    const [isConfirmedEditState, setIsConfirmedEditState] = useState()

    // show modals
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [showOpenEditModal, setShowOpenEditModal] = useState(false)

    const getAllUsers = async () => {
      const response = await userAPI.getAllUser(token)
      if(response.ok) {
        setGotAllUsers(true)
        setAllUsers(response.users)
      } else {

      }
    }

    const navToDashobard = () => {
      return navigate('/dashboard')
    }

    useEffect(() => {
      getAllUsers()
      // some weird workaround, so that page reloads on change
      // eslint-disable-next-line
    }, [gotAllUsers])

    const openEditUserModal = () => {
      setShowOpenEditModal(true)
    }

    const openConfirmDeleteModal = () => {
      setShowConfirmDelete(true)
    }

    const setValues = (user) => {
      setUserMailEditState(user.userMail)

      setUserNameEditState(user.userName)
      setUserPasswordEditState(user.password)

      setIsAdminEditState(user.isAdministrator)
      setIsConfirmedEditState(user.confirmed)
    }

    const hideEditUserModal = () => {
      setShowOpenEditModal(false)
    }

    const hideConfirmDelete = () => {
      setShowConfirmDelete(false)
    }

    const getUserToDelete = (user) => {
      setValues(user)
      openConfirmDeleteModal()
    }

    const setCurrentUser = (user) => {
      setValues(user)
      openEditUserModal()
    }

    const deleteUser = async (userID) => {
      const response = await userAPI.deleteUser(token, userID)
      if(response.ok) {
        setGotAllUsers(false)
      } else {
        setError(response.error)
      }
    }

    const handleConfirmDelete = () => {
      deleteUser(userMailEditState)
      hideConfirmDelete()
  }

    const handleSubmit = async (e) => {
      e.preventDefault()

      const userMail = userMailEditState
      const userName = userNameEditState
      const userPassword = userPasswordEditState
      const isAdministrator = isAdminEditState
      const confirmed = isConfirmedEditState

      const response = await userAPI.update(token, userMail, userName, userPassword, isAdministrator, confirmed)
      if(response.ok) {
        setGotAllUsers(false)
        hideEditUserModal()
      }

    }

    if(gotAllUsers) {
        return (
          <div>
            <Modal show={showConfirmDelete} onHide={hideConfirmDelete}>
              <Modal.Header>
                  <Modal.Title>Do you really want to delete "{userNameEditState}"</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button id="ConfirmDeleteUserButton" variant="danger" onClick={handleConfirmDelete}>
                    Confirm
                </Button>
                <Button className='m-2' id="CancelDeleteUserButton" variant="dark" onClick={hideConfirmDelete}>
                    Cancel
                </Button>
              </Modal.Body>
              <Modal.Footer>Please consider, that this can't be undone.</Modal.Footer>
            </Modal>
            <Modal show={showOpenEditModal} onHide={hideEditUserModal}>
              <Modal.Header closeButton>
                  <Modal.Title>Update User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group 
                          className="mb-3" 
                      >
                          <Form.Label>User ID</Form.Label>
                          <Form.Control 
                            id='UserMailInput' 
                            // readOnly 
                            type="text" 
                            name='userID' 
                            value={userMailEditState}
                            onChange={setUserMailEditState}
                          />
                      </Form.Group>
                      <Form.Group 
                          className="mb-3" 
                      >
                          <Form.Label>User Name</Form.Label>
                          <Form.Control 
                            id="UserNameInput" 
                            type="text" 
                            name='userName' 
                            value={userNameEditState}
                            onChange={(e) => {setUserNameEditState(e.target.value)}}
                          />
                      </Form.Group>
                      <Form.Group 
                          className="mb-3" 
                      >
                          <Form.Label>Password</Form.Label>
                          <Form.Control 
                            id="PasswordInput" 
                            type="password" 
                            name='password' 
                            value={userPasswordEditState}
                            onChange={(e) => {setUserPasswordEditState(e.target.value)}}
                          />
                      </Form.Group>
                      <Form.Group>
                        <ToggleButton
                          className="mb-2"
                          id="IsAdministratorInput"
                          type="checkbox"
                          variant="outline-danger"
                          checked={isAdminEditState}
                          onChange={(e) => {setIsAdminEditState(e.target.checked)}}
                        >
                          Administrator Privileges
                        </ToggleButton>
                      </Form.Group>
                      <Form.Group>
                        <ToggleButton
                          className="mb-2"
                          id="IsConfirmedInput"
                          type="checkbox"
                          variant="outline-primary"
                          checked={isConfirmedEditState}
                          onChange={(e) => {setIsConfirmedEditState(e.target.checked)}}
                        >
                          Confirmed
                        </ToggleButton>
                      </Form.Group>
                      { error && <p style={{ color: 'red' }}>{ error }</p>}
                      <Button id="SaveUserButton" variant="dark" type="submit">
                          Update
                      </Button>
                      <Button className='m-2' id="CancelEditUserButton" variant="dark" onClick={hideEditUserModal}>
                          Cancel
                      </Button>
                  </Form>
              </Modal.Body>
            </Modal>
            <Container className='mt-10'>
              {/* <Button id="OpenCreateUserDialogButton" variant='dark' className='mb-2 mt-5' style={{width: '100%'}} onClick={openCreateUserModal}>Create New User</Button> */}
              {allUsers.map(user => (
                <UserCard
                id={"UserItem" + user.userID}
                key={user.userID}
                user = {user}
                openEditUserModal = { openEditUserModal }
                deleteUser = { deleteUser }
                setCurrentUser = { setCurrentUser }
                getUserToDelete = { getUserToDelete }
                />
                ))}
            </Container>
            <Button 
              // color='dark'
              onClick={navToDashobard}
              variant="contained"
              color='neutral'
              sx={{ ml: 2 }}
            >
              Back
            </Button>
          </div>
        )
    }
}

export default UserContainer