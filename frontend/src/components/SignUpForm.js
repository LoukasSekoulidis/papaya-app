// React Functions
import { React, useRef } from "react"
import Form from "./Form"

// API Call
const userAPI = require('../api/user-api')

export default function SignUpForm() {
    
    const mailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const mail = mailRef.current.value
        const password = passwordRef.current.value

        const userNameArray = mail.split('@')
        const userName = userNameArray[0]

        if(mail === '') return
        if(password === '') return

        // console.log(`This is ${userName} with following mail: ${mail} and this password: ${password}`)

        userAPI.createUser(mail, userName, password)

        mailRef.current.value = null
        passwordRef.current.value = null

    }

    // lets to browser validation too, even tho monogodb fields are required in schema
    return(
        <div>
            <Form
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Sign Up'}  
            />
        </div>
    )
}