const express = require('express');
const router = express.Router();

const userService = require('./UserService')
const authenticationService = require('../authentication/AuthenticationService')

router.get('/', authenticationService.isAuthenticated, authenticationService.isAdministrator, (req, res, next) => {
    userService.getUsers((err, users) => {
        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ Error: err });
        }
    });
});

router.get('/:userID', authenticationService.isAuthenticated, (req, res, next) => {

    userService.getUser(req.url.split('/')[1], (err, user) => {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ Error: err });
        }
    });
});

router.post('/create', (req, res, next) => {
    console.log('In Post!')
    userService.createUser(req.body, (err, postedUser) => {
        if (postedUser) {
            res.status(201).json(postedUser);
        }
        else {
            res.status(404).json({ Error: err });
        }
    });
});

router.put('/update/:userID', authenticationService.isAuthenticated, (req, res, next) => {
    userService.updateUser(req.url.split('/')[2], req, (err, updatedUser) => {
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ Error: err });
        }
    });
});

router.put('/resetPassword/:userMail', (req, res, next) => {
    userService.resetPassword(req.url.split('/')[2], (err, user) => {
        if (user) {
            res.status(200).json({ Succes: 'New Password set!' });
        }
        else {
            res.status(404).json({ Error: err });
        }
    })
})

router.delete('/delete/:userID', authenticationService.isAuthenticated, (req, res, next) => {
    userService.deleteUser(req.url.split('/')[2], (err, deletedUser) => {
        if (deletedUser) {
            res.status(200).json({ Deleted: deletedUser });
        }
        else {
            res.status(404).json({ Error: err });
        }
    });
});

module.exports = router;