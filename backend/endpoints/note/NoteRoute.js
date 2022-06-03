var express = require('express')
var router = express.Router()
var AuthenticationService = require('../authentication/AuthenticationService')
var NoteService = require('./NoteService')

// Notiz neu anlegen
router.post('/create', AuthenticationService.isAuthenticated, function (req, res) {
    // [key] des hier anzulegenden Objekts, wenn key vorhanden -> überschreiben, wenn nicht vorhanden -> erstellen
    // ownerID wird aus dem Token geholt
    NoteService.createNote(req, function (err, note) {
        if (err) {
            return res.status(400).json(err);
        }
        else if (note) {
            return res.status(201).json(note);
        }
    })
})

// Notiz löschen
router.delete('/delete/:noteID', AuthenticationService.isAuthenticated, function (req, res, next) {
    let urlID = req.url.split('/')[2];
    NoteService.deleteNote(urlID, function (err, note) {
        if (err) {
            return res.status(400).json(err);
        }
        else if (note) {
            return res.status(204).send();
        }
    })
})

// Notiz abändern
router.put('/update/:noteID', AuthenticationService.isAuthenticated, function (req, res, next) {
    let urlID = req.url.split('/')[2];
    NoteService.updateNote(urlID, req.body, function (err, note) {
        if (err) {
            return res.status(400).json(err);
        }
        else if (note) {
            return res.status(201).json(note);
        }
    })
})

// Notizen per ownerID selektieren / (die des eingeloggten Users)
router.get('/myNotes', AuthenticationService.isAuthenticated, function (req, res, next) {
    NoteService.getByOwnerID(req.headers, function (err, note) {
        if (err) {
            return res.status(404).json(err);
        }
        else if (note) {
            const { ownerID, noteTitle, noteInput } = req.query;
            if (ownerID) {
                note = note.filter(r => r.ownerID === ownerID)
            }
            if (noteTitle) {
                note = note.filter(r => r.noteTitle === noteTitle)
            }
            if (noteInput) {
                console.log('in get');
                note = note.filter(r => r.noteInput === noteInput)
            }
            return res.status(200).json(note);
        }
    })
})

// Notiz per ownerID selektieren / eine Spezifische
router.get('/myNotes/:noteID', AuthenticationService.isAuthenticated, function (req, res, next) {
    let urlID = req.url.split('/')[2];
    NoteService.getByNoteID(urlID, function (err, note) {
        if (err) {
            return res.status(404).json(err);
        }
        else if (note) {
            return res.status(200).json(note);
        }
    })
})

module.exports = router