export const ErrorHandler = (code) => {
    console.log(code)
    switch (code) {
        case 101:
            return 'Session expired or lost, login again!'
        case 102:
            return 'User does not exist!'
        case '103':
            return 'Please verify your eMail first'
        case '104':
            return 'Wrong Username or Password'
        case 105:
            return 'Not authenticated, login again or contact an admin'
        case null:
            return ''
        case 302:
            return 'Problem creating note'
        default:
            console.log(code)
            return 'An unknown error ocurred!'
    }
}