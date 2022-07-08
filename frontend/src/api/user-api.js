// React Functions

// NPM imports
import { Buffer } from 'buffer'

const LOCAL_STORAGE_KEY = 'papaya.token'

const encodeLoginData = (userMail, password) => {
    let data = `${userMail}:${password}` // usermail:password
    let encodedData = Buffer.from(data, 'ascii').toString('base64')
    return encodedData
}

const saveToken = async (response) => {
    const token = response.headers.get('Authorization');
    localStorage.setItem(LOCAL_STORAGE_KEY, token)
}

export const createUser = async (mail, userName, password) => {
    const API_URL = 'http://localhost:8080/api/v1/user/create'
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

    const API_URL = 'http://localhost:8080/api/v1/login/'
    const response = await fetch(API_URL, {
        method: 'GET', 
        headers: {
            Authorization: authString,
        },
    })

    saveToken(response)

    const responseJSON = await response.json()

    if (response.ok){
        return ({
            ok: true,
            token: response.headers.get('Authorization'),
            userName: responseJSON.userName,
            error: null
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

export const verify = async (id) => {
    const API_URL = `http://localhost:8080/api/v1/confirmation/${id}`
    const response = await fetch(API_URL, {
        method: 'GET',
    })

    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            error: null,
            user: responseJSON.userName
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const getUser = async (userName, token) => {

    const url = `http://localhost:8080/api/v1/user/${userName}`

    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            Authorization: token,
        },
    })

    const json = await response.json()

    if(response.ok){
        return ({
            ok: true,
            user: json
        })
    } else {
        return({
            ok: false,
            error: json
        })
    }
}

export const update = async (token, userName, userMail, userPassword) => {
    const url = `http://localhost:8080/api/v1/user/update/${userName}`

    const response = await fetch(url, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'Authorization': token,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            userMail: userMail,
            password: userPassword
        })
    })
    const responseJSON = await response.json()

    if (response.ok) {
        return ({
            ok: true,
            updated: responseJSON
        })
    } else {
        return ({
            ok: false,
            error: responseJSON.Error
        })
    }

}