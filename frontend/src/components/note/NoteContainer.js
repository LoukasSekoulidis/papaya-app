import React from 'react'
import Notes from './Notes'

export default function NoteContainer(notes) {
  return (
    <div>
        <ul>
            <Notes notes={notes} />
        </ul>
    </div>
  )
}
