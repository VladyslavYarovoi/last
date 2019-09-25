import {
  PRIORITY_TYPES
} from "./constants";
import { resolve } from "url";

const shortid = require('shortid');


export default class Notepad {
  constructor(notes) {
    this._notes = notes;
  }
  get notes() {
    return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this._notes), 0)
    }) 
    };
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
    // return new Promise ((resolve, reject) => {
    //   this._notes.push(newItem);
    //   setTimeout(() => { resolve(newItem);}, 0)
    // })
    this._notes.push(newItem);
    return Promise.resolve(newItem)
  };


  search(value) {
    const finall =  this._notes.filter(elem => elem.title.toLowerCase().includes(value.toLowerCase()) || elem.body.toLowerCase().includes(value.toLowerCase()));
    return finall
         }


  deleteNote(id) {
    return new Promise((resolve, reject) => {

      setTimeout(() => resolve(this._notes = this._notes.filter(item => item.id !== id)), 0)
    })
    //  return this._notes = this._notes.filter(item => item.id !== id);

  }

}