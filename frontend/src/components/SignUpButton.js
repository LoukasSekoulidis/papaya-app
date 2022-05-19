// React Functions
import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from "react-router-dom"


export default function SignUpButton() {
  return (
    <div>
      <Container className='mt-3'>
        <Link className='btn btn-outline-primary btn-sm mb-3' to={'/signup'}>Sign Up</Link>
      </Container>
    </div>
  )
}
