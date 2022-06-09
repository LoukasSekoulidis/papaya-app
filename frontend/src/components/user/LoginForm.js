// React Functions
import { React, useState } from "react"
import  { useNavigate } from 'react-router-dom'

// Components
import SignInTemplate from "./SignInTemplate"
// import AlertBox from './AlertBox'

// CSS
// import { Alert } from 'react-bootstrap'
const userAPI = require('../../api/user-api')


export default function LoginForm() {

    // const [showError, setShowError] = useState(false)
    // const [errorMessage, setErrorMessage] = useState({
    //     errorTitle: 'Title',
    //     errorMessage: 'Message'
    // })
    // const [show, setShow] = useState(false)
    const [error, setError] = useState()
    
    const navigate = useNavigate()
    // const mailRef = useRef()
    // const passwordRef = useRef()
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const mail = mailRef.current.value
    //     const password = passwordRef.current.value

    //     const apiRequest = await userAPI.login(mail, password)
        
    //     if (apiRequest.response) {
    //         return navigate('/home')    
    //     } else {
    //         // errorMessage = apiRequest.error
    //         // setErrorMessage({
    //         //     errorTitle: apiRequest.error,
    //         //     errorMessage: apiRequest.error
    //         // })
    //         // setShowError(true)
    //         // console.log(errorMessage)

    //         setError(apiRequest.error)
    //         // setShow(true)
    //     }

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const mail = data.get('email')
        const password = data.get('password')

        const apiRequest = await userAPI.login(mail, password)

        console.log('after request')
        
        if (apiRequest.response) {
            return navigate('/dashboard')    
        } else {
            // errorMessage = apiRequest.error
            // setErrorMessage({
            //     errorTitle: apiRequest.error,
            //     errorMessage: apiRequest.error
            // })
            // setShowError(true)
            console.log(apiRequest.error)

            setError(apiRequest.error)
        }
    }
  
    return (
        <div>
            {/* <AlertBox showIt={show} errorObject={error}/> */}
            {/* <Alert show={show} key={'danger'} variant={'danger'}>
                {error}
            </Alert> */}
            <SignInTemplate
                handleSubmit={handleSubmit}
                // mailRef={mailRef}
                // passwordRef={passwordRef}
                // useCase={'Login'}
                error={error}  
            />
        </div>
    )
}