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
    const API_URL = 'http://localhost:8080/login/'
    const response = await fetch(API_URL, {
        method: 'GET', 
        headers: {
            Authorization: 'aaaaaahhh',// didnt figure out yet
        },
        body: JSON.stringify({
            userMail: mail,
            password: password,
        })
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