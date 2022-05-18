var express = require('express')
var router = express.Router()
// var AuthenticationService = require('..authentication/AuthenticationService')
var AuthenticationService = require('../authentication/AuthenticationService')
var NoteService = require('./NoteService')

// Notiz neu anlegen
router.post('/', AuthenticationService.isAuthenticated, function(req, res){
    // [key] des hier anzulegenden Objekts, wenn key vorhanden -> überschreiben, wenn nicht vorhanden -> erstellen
    req.body['ownerID'] = req.userID
    NoteService.createNote(req.body, function (err, note) {
        if (err) {
            console.log("Error at createNote")
            return res.json({ msg: err.message, successful: false })
        }
        else if (note) {
            return res.json({
                msg: "The note has been saved.",
                successful: true,
                note: note
            }) 
        }   
    })
})

// Notiz löschen
router.delete('/', AuthenticationService.isAuthenticated, function(req, res, next){
    NoteService.deleteNote(req.body, function (err, note) {
        if (err) {
            console.log("Error at deleteNote")
            return res.json({ msg: err.message, successful: false })
        }
        else if (note) {
            return res.json({ msg: "The note has been deleted.", successful: true })
        }   
    })
})

// Notiz abändern
router.put('/', AuthenticationService.isAuthenticated, function(req, res, next){
    NoteService.updateNote(req.body, function (err, nte) {
        if (err) {
            console.log("Error at updateNote")
            return res.json({ msg: err.message, successful: false })
        }
        else if (note) {
            return res.json({
                msg: "The note has been updated.",
                successful: true,
                note: note
            })
        }   
    })
})
      
// Notiz per ownerID selektieren / (die des eingeloggten Users)
router.get('/getByOwnerID', AuthenticationService.isAuthenticated, function(req, res, next) {
    NoteService.getByOwnerID(req.userID, function(err, note) {
        if (err) {
            console.log("Error at getByOwnerID")
            return res.json({ msg: err.message, successful: false })
        }
        else if (note.length > 0) {
            return res.send(Object.values(note))
        } else {
            return res.send(Object.values(note))
        }
    })
})

// Notiz per ownerID selektieren (die des im JSON Body mitgegebenen Users)
router.post('/getByOwnerID', AuthenticationService.isAuthenticated, function(req, res, next) {
    NoteService.getByOwnerID(req.body.ownerID, function(err, note) {
        if (err) {
            console.log("Error at getByOwnerID")
            return res.json({ msg: err.message, successful: false })
        }
        else if (note.length > 0) {
            return res.send(Object.values(note))
        } else {
            return res.send(Object.values(note))
        }
    })
})

module.exports = router


