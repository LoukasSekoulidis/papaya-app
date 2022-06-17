import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
import notesReducer from './notes/notesSlice'

export const store = configureStore({
  reducer: {
    // user: userReducer
    notes: notesReducer
  },
})
