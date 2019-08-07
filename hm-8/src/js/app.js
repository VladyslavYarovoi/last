'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

class Notepad {
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
  saveNote(note) {
    this.notes.push(note);
    return note;
  };
  deleteNote(id) {
    const delObj = this.findNoteById(id);
    this.notes.splice(this.notes.indexOf(delObj), 1)
  };
  updateNoteContent(id, updatedContent) {
    const updObj = this.findNoteById(id);
    let final = {
      ...updObj,
      ...updatedContent
    };
    return final
  };
  updateNotePriority(id, priority) {
    const changPrior = this.findNoteById(id);
    changPrior.priority = priority;
    return changPrior
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
  filterNotesByPriority(priority) {
    let newArrPrior = [];
    for (let key of this.notes) {
      if (key.priority === priority) {
        newArrPrior.push(key)
        console.log(newArrPrior);
        return newArrPrior
      }
    }
  };
}


const initialNotes = [{
    id: 'id-1',
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body: 'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];




const NotepadNew = new Notepad(initialNotes);

console.log(NotepadNew);


const ref = {
  noteList: document.querySelector('.note-list'),
}

const createEl = (tag, classN) => {
  const createEl = document.createElement(tag);
  createEl.classList.add(classN);
  return createEl;
};

const createListItem = ({id, title, body, priority}) => {
  const refCreatEl = {
    listItem: createEl('li', 'note-list__item'),
    note: createEl('div', 'note'),
    noteContent: createEl('div', 'note__content'),
    noteTitle: createEl('h2', 'note__title'),
    noteBody: createEl('p', 'note__body'),
  };
  refCreatEl.listItem.dataset.id = id;
  refCreatEl.noteTitle.textContent = title;
  refCreatEl.noteBody.textContent = body;
  refCreatEl.noteContent.appendChild(refCreatEl.noteTitle);
  refCreatEl.noteContent.appendChild(refCreatEl.noteBody);
  refCreatEl.note.appendChild(refCreatEl.noteContent);
  refCreatEl.listItem.appendChild(refCreatEl.note);
  refCreatEl.listItem.appendChild(footer(priority));

  return refCreatEl.listItem
}


const footer = (prior) => {
  // const refFooter = {
  //   noteFooter: createEl('footer', 'note__footer'),
  //   noteSectionFirst : createEl('button', 'action'),
  //   btnDecrease: createEl('button', 'action'),
  //   btnIncrease: createEl('button', 'action'),
  //   iconMore: createEl('i', 'material-icons', 'action-icon'),
  //   iconLess: createEl('i', 'material-icons', 'action-icon'),
  //   priority: createEl('span', 'note__priority'),
  //   noteSectionSecond: createEl('section', 'note__section'),
  //   btnEditNote: createEl('button', 'action'),
  //   btnDeleteNote: createEl('button', 'action'),
  //   iconEdit: createEl('i', 'material-icons', 'action-icon'),
  //   iconDelete: createEl('i', 'material-icons', 'action-icon'),
  // }

  const noteFooter = createEl('footer', 'note__footer');  
  const noteSectionFirst = createEl('section', 'note__section');
  const btnDecrease = createEl('button', 'action');
  btnDecrease.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;
  const btnIncrease = createEl('button', 'action');
  btnIncrease.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;
  const iconMore = createEl('i', 'material-icons', 'action-icon');
  iconMore.textContent = ICON_TYPES.ARROW_DOWN;
  const iconLess = createEl('i', 'material-icons', 'action-icon');
  iconLess.textContent = ICON_TYPES.ARROW_UP;

  const priority = createEl('span', 'note__priority');
  priority.textContent = `Priority: ${prior}`;
  btnDecrease.appendChild(iconMore);
  btnIncrease.appendChild(iconLess);
  noteSectionFirst.appendChild(btnDecrease);
  noteSectionFirst.appendChild(btnIncrease);
  noteSectionFirst.appendChild(priority);

  const noteSectionSecond = createEl('section', 'note__section');

  const btnEditNote = createEl('button', 'action');
  btnEditNote.dataset.action = NOTE_ACTIONS.EDIT;

  const btnDeleteNote = createEl('button', 'action');
  btnDeleteNote.dataset.action = NOTE_ACTIONS.DELETE;

  const iconEdit = createEl('i', 'material-icons', 'action-icon');
  iconEdit.textContent = ICON_TYPES.EDIT;

  const iconDelete = createEl('i', 'material-icons', 'action-icon');
  iconDelete.textContent = ICON_TYPES.DELETE;
  btnEditNote.appendChild(iconEdit);
  btnDeleteNote.appendChild(iconDelete);
  noteSectionSecond.appendChild(btnEditNote);
  noteSectionSecond.appendChild(btnDeleteNote);
  noteFooter.appendChild(noteSectionFirst);
  noteFooter.appendChild(noteSectionSecond);
  return noteFooter
}


const btnDecrease = () => {

}

const allNotes = NotepadNew.notes;




const renderNoteList = (noteListRef, allNotes) => {
  const listElements = allNotes.map(note => createListItem(note));
  noteListRef.append(...listElements);
}

renderNoteList(ref.noteList, allNotes);











// ​
// const ref = {
//   ul: document.querySelector('.note-list'),
// };
// ​
// const createListItem = note => {
//   const listItem = createElement('li', 'note-list__item');
//   const notes = createElement('div', 'note');
//   //title
//   const noteContent = createElement('div', 'note__content');
//   const title = createElement('h2', 'note__title');
//   title.textContent = note.title;
//   //body
//   const body = createElement('p', 'note__body');
//   body.textContent = note.body;
//   noteContent.append(title, body);
//   notes.append(noteContent);
//   listItem.append(notes);
//   return listItem;
// };
// ​
// const renderNoteList = (listRef, notes) => {
//   const renderList = notes.map(elem => createListItem(elem));
//   listRef.append(...renderList);
// };
// ​
// renderNoteList(ref.ul, notes.note);