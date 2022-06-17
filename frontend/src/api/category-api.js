import { asyncLocalStorage } from "../components/misc/asyncLocalStorage"
const LOCAL_STORAGE_KEY = 'papaya.token'

const API_URL = 'http://localhost:8080/api/v1/category'
const token = localStorage.getItem(LOCAL_STORAGE_KEY)

export const read = async () => {

    const asyncToken = await asyncLocalStorage.getItem(LOCAL_STORAGE_KEY)

    if(!asyncToken){
        console.log('no token')
    }
    const url = `${API_URL}`
    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': asyncToken
        },
    })
    const responseJSON = await response.json()

    if (response.ok){
        return ({
            response: true,
            error: null,
            categories: responseJSON
        })
    } else {
        return({
            response: false,
            error: responseJSON.Error
        })
    }
}

export const create = async (title) => {
    console.log(title)
    const url = `${API_URL}/create`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            categoryTitle: title
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

export const update = async (id, title, color) => {

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