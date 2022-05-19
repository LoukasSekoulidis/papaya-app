// React Functions
import React from 'react'

// CSS
import { Container, Form, Button } from 'react-bootstrap'

export default function FormTemplate({handleSubmit, mailRef, passwordRef, useCase, error}) {

   return (
    <Container>
      <h2 className='mt-3' >{useCase}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={mailRef} type="email" placeholder="Enter email" />
        </Form.Group>
    
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passwordRef} type="password" placeholder="Password" />
        </Form.Group>
        <div className='d-flex align-items-center mt-3'>
          <p style={{'color': 'rgb(255,0,0'}}>{error}</p>
        </div>
        <Button variant="primary" type="submit">
          {useCase}
        </Button>
      </Form>
    </Container>
    )
}
