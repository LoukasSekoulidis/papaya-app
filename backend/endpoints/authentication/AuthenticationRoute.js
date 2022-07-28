const express = require('express');
const router = express.Router();

var authenticationService = require('./AuthenticationService')
var confirmationService = require('../confirmation/ConfirmationService')

router.get('/', confirmationService.isVerified, (req, res, next) => {
    if (typeof req.headers.authorization != "undefined") {

        authenticationService.createSessionTokenBasic(req.headers, (err, token, user) => {
            if (token) {
                res.header("Authorization", "Bearer " + token);

                if (user) {
                    res.status(200).json({ userID: user._id, adminStatus: user.isAdministrator });
                }
                else {
                    res.status(400).json({ Error: err });
                }
            }
            else {
                res.status(401).json({ Error: err });
            }
        });
    }
    else {
        res.status(400).json({ Error: '101' })
    }
})

module.exports = router;