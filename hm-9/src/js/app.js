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

  addItem(input, texteria) {
    const newItem = {
      id: Notepad.generateUniqueId,
      title: input,
      body: texteria,
      priority: PRIORITY_TYPES.LOW,
    }
    this.notes.push(newItem)
    return newItem
  };

  generateUniqueId = () =>{ 
    Math.random()
    .toString(36)
    .substring(2, 15) +
    Math.random()
    .toString(36)
    .substring(2, 15);
  };

  search(value) {
    
    return this._notes.filter(elem => elem.title.toLowerCase().includes(value.toLowerCase()) || elem.body.toLowerCase().includes(value.toLowerCase()))  
    // add body
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


const ref = {
  noteList: document.querySelector('.note-list'),
  form: document.querySelector('.note-editor'),
  search: document.querySelector('.search-form'),
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

  noteListRef.innerHTML = " ";

  noteListRef.append(...listElements);
}

renderNoteList(ref.noteList, allNotes);



const addItem = evt => {
  evt.preventDefault();

  const [input, texteria] = evt.target.elements;
 let inputF = input.value;
  let texteriaF = texteria.value;
  if(inputF === '' || texteriaF === ''){
    return alert('Необходимо заполнить все поля!')
}
  const item = NotepadNew.addItem(inputF, texteriaF);


  const renderItem = createListItem(item);
  ref.noteList.append(renderItem);
  ref.form.reset()
};


ref.form.addEventListener('submit', addItem);


const searchForm = evt => {
const findNote = NotepadNew.search(evt.target.value);

renderNoteList(ref.noteList, findNote)

}


ref.search.addEventListener("input", searchForm);

const deleteListItem = element => {
    const parentListItem = element.closest('.note-list__item');
    const id = parentListItem.dataset.id;

    NotepadNew.deleteNote(id)
    parentListItem.remove()
}

const checkClick = ({target}) => {
  event.preventDefault();
  if(target.parentNode.nodeName !== 'BUTTON') return;
  const action =   target.parentNode.dataset.action;

  switch (action) {
  case NOTE_ACTIONS.DELETE:
    deleteListItem(target)
    break;
  case NOTE_ACTIONS.EDIT:
      console.log('EDITE');
    break;
  case NOTE_ACTIONS.INCREASE_PRIORITY:
      console.log('INCREASE');
    break;
  case NOTE_ACTIONS.DECREASE_PRIORITY:
    // decreaseFn()
    break;

  }

}


ref.noteList.addEventListener('click', checkClick);