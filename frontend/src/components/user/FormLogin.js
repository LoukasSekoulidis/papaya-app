// React Functions
import { React, useState } from "react"
import  { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { setHideLoginDialog, selectShowLoginDialog, loginAsync, selectAccessToken, selectError } from '../../redux/user/userSlice'



// Components
import TemplateLogin from "./TemplateLogin"

// CSS
const userAPI = require('../../api/user-api')
const userSlice = require('../../redux/user/userSlice')


export default function FormLogin() {

    const [error, setError] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const mail = data.get('email')
        const password = data.get('password')

        dispatch(loginAsync({ mail, password }))

        // window.location.reload(false)


        // const apiRequest = await userAPI.login(mail, password)
        
        // if (apiRequest.response) {
        //     return navigate('/dashboard')    
        // } else {
        //     console.log(apiRequest.error)
        //     setError(apiRequest.error)
        // }
    }
  
    return (
        <div>
            <TemplateLogin
                handleSubmit={handleSubmit}
                error={error}  
            />
        </div>
    )
}