// React Functions
import { React, useState } from "react"
import  { useNavigate } from 'react-router-dom'

// Components
import TemplateLogin from "./TemplateLogin"

// CSS
const userAPI = require('../../api/user-api')


export default function FormLogin() {

    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const mail = data.get('email')
        const password = data.get('password')

        const apiRequest = await userAPI.login(mail, password)

        
        if (apiRequest.response) {
            return navigate('/dashboard')    
        } else {
            console.log(apiRequest.error)
            setError(apiRequest.error)
        }
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