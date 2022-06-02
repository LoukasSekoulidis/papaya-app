import React from 'react'
import { Button } from 'react-bootstrap'

const SingleNote = ({id, title, input, updateNote, deleteNote, error}) => {
  
  return (
    <React.Fragment>
      <li style={{ listStyleType: "none" }} key={id}>
        <div className="mb-2 card">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{input}</p>
            <p style={{'color': 'rgb(255,0,0'}}>{error}</p>
            <Button onClick={() => {updateNote(id)}} variant='secondary'>Update</Button>
            <Button className='m-2' onClick={() => {deleteNote(id)}} variant='danger'>Delete</Button>
          </div>
        </div>
      </li>
    </React.Fragment>
  )
}

export default SingleNote
