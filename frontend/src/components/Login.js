import { React, useRef } from "react"
import Form from "./Form"

const userAPI = require('../api/user-api')

export default function Login() {

    const mailRef = useRef()
    const passwordRef = useRef()
    // const API_URL = 'http://localhost:8080/userManagement/login'

    // const login = async (mail, password) => {
    //     const response = await fetch(API_URL, {
    //         method: 'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userMail: mail,
    //             password: password,
    //         })
    //     })

    //     const json = await response.json()
    //     console.log(json)

    //     if (response.ok) {
    //         //redirect cuz login was sucessful
    //     } else {
    //         // show error
    //     }
    // }

    
    const handleSubmit = (e) => {
        e.preventDefault()

        const mail = mailRef.current.value
        const password = passwordRef.current.value

        // console.log(`Mail: ${mail}, Password: ${password}`)

        // login(mail, password)
        // userAPI.login(mail, password)
    }
  
    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <label>
                    mail:
                    <input type='email' ref={mailRef} placeholder='Enter Mail' required />
                </label>
                <label>
                    password:
                    <input type='password' ref={passwordRef} placeholder='Enter Password' required />
                </label>
            <input type='submit' name="Login"></input>
            </form> */}
            <Form
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Login'}  
            />
        </div>
    )
}




