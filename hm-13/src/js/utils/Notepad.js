import {
  PRIORITY_TYPES
} from "./constants";
import * as api from "../services/api";




export default class Notepad {
  constructor(notes) {
    this._notes = [];
  };
  

  // get() {
  //   return api.GET().then(notes =>{ 
  //     this._notes = notes;
  //     return this._notes;
  //   })
  // };

  // get notes() {
  //   return new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(this._notes), 0)
  //   }) 
  //   };

  findNoteById(id) {
    for (let key of this.notes) {
      if (key.id === id) {
        return key;
      }
    }
  };

  addItem(item) {
     return api.POST(item).then(saveItem => {
      this._notes.push(saveItem);
      return saveItem
    })
  
  };


  search(value) {
    const finall =  this._notes.filter(elem => elem.title.toLowerCase().includes(value.toLowerCase()) || elem.body.toLowerCase().includes(value.toLowerCase()));
    return finall
         }


  deleteNote(id) {
  return api.deleteNote(id).then(() => {
    this._notes = this._notes.filter(item => item.id !== id);
    return id
  })

    

  }

}