// React Functions
import React from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export default function CreateNoteButton() {

  return (
    <div>
        <Link className='btn btn-primary btn-sm active mb-3' to={'/note'}>Create Note</Link>
    </div>
  )
}
