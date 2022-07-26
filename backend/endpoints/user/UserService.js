const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('./UserModel');
const userModel = require('./UserModel');
const nodeMailer = require('../confirmation/ConfirmationMailer');

function getUsers(callback) {
    userModel.find((err, users) => {
        if (err) {
            return callback('401', null);
        }
        else {
            return callback(null, users);
        }
    });
};

function getUser(userID, callback) {
    userModel.findById(userID, (err, user) => {
        if (err) {
            return callback('401', null);
        }
        else if (!user) {
            return callback('401', null);
        }
        else {
            return callback(null, user);
        }
    });
};

function createUser(props, callback) {
    const token = jwt.sign({ userMail: props.userMail }, config.get('session.tokenKey'));

    const newUser = new User({
        userMail: props.userMail,
        userName: props.userName,
        password: props.password,
        isAdministrator: props.isAdministrator,
        confirmationCode: token
    });
    newUser.save((err, user) => {
        if (err && err.code === 11000) {
            return callback('402', null);
        }
        else if (err && err.name === 'ValidationError') {
            return callback('403' + err, null);
        }
        else if (err) {
            return callback('404', null);
        }
        else {
            nodeMailer.sendConfirmationMail(
                user.userName,
                user.userMail,
                user.confirmationCode
            )
            return callback(null, user);
        }
    });
};

function updateUser(userID, props, callback) {
    body = props.body;
    header = props.headers;

    if (typeof header.authorization !== "undefined") {
        let token = header.authorization.split(" ")[1];
        tokenInfos = jwt.decode(token);
    }

    userModel.findById(userID, function (err, user) {
        if (err) {
            return callback('401')
        }
        else if (!user) {
            return callback('401');
        }
        else {
            if (tokenInfos.isAdministrator === false) {
                console.log('Not an Admin!')
                body.isAdministrator = user.isAdministrator
                body.confirmed = user.confirmed
            }
            if (body.userMail !== user.userMail) {
                console.log('userMail was changed')
                const token = jwt.sign({ userMail: body.userMail }, config.get('session.tokenKey'));
                body.confirmed = false;
                body.confirmationCode = token;

                console.log(body)
                Object.assign(user, body);

                nodeMailer.sendConfirmationMail(
                    user.userName,
                    body.userMail,
                    token
                )
            }
            else {
                console.log(body)
                Object.assign(user, body);
            }
            user.save((err) => {
                if (err) {
                    return callback('405', null);
                }
                else {
                    return callback(null, user);
                }
            })
        }
    });
}

function deleteUser(userID, callback) {
    userModel.findByIdAndDelete(userID, function (err, deletetUser) {
        if (err) {
            return callback(err);
        }
        else if (!deletetUser) {
            return callback('406');
        }
        else {
            return callback(null, userName);
        }
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};

