import { React, useRef } from "react"
import Form from "./Form"

const userAPI = require('../api/user-api')

export default function Login() {

    const mailRef = useRef()
    const passwordRef = useRef()
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const mail = mailRef.current.value
        const password = passwordRef.current.value

        // console.log(`Mail: ${mail}, Password: ${password}`)

        userAPI.login(mail, password)
    }
  
    return (
        <div>
            <Form
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Login'}  
            />
        </div>
    )
}




