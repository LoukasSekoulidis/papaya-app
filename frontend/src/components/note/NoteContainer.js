// React Functions
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { readNotesByCategoryAsync, readAllNotesAsync, selectNotes, selectNoteStatus, deleteNoteAsync, setCreateOrUpdate, selectNoteAction, selectUpdatingStatus, selectUpdateStatus } from '../../redux/notes/notesSlice'
import { selectCurrentCategoryID } from '../../redux/categories/categoriesSlice'

import { CircularProgress, Button } from '@mui/material'


// Components
// import Note from './Note'
import NoteMUI from './NoteMUI'

const noteAPI = require('../../api/note-api')


export default function NoteContainer({ updated, setUpdated }) {

    const [notes, setNotes] = useState([])
    const [error, setError] = useState()
    // use this to pre select category in selector
    const [selectedCategory, setSelectedCategory] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const params = useParams()
    const categoryID = params.id

    let updating = useSelector(selectUpdateStatus)

    const deleteNote = (id) => {
        dispatch(deleteNoteAsync(id))

        if (categoryID === undefined) {
            dispatch(readAllNotesAsync())
        } else {
            dispatch(readNotesByCategoryAsync(categoryID))
        }
    }

    const updateNote = (id) => {
        return navigate(`/dashboard/note/${id}`)
    }

    const showCreateNoteWindow = () => {
        dispatch(setCreateOrUpdate('create'))
    }

    // const readNotesByCategory = async () => {
    //   const apiRequest = await noteAPI.getNotesByCategory(categoryID)
    //   const notesFromResponse = apiRequest.notes
    //   setNotes(notesFromResponse)
    // }

    const notesStatus = useSelector(selectNoteStatus)
    const notesArray = useSelector(selectNotes)

    // useEffect(() => {
    //     if (updated) {
    //         if (categoryID === undefined) {
    //             dispatch(readAllNotesAsync())
    //         } else {
    //             dispatch(readNotesByCategoryAsync(categoryID))
    //         }
    //         setUpdated(false)
    //     }
    //     // eslint-disable-next-line
    // }, [updated])

    useEffect(() => {
        if (categoryID === undefined) {
            dispatch(readAllNotesAsync())
        } else {
            dispatch(readNotesByCategoryAsync(categoryID))
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (categoryID === undefined) {
            dispatch(readAllNotesAsync())
        } else {
            dispatch(readNotesByCategoryAsync(categoryID))
        }
        // eslint-disable-next-line
    }, [updating])



    if (notesStatus === 'succeeded') {
        return (
            <React.Fragment>
                <Button
                    style={{ width: '100%', marginBottom: '20px' }}
                    variant='contained'
                    color='neutral'
                    onClick={showCreateNoteWindow}
                >Create Note</Button>

                {notesArray.map(note => (
                    <NoteMUI
                        note={note}
                        id={note._id}
                        title={note.noteTitle}
                        input={note.noteInput}
                        updateNote={updateNote}
                        deleteNote={deleteNote}
                        error={error}
                        key={uuidv4()}
                    />
                ))}
            </React.Fragment>
        )
    } else if (notesStatus === 'loading') {
        // TBD
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
                <CircularProgress color='dark' />
            </div>
        )
    }
}