import React from 'react'
import Note from './Note'

export default function Notes({ notes }) {

  // console.log(notes)

  // let notesArray = []
  // for (var key in notes) {
  //   if (notes.hasOwnProperty(key)) {

  //     // notes[key].push(notesArray)
  //     // console.log(notes[key])
  //     notesArray.push(notes[key])
  //   }
  // }

  console.log(notes)

  return (
    notes.map(note =>{
        return <Note key={note.id} title={note.title} content={note.content} /> 
    })
  )
}
