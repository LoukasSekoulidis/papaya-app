// GLOBAL VARIABLES
import { asyncLocalStorage } from "../components/misc/asyncLocalStorage"
const LOCAL_STORAGE_KEY = 'papaya.token'

const API_URL = 'http://localhost:8080/api/v1/note'
const token = localStorage.getItem(LOCAL_STORAGE_KEY)


export const create = async (title, note, categoryID) => {
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

export const read = async () => {

    const asyncToken = await asyncLocalStorage.getItem(LOCAL_STORAGE_KEY)

    if (!asyncToken) {
        console.log('no token')
    }
    const url = `${API_URL}/myNotes`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': asyncToken
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

export const remove = async (id) => {
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

export const update = async (id, noteTitle, noteInput, categoryTitle) => {
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
            categoryID: categoryTitle
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

export const getNotesByCategory = async (categoryID) => {

    const api = 'http://localhost:8080/api/v1/category/getAll/'
    const asyncToken = await asyncLocalStorage.getItem(LOCAL_STORAGE_KEY)

    if (!asyncToken) {
        console.log('no token')
    }
    const url = `${api}${categoryID}`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': asyncToken
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