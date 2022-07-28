// React Functions
import { React, useState } from "react"

import { useDispatch, useSelector } from 'react-redux'

import { loginAsync, selectError } from '../../redux/user/userSlice'

import { ErrorHandler } from '../misc/ErrorHandler'

// Components
import TemplateLogin from "./TemplateLogin"


export default function FormLogin() {

    const dispatch = useDispatch()

    let error = useSelector(selectError)
    console.log(error)

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
                error={ErrorHandler(error)}
            />
        </div>
    )
}