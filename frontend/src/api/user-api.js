// React Functions

// NPM imports
import { Buffer } from 'buffer'

const LOCAL_STORAGE_KEY = 'papaya.token'

const API_URL = 'https://papaya-app.online/api/v1/user'

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
    const url = `${API_URL}/create`
    const response = await fetch(url, {
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

    if (response.ok) {
        return ({
            response: true,
            error: null
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const login = async (mail, password) => {
    const encodedData = encodeLoginData(mail, password)
    const authString = `Basic ${encodedData}`

    const url = 'https://papaya-app.online/api/v1/login/'
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: authString,
        },
    })

    saveToken(response)

    const responseJSON = await response.json()

    if (response.ok) {
        return ({
            ok: true,
            token: response.headers.get('Authorization'),
            userID: responseJSON.userID,
            error: null
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

export const verify = async (id) => {
    const url = `https://papaya-app.online/api/v1/confirmation/${id}`
    const response = await fetch(url, {
        method: 'GET',
    })

    const responseJSON = await response.json()

    if (response.ok) {
        return ({
            response: true,
            error: null,
            user: responseJSON.userName
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const getUser = async (id, token) => {

    // const url = `http://127.0.0.1:8080/api/v1/user/${id}`
    const url = `${API_URL}/${id}`


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })

    const json = await response.json()

    if (response.ok) {
        return ({
            ok: true,
            user: json
        })
    } else {
        return ({
            ok: false,
            error: json
        })
    }
}

export const getAllUser = async (token) => {

    const url = `${API_URL}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })

    const json = await response.json()

    if (response.ok) {
        return ({
            ok: true,
            users: json
        })
    } else {
        return ({
            ok: false,
            error: json
        })
    }
}


export const update = async (token, id, userName, userMail, userPassword) => {

    const url = `${API_URL}/update/${id}`

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


export const resetPassword = async (userMail) => {

    const url = `${API_URL}/resetPassword/${userMail}`

    // const url = `http://127.0.0.1:8080/api/v1/user/resetPassword/${userMail}`

    const response = await fetch(url, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'content-type': 'application/json',
        }
    })
    const responseJSON = await response.json()
    console.log(responseJSON)

    if (response.ok) {
        return ({
            ok: true,
            success: responseJSON.Success
        })
    } else {
        return ({
            ok: false,
            error: responseJSON.Error
        })
    }

}