import { Buffer } from 'buffer'

// GLOBAL VARIABLES
const rootURL = process.env.REACT_APP_ROOT_URL
const API_URL = `${rootURL}/user`

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

    const url = `${rootURL}/login/`

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
            adminStatus: responseJSON.adminStatus,
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
    
    const url = `${rootURL}/confirmation/${id}`

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

export const updateAsAdmin = async (token, id, userName, userMail, userPassword, isAdministrator, confirmed) => {

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
            password: userPassword,
            isAdministrator: isAdministrator,
            confirmed: confirmed
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

export const deleteUser = async (token, id) => {

    const url = `${API_URL}/delete/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        withCredentials: true,
        headers: {
            'Authorization': token
        },
    })

    if (response.ok) {
        return ({
            ok: true,
        })
    } else {
        return ({
            ok: false,
            error: `${response.status}: ${response.statusText}`
        })
    }
}