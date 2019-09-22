import {
  PRIORITY_TYPES
} from "./constants";

const shortid = require('shortid');


export default class Notepad {
  constructor(notes) {
    this._notes = notes;
  }
  get notes() {
    return this._notes
  }
  findNoteById(id) {
    for (let key of this.notes) {
      if (key.id === id) {
        return key;
      }
    }
  };

  addItem(input, texteria) {
  
        const newItem = {
          id: shortid.generate(),
          title: input,
          body: texteria,
          priority: PRIORITY_TYPES.LOW,
        };

        this._notes.push(newItem);
        return newItem
  };

  

  search(value) {
    const finall =  this._notes.filter(elem => elem.title.toLowerCase().includes(value.toLowerCase()) || elem.body.toLowerCase().includes(value.toLowerCase()));
    return finall
         }


  deleteNote(id) {

     return this._notes = this._notes.filter(item => item.id !== id);

  }

}