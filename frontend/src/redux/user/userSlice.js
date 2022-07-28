import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userAPI = require('../../api/user-api')

const initialState = {
    user: null,
    error: null,
    apperance: 'light'
}

export const loginAsync = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        const response = await userAPI.login(userData.mail, userData.password)

        if(response.ok) {
            const token = response.token
            const userID = response.userID
            const adminStatus = response.adminStatus
    
            return { token, userID, adminStatus }
        } else {
            console.log('error')
            return rejectWithValue(response.error)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
        },
        setApperance: (state, payload) => {
            state.apperance = payload.payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginAsync.pending, (state) => {
            // console.log('pending')
            state.status = 'loading'
          })
          .addCase(loginAsync.fulfilled, (state, { payload }) => {
            // console.log(`fulfilled`)
            state.status = 'succeeded'
            state.token = payload.token
            state.showLoginDialog = false
            state.user = payload.userID
            state.adminStatus = payload.adminStatus
            state.error = null
          })
          .addCase(loginAsync.rejected, (state, error) => {
            // console.log('rejected')
            state.status = 'failed'
            state.error = error.payload
            console.log(state.error)
          })
    },
})

export const { 
    logout,
    setApperance 
} = userSlice.actions

export const selectToken = (state) => state.user.token
export const selectError = (state) => state.user.error
export const selectApperance = (state) => state.user.apperance
export const selectUserID = (state) => state.user.user
export const selectUserAdminStatus = (state) => state.user.adminStatus

export default userSlice.reducer;