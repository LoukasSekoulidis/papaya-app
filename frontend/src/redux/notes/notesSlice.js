import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const noteAPI = require('../../api/note-api')

const initialState = {
    notes: null,
    status: null,
    error: null,
}

export const readAllNotesAsync = createAsyncThunk(
    'notes/readAllNotesAsync',
    async (userData, { rejectWithValue }) => {
        const response = await noteAPI.read()
        if (response.response) {
            return response.notes
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const readNotesByCategoryAsync = createAsyncThunk(
    'notes/readNotesByCategoryAsync',
    async (categoryId, { rejectWithValue }) => {
        const response = await noteAPI.getNotesByCategory(categoryId)
        if (response.response) {
            return response.notes
        } else {
            return rejectWithValue(response.error)
        }
    }
)


export const createNoteAsync = createAsyncThunk(
    'notes/createNoteAsync',
    async ({ title, note, categoryID }, { rejectWithValue }) => {
        const response = await noteAPI.create(title, note, categoryID)
        if (response.response) {
            return response.note
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const deleteNoteAsync = createAsyncThunk(
    'notes/deleteNoteAsync',
    async (id, { rejectWithValue }) => {
        const response = await noteAPI.remove(id)
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
    },
})

// export const {
// } = notesSlice.actions

export const selectNotes = (state) => state.notes.notes
export const selectNoteStatus = (state) => state.notes.status

export default notesSlice.reducer

