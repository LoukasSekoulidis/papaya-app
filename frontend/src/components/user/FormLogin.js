// React Functions
import { React, useState } from "react"
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../redux/user/userSlice'

// Components
import TemplateLogin from "./TemplateLogin"


export default function FormLogin() {

    const [error, setError] = useState()
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const mail = data.get('email')
        const password = data.get('password')

        dispatch(loginAsync({ mail, password }))

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