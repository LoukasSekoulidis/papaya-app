// React Functions
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { readNotesByCategoryAsync, readAllNotesAsync, selectNotes, selectNoteStatus, deleteNoteAsync, setCreateOrUpdate, selectUpdateStatus } from '../../redux/notes/notesSlice'

import { CircularProgress, Button } from '@mui/material'


// Components
import NoteMUI from './NoteMUI'


export default function NoteContainer({ updated, setUpdated }) {

    const [notes, setNotes] = useState([])
    const [error, setError] = useState()

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

    const notesStatus = useSelector(selectNoteStatus)
    const notesArray = useSelector(selectNotes)

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