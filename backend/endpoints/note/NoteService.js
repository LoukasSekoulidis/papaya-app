const Note = require('./NoteModel')

function createNote(note, callback) {
    let newNote = new Note(note)
    console.log(newNote)
    newNote.save(function (err, note) {
        if (err) {
            callback(err, null)
        } else {
            console.log('New note created!')
            callback(null, note)
        }
    })
}

function getNote(callback) {
    Note.find(function(err, notes)
    {
        if(err)
        {
            console.log('Fehler bei Suche nach Notiz.' + err)
            return callback(err, null)
        }
        else {
            console.log('Notiz gefunden.')
            return callback(null, notes)
        }
    })
}

function getByOwnerID(ownerID, callback) {
    Note.find( { ownerID : ownerID }, function(err, note)
    {
        if(err)
        {
            console.log('Notis mit OwnerID nicht gefunden.' + err)
            return callback(err, null) 
        }
        else {
            console.log('Notiz mit OwnerID gefunden.' + note)
            return callback(null, note)
        }
    })
}

function getByNoteID(note, callback) {
    Note.findOne( { _id: note._id }, function(err, note)
    {
        if(err || note === null)
        {
            console.log('Notiz mit NotizID nicht gefunden.' + err)
            return callback(err, null) 
        }
        else {
            console.log('Notiz mit NotizID gefunden.')
            return callback(null, notiz)
        }
    })
}

function updateNote(note, callback) {
    let updateInfo = {} 
    if(note.noteTitle) {
        updateInfo['noteTitle'] = note.noteTitle
    }
    if(note.noteInput) {
        updateInfo['noteInput'] = note.noteInput
    }
    Note.updateOne( { _id: note._id }, updateInfo, function(err, note)
    {
        if(err)
        {
            console.log('Notiz nicht aktualisiert.' + err)
            return callback(err, null) 
        }
        else {
            console.log('Notiz aktualisiert.')
            return callback(null, note)
        }
    })
}

function deleteNote(note, callback) {
    Note.deleteOne( { _id: note._id }, function(err, note)
    {
        if(err)
        {
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
