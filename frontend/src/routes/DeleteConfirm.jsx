import React from 'react'
import ReturnAndLogoutButton from '../components/misc/ReturnAndLogoutButton'

import "../style/main.css"

const DeleteConfirm = () => {
  return (
    <div className='info_container'>
        <h1>Confirmation</h1>
        <h3>Your account has been successfully deleted.</h3>
        <ReturnAndLogoutButton />
    </div>
  )
}

export default DeleteConfirm