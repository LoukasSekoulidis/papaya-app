// React Functions
// import  { Navigate } from 'react-router-dom'

// NPM imports
import { Buffer } from 'buffer'


const encodeLoginData = (userMail, password) => {
    let data = `${userMail}:${password}` // usermail:password
    let encodedData = Buffer.from(data, 'ascii').toString('base64')
    return encodedData
}

export const createUser = async (mail, userName, password) => {
    const API_URL = 'http://localhost:8080/userManagement/'
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userMail: mail,
            userName: userName,
            password: password,
        })
    })

    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            error: null
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const login = async (mail, password) => {

    const encodedData = encodeLoginData(mail, password)
    const authString = `Basic ${encodedData}`

    const API_URL = 'http://localhost:8080/authenticate/login/'
    const response = await fetch(API_URL, {
        method: 'GET', 
        headers: {
            Authorization: authString,
        },
    })

    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            error: null
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const test = (mail, password) => {
    console.log(`Mail: ${mail}, Password: ${password}`)
}