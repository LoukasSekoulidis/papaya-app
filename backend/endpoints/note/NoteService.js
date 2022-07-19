const Note = require('./NoteModel')
const Category = require('../category/CategoryModel')
const jwt = require("jsonwebtoken");

function createNote(props, callback) {
    body = props.body;
    header = props.headers;
    if (typeof header.authorization !== "undefined") {
        let token = header.authorization.split(" ")[1];
        tokenInfos = jwt.decode(token);
    }
    else {
        return callback('301', null);
    }

    if (body.categoryID != undefined) {
        // please check if the user who wants to add note to category owns the category
        Category.findOne({ _id: body.categoryID }, function (err, result) {
            console.log(result)
            if (result == null) {
                return callback(null);
            }
            else {
                const newNote = new Note({
                    noteTitle: body.noteTitle,
                    noteInput: body.noteInput,
                    ownerID: tokenInfos.userMail,
                    categoryID: body.categoryID
                });
                newNote.save(function (err, note) {
                    if (err) {
                        callback('302', null)
                    } else {
                        console.log('New note created!')
                        callback(null, note)
                    }
                })
            }
        })
    } else {
        const newNote = new Note({
            noteTitle: body.noteTitle,
            noteInput: body.noteInput,
            ownerID: tokenInfos.userMail,
        });
        newNote.save(function (err, note) {
            if (err) {
                callback('302', null)
            } else {
                console.log('New note created!')
                callback(null, note)
            }
        })
    }
}

function getNote(callback) {
    Note.find(function (err, notes) {
        if (err) {
            console.log('Fehler bei Suche nach Notiz.' + err)
            return callback('303', null)
        }
        else {
            console.log('Notiz gefunden.')
            return callback(null, notes)
        }
    })
}

function getByOwnerID(header, callback) {
    if (typeof header.authorization !== "undefined") {
        let token = header.authorization.split(" ")[1];
        tokenInfos = jwt.decode(token);
    }
    else {
        return callback('301', null);
    }
    Note.find({ ownerID: tokenInfos.userMail }, function (err, note) {
        if (err) {
            return callback('304', null)
        }
        else {
            return callback(null, note)
        }
    })
}

function getByNoteID(noteID, callback) {
    Note.findById(noteID, function (err, note) {
        if (err || note === null) {
            return callback('305', null)
        }
        else {
            return callback(null, note)
        }
    })
}

function updateNote(noteID, props, callback) {
    console.log('updateNote')
    Note.findById(noteID, function (err, note) {
        if (err) {
            return callback('305')
        }
        else if (!note) {
            return callback('305');
        }
        else {
            if (props.categoryID != undefined) {
                Category.findOne({ _id: props.categoryID }, function (err, result) {
                    console.log(props)
                    if (!result) {
                        return callback("306")
                    } else {
                        Object.assign(note, props);
                        note.save((err) => {
                            if (err) {
                                return callback('307', null);
                            }
                            else {
                                return callback(null, note);
                            }
                        })
                    }
                })
            } else {
                Object.assign(note, props);
                note.save((err) => {
                    if (err) {
                        return callback('307', null);
                    }
                    else {
                        return callback(null, note);
                    }
                })
            }
        }
    })
}

function deleteNote(noteID, callback) {
    Note.findByIdAndDelete(noteID, function (err, note) {
        if (err) {
            return callback('308', null)
        }
        else {
            return callback(null, note)
        }
    })
}

module.exports = {
    createNote,
    getNote,
    getByOwnerID,
    getByNoteID,
    updateNote,
    deleteNote,
}