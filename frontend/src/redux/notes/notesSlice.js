import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const noteAPI = require('../../api/note-api')

const initialState = {
    notes: null,
    status: null,
    error: null,
}

export const readAllNotesAsync = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        const response = await noteAPI.read()
        if(response.response) {
            return response.notes
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null
        }
    },
    extraReducers: (builder) => {
        builder
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
    },
})

export const {
    logout 
} = notesSlice.actions

export const selectNotes = (state) => state.notes.notes

export default notesSlice.reducer

