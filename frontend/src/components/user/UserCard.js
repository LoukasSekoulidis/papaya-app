import React, { useState, useEffect } from 'react'


import { ListGroup, Button } from 'react-bootstrap'


const UserCard = ({ user, deleteUser, setCurrentUser, getUserToDelete }) => {

    const [statusColor, setStatusColor] = useState()

    const handleEditButton = () => {
        setCurrentUser(user)
    }

    const handleDeleteButton = () => {
        getUserToDelete(user)
    }

    const getColorForAdminStatus = () => {
        if(user.isAdministrator) {
            setStatusColor('red')
        } else {
            setStatusColor('green')
        }
    }

    useEffect(() => {
        getColorForAdminStatus()
    }, [])
    

    const adminStatusAsString = user.isAdministrator.toString()
    const confirmStatusAsString = user.confirmed.toString()

    return (
        <div>
            <div className="mb-2 card border-3 border-dark" >
                <div className="card-body">
                    <h3 className="card-title">{user.userName}</h3>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><span style={{fontWeight: 'bold'}}>User Mail: </span> {user.userMail}</ListGroup.Item>
                        <ListGroup.Item><span style={{fontWeight: 'bold'}}>Administrator: </span><span style={{color: statusColor}} >{adminStatusAsString}</span></ListGroup.Item>
                        <ListGroup.Item><span style={{fontWeight: 'bold'}}>confirmed: </span>{confirmStatusAsString}</ListGroup.Item>
                        <ListGroup.Item><span style={{fontWeight: 'bold'}}>confirmed: </span>{user.confirmationCode}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="outline-dark" onClick={handleEditButton}>Edit</Button>
                    <Button className='m-2' variant="outline-dark" onClick={handleDeleteButton}>Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
