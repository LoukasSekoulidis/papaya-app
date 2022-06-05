// React Functions
import { React, useState } from "react"
import  { useNavigate } from 'react-router-dom'

// Components
import SignUpTemplate from "./SignUpTemplate"

// API Call
const userAPI = require('../../api/user-api')

export default function SignUpForm() {
    
    const navigate = useNavigate()
    // const mailRef = useRef()
    // const passwordRef = useRef()
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        
        const userName = data.get('username')
        const mail = data.get('email')
        const password = data.get('password')

        // const mail = mailRef.current.value
        // const password = passwordRef.current.value

        // const userNameArray = mail.split('@')
        // const userName = userNameArray[0]

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

        // mailRef.current.value = null
        // passwordRef.current.value = null

    }

    return(
        <div>
            <SignUpTemplate
                handleSubmit={handleSubmit}
                // mailRef={mailRef}
                // passwordRef={passwordRef}
                // useCase={'Sign Up'}
                error={error}  
            />
        </div>
    )
}