var mongoose = require('mongoose')
const config = require('config')

let _db
const connectionString = config.get('db.connectionString')

function initDB(callback) {
    if (_db) {
        if (callback) {
            return callback(null, _db)
        }
        else {
            return _db
        }
    }
    else {
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }) //useCreateIndex: true, useFindAndModify: false, 
        _db = mongoose.connection

        _db.on('error', console.error.bind(console, 'connection error:'))
        _db.once('open', function () {
            console.log('Connected to database ' + connectionString)
        })
    }
}

function getDB() {
    return _db;
}

module.exports = {
    initDB,
    getDB
}