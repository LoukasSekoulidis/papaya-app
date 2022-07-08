const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('./UserModel');
const userModel = require('./UserModel');
const nodeMailer = require('../confirmation/ConfirmationMailer');

function getUsers(callback) {
    userModel.find((err, users) => {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, users);
        }
    });
};

function getUser(userID, callback) {
    userModel.findById(userID, (err, user) => {
        if (err) {
            return callback(err, null);
        }
        else if (!user) {
            return callback(`No User -- ${userName} -- in Database`, null);
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
            return callback('Duplicate Key Error: User with given userMail already exists!', null);
        }
        else if (err && err.name === 'ValidationError') {
            return callback('Validation Error: Required attribute Missing: ' + err, null);
        }
        else if (err) {
            return callback(err, null);
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
    userModel.findById(userID, function (err, user) {
        if (err) {
            return callback(err)
        }
        else if (!user) {
            return callback(`Problem finding User: User with given userMail -- ${userName} -- does not exist!`);
        }
        else {
            if (props.userMail !== undefined) {
                const token = jwt.sign({ userMail: props.userMail }, config.get('session.tokenKey'));
                props.confirmed = false;
                props.confirmationCode = token;

                Object.assign(user, props);

                nodeMailer.sendConfirmationMail(
                    user.userName,
                    props.userMail,
                    token
                )
            } else {
                Object.assign(user, props);
            }
            user.save((err) => {
                if (err) {
                    return callback('Problem saving User: ' + err, null);
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
            return callback('Error deleting User: No user in database with given userName: ' + userName);
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

