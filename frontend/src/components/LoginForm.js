// React Functions
import { React, useRef } from "react"
import  { useNavigate } from 'react-router-dom'

// Component
import FormTemplate from "./FormTemplate"

const userAPI = require('../api/user-api')

export default function LoginForm() {
    
    const navigate = useNavigate()
    const mailRef = useRef()
    const passwordRef = useRef()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const mail = mailRef.current.value
        const password = passwordRef.current.value

        const apiRequest = await userAPI.login(mail, password)
        
        if (apiRequest.response) {
            return navigate('/home')    
        } else {
            console.log(apiRequest.error)
        }

    }
  
    return (
        <div>
            <FormTemplate
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Login'}  
            />
        </div>
    )
}