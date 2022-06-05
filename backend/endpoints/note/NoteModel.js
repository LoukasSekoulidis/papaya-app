var mongoose = require('mongoose')
var dateGermany = new Date()
dateGermany.toISOString

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  id: Number,
  ownerID: { // = userID
    type: String,
    required: true
  },
  noteTitle: {
    type: String,
    // required: true -> optional
  },
  noteInput: {
    type: String,
    required: true
  },
  creationTime: {
    type: String,
    default: dateGermany
  },
  categoryID: {
    type: String,
  }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;