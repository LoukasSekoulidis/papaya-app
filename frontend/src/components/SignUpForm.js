// React Functions
import { React, useRef } from "react"
import  { useNavigate } from 'react-router-dom'

// Components
import FormTemplate from "./FormTemplate"

// API Call
const userAPI = require('../api/user-api')

export default function SignUpForm() {
    
    const navigate = useNavigate()
    const mailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const mail = mailRef.current.value
        const password = passwordRef.current.value

        const userNameArray = mail.split('@')
        const userName = userNameArray[0]

        if(mail === '') return
        if(password === '') return

        // console.log(`This is ${userName} with following mail: ${mail} and this password: ${password}`)

        // userAPI.createUser(mail, userName, password)
        const apiRequest = await userAPI.createUser(mail, userName, password)

        if (apiRequest.response) {
            return navigate('/')    
        } else {
            console.log(apiRequest.error)
        }

        mailRef.current.value = null
        passwordRef.current.value = null

    }

    // lets to browser validation too, even tho monogodb fields are required in schema
    return(
        <div>
            <FormTemplate
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Sign Up'}  
            />
        </div>
    )
}