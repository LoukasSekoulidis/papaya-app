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

    const json = await response.json()
    console.log(json)

    if (response.ok){
        // redirect to main page or whatever
    } else {
        // throw an error
    }
}

export const login = async (mail, password) => {

    const encodedData = encodeLoginData(mail, password)
    const authString = `Basic ${encodedData}`
    console.log(authString)

    const API_URL = 'http://localhost:8080/authenticate/login/'
    const response = await fetch(API_URL, {
        method: 'GET', 
        headers: {
            Authorization: authString,// didnt figure out yet
        },
    })

    const json = await response.json()
    console.log(json)

    if (response.ok) {
        //redirect cuz login was sucessful
    } else {
        // show error
    }
}

export const test = (mail, password) => {
    console.log(`Mail: ${mail}, Password: ${password}`)
}

