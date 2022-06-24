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
        return callback('No token received, need ownerID', null);
    }

    if (body.categoryID != undefined) {
        console.log("in Test")

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
                        callback(err, null)
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
                callback(err, null)
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
            return callback(err, null)
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
        return callback('No token received, need ownerID', null);
    }
    Note.find({ ownerID: tokenInfos.userMail }, function (err, note) {
        if (err) {
            console.log('Notiz mit OwnerID nicht gefunden.' + err)
            return callback(err, null)
        }
        else {
            console.log('Notiz mit OwnerID gefunden.' + note)
            return callback(null, note)
        }
    })
}

function getByNoteID(noteID, callback) {
    Note.findById(noteID, function (err, note) {
        if (err || note === null) {
            console.log('Notiz mit NotizID nicht gefunden.' + err)
            return callback(err, null)
        }
        else {
            console.log('Notiz mit NotizID gefunden: ' + note)
            return callback(null, note)
        }
    })
}

function updateNote(noteID, props, callback) {
    console.log('updateNote')
    Note.findById(noteID, function (err, note) {
        if (err) {
            return callback(err)
        }
        else if (!note) {
            return callback(`Note with noteID: ${noteID}, does not exist!`);
        }
        else {
            if (props.categoryID != undefined) {
                Category.findOne({ _id: props.categoryID }, function (err, result) {
                    console.log(props)
                    if (!result) {
                        return callback("Category does not exist")
                    } else {
                        Object.assign(note, props);
                        note.save((err) => {
                            if (err) {
                                return callback(err, null);
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
                        return callback(err, null);
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
            console.log('Notiz nicht gelöscht.' + err)
            return callback(err, null)
        }
        else {
            console.log('Notiz gelöscht.')
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