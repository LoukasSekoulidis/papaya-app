import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
import notesReducer from './notes/notesSlice'
import categoriesReducer from './categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    // user: userReducer
    notes: notesReducer,
    categories: categoriesReducer
  },
})
