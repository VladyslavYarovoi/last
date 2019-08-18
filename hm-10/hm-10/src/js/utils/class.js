import {
  PRIORITY_TYPES
} from "./constants";

const shortid = require('shortid');
console.log(shortid.generate());


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
    }
    this.notes.push(newItem)
    return newItem
  };

  // generateUniqueId = () => {
  //   Math.random()
  //     .toString(36)
  //     .substring(2, 15) +
  //     Math.random()
  //     .toString(36)
  //     .substring(2, 15);
  // };

  search(value) {

    return this._notes.filter(elem => elem.title.toLowerCase().includes(value.toLowerCase()) || elem.body.toLowerCase().includes(value.toLowerCase()))
  }


  deleteNote(id) {
    this._notes = this._notes.filter(item => item.id !== id);
  };

  filterNotesByQuery(query) {
    let newArr = [];
    for (let key of this.notes) {
      for (const i in key) {
        let lowCaseTitle = key.title.toLowerCase();
        let lowCaseBody = key.body.toLowerCase();
        if (lowCaseTitle.includes(query.toLowerCase()) || lowCaseBody.includes(query.toLowerCase())) {
          newArr.push(key)
          return newArr
        }
      }
    }
  };
}