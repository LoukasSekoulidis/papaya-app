import { React, useRef } from "react"
import Form from "./Form"

const userAPI = require('../api/user-api')

export default function Register() {
    
    const mailRef = useRef()
    const passwordRef = useRef()
    // const API_URL = 'http://localhost:8080/userManagement/'

    // const createUser = async (mail, userName, password) => {
    //     const response = await fetch(API_URL, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userMail: mail,
    //             userName: userName,
    //             password: password,
    //         })
    //     })

    //     const json = await response.json()
    //     console.log(json)

    //     if (response.ok){
    //         // redirect to main page or whatever
    //     } else {
    //         // throw an error
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        const mail = mailRef.current.value
        const password = passwordRef.current.value
        const userNameArray = mail.split('@')
        const userName = userNameArray[0]

        if(mail === '') return
        if(password === '') return

        console.log(`This is ${userName} with following mail: ${mail} and this password: ${password}`)

        // createUser(mail, userName, password)
        // userAPI.createUser(mail, userName, password)

        mailRef.current.value = null
        passwordRef.current.value = null

    }

    // lets to browser validation too, even tho monogodb fields are required in schema
    return(
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
            <input type='submit' name="Sign up"></input>
            </form> */}
            <Form
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Sign Up'}  
            />
        </div>
    )
}