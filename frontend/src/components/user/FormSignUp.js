// React Functions
import { React, useState } from "react"
import  { useNavigate } from 'react-router-dom'

// Components
import TemplateSignUp from "./TemplateSignUp"

// API Call
const userAPI = require('../../api/user-api')

export default function FormSignUp() {
    
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        
        const userName = data.get('username')
        const mail = data.get('email')
        const password = data.get('password')

        if(mail === '') return
        if(password === '') return

        const apiRequest = await userAPI.createUser(mail, userName, password)

        if (apiRequest.response) {
            return navigate('/')    
        } else {
            setError(apiRequest.error)
        }

        data.set('username', "")
        data.set('email', "")
        data.set('password', "")


    }

    return(
        <div>
            <TemplateSignUp
                handleSubmit={handleSubmit}
                error={error}  
            />
        </div>
    )
}