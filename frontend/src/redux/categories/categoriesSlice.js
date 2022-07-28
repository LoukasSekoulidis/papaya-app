import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const categoryAPI = require('../../api/category-api')

const initialState = {
    categories: null,
    currentID: null,
    currentName: null,
    status: null,
    error: null,
    openCreateModal: false
}

export const readAllCategoriesAsync = createAsyncThunk(
    'categories/readAllCategoriesAsync',
    async (userData, { rejectWithValue, getState }) => {
        const token = getState().user.token
        const response = await categoryAPI.read(token)
        if (response.response) {
            return response.categories
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const createCategoryAsync = createAsyncThunk(
    'categories/createCategoryAsync',
    async ({ category, color }, { rejectWithValue, getState }) => {
        const token = getState().user.token
        
        // console.log('inside async ' + category + '  ' + color)
        const response = await categoryAPI.create(token, category, color)
        if (response.error) {
            return rejectWithValue(response.error)
        }
        return
    }
)

export const updateCategoryAsync = createAsyncThunk(
    'categories/updateCategoryAsync',
    async (update, { rejectWithValue, getState }) => {
        const token = getState().user.token
        const response = await categoryAPI.update(token, update.id, update.title, update.color)
        if (response.response) {
            return response.updated
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const deleteCategoryAsync = createAsyncThunk(
    'categories/deleteCategoryAsync',
    async (id, { rejectWithValue, getState }) => {
        const token = getState().user.token
        const response = await categoryAPI.remove(token, id)
        if (response.response) {
            return response
        } else {
            return rejectWithValue(response.error)
        }
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        showCreateModal: (state) => {
            state.openCreateModal = true
        },
        closeCreateModal: (state) => {
            state.openCreateModal = false
        },
        setCurrentCategoryID: (state, payload) => {
            state.currentID = payload.payload
        },
        setCurrentCategoryName: (state, payload) => {
            state.currentName = payload.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // readAllCategoriesAsync
            .addCase(readAllCategoriesAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(readAllCategoriesAsync.fulfilled, (state, { payload }) => {
                // console.log(`fulfilled`)
                state.status = 'succeeded'
                state.categories = payload
                state.error = null
            })
            .addCase(readAllCategoriesAsync.rejected, (state, error) => {
                console.log('read cat - rejected')
                state.status = 'failed'
                state.error = error.error.message
            })

            // createNoteAsync
            .addCase(createCategoryAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(createCategoryAsync.fulfilled, (state, { payload }) => {
                // console.log('succeeded')
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(createCategoryAsync.rejected, (state, error) => {
                console.log('create cat - rejected')
                state.status = 'failed'
                state.error = error.error.message
            })

            // updateCategoryAsync
            .addCase(updateCategoryAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(updateCategoryAsync.fulfilled, (state, { payload }) => {
                // console.log('succeded')
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(updateCategoryAsync.rejected, (state, error) => {
                // console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })

            // deleteCategoryAsync
            .addCase(deleteCategoryAsync.pending, (state) => {
                // console.log('pending')
                state.status = 'loading'
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, { payload }) => {
                // console.log('fulfilled')
                state.status = 'succeeded'
                state.error = null
            })
            .addCase(deleteCategoryAsync.rejected, (state, error) => {
                // console.log('rejected')
                state.status = 'failed'
                state.error = error.error.message
            })
    },
})

export const { showCreateModal, closeCreateModal, setCurrentCategoryID, setCurrentCategoryName } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories
export const selectCategoriesStatus = (state) => state.categories.status
export const selectOpenCreateModal = (state) => state.categories.openCreateModal
export const selectCurrentCategoryID = (state) => state.categories.currentID
export const selectCurrentCategoryName = (state) => state.categories.currentName

export default categoriesSlice.reducer

