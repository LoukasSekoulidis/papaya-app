// React Functions
import React from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {

  // const history = useNavigate()

  // const logout = () => {
  //   console.log('clicked logout')
  //   return history('/')
  // }

  return (
    <div>
        {/* <button onClick={logout}>Logout</button> */}
        <Link to={'/'}>Logout</Link>
    </div>
  )
}
