import { Route, Routes } from "react-router-dom"

// Routes
import SignUpPage from './routes/SignUpPage'
import NotFoundPage from './routes/NotFoundPage'
import VerifyPage from './routes/VerifyPage'
import LandingPage from './routes/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import UserPreferences from './routes/UserPreferencesPage'
import UserManagment from './routes/UserManagmentPage'
import TestPage from "./routes/TestPage"
import ResetPassword from "./routes/ResetPasswordPage"

import { useSelector } from 'react-redux'
import { selectToken } from './redux/user/userSlice'

// import ProtectedRoute from './routes/ProtectedRoute'

// const LOCAL_STORAGE_KEY = 'papaya.token'


const App = () => {

    const tokenStore = useSelector(selectToken)
    // const tokenLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY)

    // if(tokenStore || tokenLocalStorage) {
    if (tokenStore) {
        return (
            <Routes>
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/' element={<Dashboard />} />
                <Route path='/test' element={<TestPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/landing' element={<LandingPage />} />
                <Route path='/verify/:id' element={<VerifyPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/:id' element={<Dashboard />} />
                <Route path='/userPreferences' element={<UserPreferences />} />
                <Route path='/control' element={<UserManagment />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
            </Routes>
        )
    }
    else {
        return (
            <Routes>
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/test' element={<TestPage />} />
                <Route path='/' element={<LandingPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/landing' element={<LandingPage />} />
                <Route path='/verify/:id' element={<VerifyPage />} />
                <Route path='/dashboard' element={<LandingPage />} />
                <Route path='/resetPassword' element={<ResetPassword />} />
            </Routes>
        )

    }
}


export default App