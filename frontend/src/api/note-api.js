const LOCAL_STORAGE_KEY = 'papaya.token'


export const create = async (title, note) => {
    const API_URL = 'http://localhost:8080/api/v1/note/create'
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTWFpbCI6InRlc3RAdGVzdC5kZSIsInVzZXJOYW1lIjoidGVzdCIsImlzQWRtaW5pc3RyYXRvciI6ZmFsc2UsImlhdCI6MTY1Mjk1MTQzMywiZXhwIjoxNjU0NjA0Njg0ODQxfQ.YgYgl-GWDbx5N1po_gh2vdJhtyErySDqj4hawskhdA8',
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
    const token = localStorage.getItem(LOCAL_STORAGE_KEY)
    const API_URL = 'http://localhost:8080/api/v1/note/myNotes'
    const response = await fetch(API_URL, {
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