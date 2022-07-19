import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const noteAPI = require('../../api/note-api')

const initialState = {
    notes: null,
    status: null,
    error: null,
}

export const readAllNotesAsync = createAsyncThunk(
    'notes/readAllNotesAsync',
    async (userData, { rejectWithValue, getState }) => {
        const token = getState().user.token

        const response = await noteAPI.read(token)
        if (response.response) {
            return response.notes
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const readNotesByCategoryAsync = createAsyncThunk(
    'notes/readNotesByCategoryAsync',
    async (categoryId, { rejectWithValue, getState }) => {
        const token = getState().user.token

        const response = await noteAPI.getNotesByCategory(token, categoryId)
        if (response.response) {
            return response.notes
        } else {
            return rejectWithValue(response.error)
        }
    }
)


export const createNoteAsync = createAsyncThunk(
    'notes/createNoteAsync',
    async ({ title, note, categoryID }, { rejectWithValue, getState }) => {
        const token = getState().user.token

        console.log('inside async thunk')
        const response = await noteAPI.create(token, title, note, categoryID)
        if (response.response) {
            return response.note
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const deleteNoteAsync = createAsyncThunk(
    'notes/deleteNoteAsync',
    async (id, { rejectWithValue, getState }) => {
        const token = getState().user.token

        const response = await noteAPI.remove(token, id)
        if (response.response) {
            return response
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const updateNoteAsync = createAsyncThunk(
    'notes/updateNoteAsync',
    async ({ id, noteTitle, noteInput, categoryTitle }, { rejectWithValue, getState }) => {
        const token = getState().user.token

        const response = await noteAPI.update(token, id, noteTitle, noteInput, categoryTitle)
        console.log(response)
        if (response.response) {
            return response
        } else {
            return rejectWithValue(response.error)
        }
    }
)


export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setCreateOrUpdate: (state, payload) => {
            console.log(payload.payload)
            state.action = payload.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // readAllNotesAsync
            .addCase(readAllNotesAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(readAllNotesAsync.fulfilled, (state, { payload }) => {
                // console.log(`fulfilled`)
                state.status = 'succeeded'
                state.notes = payload
                state.error = null
            })
            .addCase(readAllNotesAsync.rejected, (state, error) => {
                // console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })
            // createNoteAsync
            .addCase(createNoteAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createNoteAsync.fulfilled, (state, { payload }) => {
                state.notes = [...state.notes, payload]
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(createNoteAsync.rejected, (state, error) => {
                // console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })
            // deleteNoteAsync
            .addCase(deleteNoteAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(deleteNoteAsync.fulfilled, (state, { payload }) => {
                // console.log('fulfilled')
                state.notes = [...state.notes]
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(deleteNoteAsync.rejected, (state, error) => {
                // console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })
            // readNotesByCategoryAsync
            .addCase(readNotesByCategoryAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(readNotesByCategoryAsync.fulfilled, (state, { payload }) => {
                // console.log('fulfilled')
                state.notes = payload
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(readNotesByCategoryAsync.rejected, (state, error) => {
                // console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })
            // updateNoteAsync
            .addCase(updateNoteAsync.pending, (state) => {
                console.log('pending')
                state.status = 'loading'
            })
            .addCase(updateNoteAsync.fulfilled, (state, { payload }) => {
                console.log('fulfilled')
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(updateNoteAsync.rejected, (state, error) => {
                console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })
    },
})

export const {
    setCreateOrUpdate
} = notesSlice.actions

export const selectNotes = (state) => state.notes.notes
export const selectNoteStatus = (state) => state.notes.status
export const selectNoteAction = (state) => state.notes.action

export default notesSlice.reducer

