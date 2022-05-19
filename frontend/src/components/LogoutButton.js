// React Functions
import React from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const userAPI = require('../api/user-api')

export default function LogoutButton() {

  // const history = useNavigate()

  // const logout = () => {
  //   console.log('clicked logout')
  //   return history('/')
  // }

  return (
    <div>
        {/* <button onClick={logout}>Logout</button> */}
        <Link onClick={userAPI.logout} className='btn btn-primary btn-sm active mb-3' to={'/'}>Logout</Link>
    </div>
  )
}
