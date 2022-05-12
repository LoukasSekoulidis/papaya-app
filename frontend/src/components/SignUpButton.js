// React Functions
import React from 'react'
import { Link } from "react-router-dom"


export default function SignUpButton() {
  return (
    <div>
        <Link to={'/signup'}>Sign Up</Link>
    </div>
  )
}
