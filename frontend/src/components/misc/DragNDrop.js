const noteAPI = require('../../api/note-api')

let target = ''
let dragged = ''

export const DragNDrop = {
    handleDrag: function (e, noteID) {
        e.preventDefault();
        dragged = noteID;
    },
    handleOver: function (e, categoryID) {
        e.preventDefault();
        target = categoryID;
    },
    handleDrop: async function (e, noteTitle, noteInput) {
        console.log('Note Dropped: ' + target + ' --- ' + dragged)
        e.preventDefault();
        console.log('ID: ' + dragged + '\n title: ' + noteTitle + '\ninput: ' + noteInput + '\ncategoryTitle: ' + target)
        const apiRequest = await noteAPI.update(dragged, noteTitle, noteInput, target)
        console.log(apiRequest)
    }
}