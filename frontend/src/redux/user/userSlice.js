import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userAPI = require('../../api/user-api')

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    error: null,
}

export const loginAsync = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        const response = await userAPI.login(userData.userName, userData.password)
        if(response.Error) {
            return rejectWithValue(response.Error)
        } else {
            const token = response.headers.get('Authorization')
            return { token, userData }
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowLoginDialog: (state) => {
            state.showLoginDialog = true
        },
        setHideLoginDialog: (state) => {
            state.showLoginDialog = false
        },
        logout: (state) => {
            state.accessToken = null
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
            state.accessToken = payload.token
            state.showLoginDialog = false
            state.user = payload.userData.userName
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
    setShowLoginDialog, 
    setHideLoginDialog, 
    loginUser,
    logout 
} = userSlice.actions

export const selectShowLoginDialog = (state) => state.user.showLoginDialog
export const selectAccessToken = (state) => state.user.accessToken
export const selectError = (state) => state.user.error

export default userSlice.reducer;