// GLOBAL VARIABLES
const rootURL = process.env.REACT_APP_ROOT_URL
const API_URL = `${rootURL}/category`

export const read = async (token) => {

    const url = `${API_URL}`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': token
        },
    })

    const responseJSON = await response.json()

    if (response.ok) {
        return ({
            response: true,
            error: null,
            categories: responseJSON
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const getOne = async (token, id) => {

    const url = `${API_URL}/${id}`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': token
        },
    })

    const responseJSON = await response.json()

    if (response.ok) {
        return ({
            ok: true,
            error: null,
            category: responseJSON
        })
    } else {
        return ({
            ok: false,
            error: responseJSON.Error
        })
    }
}

export const create = async (token, title, color) => {

    const url = `${API_URL}/create`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            categoryTitle: title,
            color: color
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

export const update = async (token, id, title, color) => {

    const url = `${API_URL}/update/${id}`
    const response = await fetch(url, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'Authorization': token,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            categoryTitle: title,
            color: color,
        })
    })
    const responseJSON = await response.json()

    if (response.ok) {
        return ({
            response: true,
            updated: responseJSON
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const remove = async (token, id) => {
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
            response: true,
        })
    } else {
        return ({
            response: false,
            error: `${response.status}: ${response.statusText}`
        })
    }
}