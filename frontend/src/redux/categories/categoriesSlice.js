import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const categoryAPI = require('../../api/category-api')

const initialState = {
  categories: null,
  current: null,
  status: null,
  error: null,
  openCreateModal: false
}

export const readAllCategoriesAsync = createAsyncThunk(
  'categories/readAllCategoriesAsync',
  async (userData, { rejectWithValue }) => {
    const response = await categoryAPI.read()
    if (response.response) {
      console.log(response.categories)
      return response.categories
    } else {
      return rejectWithValue(response.error)
    }
  }
)

// export const readNotesByCategoryAsync = createAsyncThunk(
//   'notes/readNotesByCategoryAsync',
//   async (categoryId, { rejectWithValue }) => {
//     const response = await noteAPI.getNotesByCategory(categoryId)
//     if (response.response) {
//       return response.notes
//     } else {
//       return rejectWithValue(response.error)
//     }
//   }
// )


// export const createNoteAsync = createAsyncThunk(
//   'notes/createNoteAsync',
//   async ({ title, note, categoryID }, { rejectWithValue }) => {
//     const response = await noteAPI.create(title, note, categoryID)
//     if (response.response) {
//       return response.note
//     } else {
//       return rejectWithValue(response.error)
//     }
//   }
// )

// export const deleteNoteAsync = createAsyncThunk(
//   'notes/deleteNoteAsync',
//   async (id, { rejectWithValue }) => {
//     const response = await noteAPI.remove(id)
//     if (response.response) {
//       return response
//     } else {
//       return rejectWithValue(response.error)
//     }
//   }
// )

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    showCreateModal: (state) => {
      state.openCreateModal = true
    },
    closeCreateModal: (state) => {
      state.openCreateModal = false
    }
  },
  extraReducers: (builder) => {
    builder
      // readAllNotesAsync
      .addCase(readAllCategoriesAsync.pending, (state) => {
        // console.log('pending')
        state.status = 'loading'
      })
      .addCase(readAllCategoriesAsync.fulfilled, (state, { payload }) => {
        console.log(`fulfilled`)
        state.status = 'succeeded'
        state.categories = payload
        console.log(state.categories)
        state.error = null
      })
      .addCase(readAllCategoriesAsync.rejected, (state, error) => {
        console.log('rejected')
        state.status = 'failed'
        state.error = error.error.message
      })
    // // createNoteAsync
    // .addCase(createNoteAsync.pending, (state) => {
    //   state.status = 'loading'
    // })
    // .addCase(createNoteAsync.fulfilled, (state, { payload }) => {
    //   state.notes = [...state.notes, payload]
    //   state.status = 'succeeded'
    //   state.error = null
    // })
    // .addCase(createNoteAsync.rejected, (state, error) => {
    //   // console.log('rejected')
    //   state.status = 'failed'
    //   state.error = error.error.message
    // })
    // // deleteNoteAsync
    // .addCase(deleteNoteAsync.pending, (state) => {
    //   // console.log('pending')
    //   state.status = 'loading'
    // })
    // .addCase(deleteNoteAsync.fulfilled, (state, { payload }) => {
    //   // console.log('fulfilled')
    //   state.notes = [...state.notes]
    //   state.status = 'succeeded'
    //   state.error = null
    // })
    // .addCase(deleteNoteAsync.rejected, (state, error) => {
    //   // console.log('rejected')
    //   state.status = 'failed'
    //   state.error = error.error.message
    // })
  },
})

export const { showCreateModal, closeCreateModal } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories
export const selectCategoriesStatus = (state) => state.categories.status
export const selectOpenCreateModal = (state) => state.categories.openCreateModal

export default categoriesSlice.reducer

