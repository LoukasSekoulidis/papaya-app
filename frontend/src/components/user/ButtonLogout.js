// React Functions
import React from 'react'
import { Link } from 'react-router-dom'

const userAPI = require('../../api/user-api')

export default function ButtonLogout() {

  return (
    <div>
        <Link onClick={userAPI.logout} className='btn btn-primary btn-sm active mb-3' to={'/'}>Logout</Link>
    </div>
  )
}
