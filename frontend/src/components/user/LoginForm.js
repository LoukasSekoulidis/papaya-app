// React Functions
import { React, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'

// Components
import FormTemplate from "./FormTemplate"

// CSS
const userAPI = require('../../api/user-api')


export default function LoginForm() {

    const [error, setError] = useState()

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
            // errorMessage = apiRequest.error
            // setErrorMessage({
            //     errorTitle: apiRequest.error,
            //     errorMessage: apiRequest.error
            // })
            // setShowError(true)
            // console.log(errorMessage)

            setError(apiRequest.error)
            // setShow(true)
        }

    }

    return (
        <div>
            {/* <AlertBox showIt={show} errorObject={error}/> */}
            {/* <Alert show={show} key={'danger'} variant={'danger'}>
                {error}
            </Alert> */}
            <FormTemplate
                handleSubmit={handleSubmit}
                mailRef={mailRef}
                passwordRef={passwordRef}
                useCase={'Login'}
                error={error}
            />
        </div>
    )
}