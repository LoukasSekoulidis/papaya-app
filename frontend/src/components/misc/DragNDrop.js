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
    handleDrop: async function (e, token, noteTitle, noteInput) {
        e.preventDefault();
        if (target !== '' && dragged !== '') {
            const apiRequest = await noteAPI.update(token, dragged, noteTitle, noteInput, target)
        }
        target = ''
        dragged = ''
    }
}