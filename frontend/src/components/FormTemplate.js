// React Functions
import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function FormTemplate({handleSubmit, mailRef, passwordRef, useCase}) {
  
   return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control ref={mailRef} type="email" placeholder="Enter email" />
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={passwordRef} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {useCase}
      </Button>
    </Form>
    )
}
