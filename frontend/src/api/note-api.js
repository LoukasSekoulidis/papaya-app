// GLOBAL VARIABLES
const LOCAL_STORAGE_KEY = 'papaya.token'

const API_URL = 'http://localhost:8080/api/v1/note'
const token = localStorage.getItem(LOCAL_STORAGE_KEY)


export const create = async (title, note) => {
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

export const read = async () => {
    const url = `${API_URL}/myNotes`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': token
        },
    })
    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            error: null,
            notes: responseJSON
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const remove = async (id) => {
    const url = `${API_URL}/delete/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        withCredentials: true,
        headers: {
            'Authorization': token
        },
    })

    if (response.ok){
        return ({
            response: true,
        })
    } else {
        return({
            response: false,
            error: `${response.status}: ${response.statusText}`
        })
    }
}

export const update = async (id, noteTitle, noteInput) => {
    const url = `${API_URL}/update/${id}`
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
        })
    })
    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            updated: responseJSON
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }

}


export const getNote = async (id) => {
    const url = `${API_URL}/myNotes/${id}`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': token
        },
    })
    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            note: responseJSON
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}