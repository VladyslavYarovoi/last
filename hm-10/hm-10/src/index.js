import './sass/main.scss';

import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from  "./js/utils/constants";
import NotepadNew from "./js/utils/newNotepad"
import ref from  "./js/utils/refs";
import createListItem from  "./js/utils/view";
import addItem from  "./js/utils/addItem";



const allNotes = NotepadNew.notes;




const renderNoteList = (noteListRef, allNotes) => {
  const listElements = allNotes.map(note => createListItem(note));

  noteListRef.innerHTML = " ";

  noteListRef.append(...listElements);
}

renderNoteList(ref.noteList, allNotes);


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