const config = require('config');
var jwt = require("jsonwebtoken");

const userModel = require('../user/UserModel')

function verifyUser(confirmationCode, callback) {
    userModel.findOne({ confirmationCode: confirmationCode }, (err, user) => {
        if (user) {
            user.confirmed = true
            user.save((err) => {
                if (err) {
                    callback('Could not save user after confirming eMail');
                }
                else {
                    var filteredUser = { userName: user.userName };
                    callback(null, filteredUser)
                }
            })
        }
        else {
            callback('Could not find user with confirmationCode: ' + confirmationCode);
        }
    })
}

function isVerified(req, res, next) {
    console.log('Check if verified')
    console.log(req.headers.authorization)
    if (req.headers.authorization === undefined) {
        return res.status(400).json({ Error: '101' });
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

    console.log(credentials);
    const [usermail, password] = credentials.split(':')
    console.log(usermail)
    if (usermail !== null) {
        userModel.findOne({ userMail: usermail }, (err, user) => {
            if (err) {
                res.status(404).json({ Error: '102' })
                return;
            }
            else {
                if (user.confirmed == true) {
                    return next();
                }
                else {
                    res.status(400).json({ Error: '103' });
                }
            }
        })
    } else {
        res.status(400).json({ Error: '101' })
    }
}

module.exports = {
    verifyUser,
    isVerified,
}