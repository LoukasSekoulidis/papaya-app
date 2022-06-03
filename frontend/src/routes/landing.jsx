import React from 'react'

import LoginForm from '../components/user/LoginForm'
import SignUpButton from '../components/user/SignUpButton'


export default function Landing() {
  return (
    <React.Fragment>
        <LoginForm />
        <SignUpButton />
    </React.Fragment>
  )
}
