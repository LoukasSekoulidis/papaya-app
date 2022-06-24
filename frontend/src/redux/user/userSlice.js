import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userAPI = require('../../api/user-api')

const initialState = {
    user: null,
    error: null,
}

export const loginAsync = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        const response = await userAPI.login(userData.mail, userData.password)

        if(response.ok) {
            const token = response.token
            const userName = response.userName
    
            localStorage.setItem('papaya.token', token)
    
            return { token, userName }
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
            state.user = payload.userName
            state.error = null
            console.log(state.token)
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
    logout 
} = userSlice.actions

export const selectToken = (state) => state.user.token
export const selectError = (state) => state.user.error

export default userSlice.reducer;