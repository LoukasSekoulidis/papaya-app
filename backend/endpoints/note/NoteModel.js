var mongoose = require('mongoose')
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;