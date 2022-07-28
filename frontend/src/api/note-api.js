// GLOBAL VARIABLES
const rootURL = process.env.REACT_APP_ROOT_URL
const API_URL = `${rootURL}/note`

export const create = async (token, title, note, categoryID) => {

    if (categoryID === '') {
        categoryID = null
    }

    const url = `${API_URL}/create`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            noteTitle: title,
            noteInput: note,
            categoryID: categoryID
        })
    })

    const responseJSON = await response.json()
    if (response.ok) {
        return ({
            response: true,
            error: null,
            note: responseJSON
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const read = async (token) => {

    const url = `${API_URL}/myNotes`
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
            notes: responseJSON
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

export const update = async (token, id, noteTitle, noteInput, categoryID) => {

    const url = `${API_URL}/update/${id}`

    if (categoryID === '') {
        categoryID = null
    }

    const response = await fetch(url, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'Authorization': token,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            noteTitle: noteTitle,
            noteInput: noteInput,
            categoryID: categoryID
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


export const getNote = async (token, id) => {

    const url = `${API_URL}/myNotes/${id}`
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
            note: responseJSON
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const getNotesByCategory = async (token, categoryID) => {

    const api = `${rootURL}/category/getAll/`

    const url = `${api}${categoryID}`
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
            notes: responseJSON
        })
    } else {
        return ({
            response: false,
            error: responseJSON.Error
        })
    }
}