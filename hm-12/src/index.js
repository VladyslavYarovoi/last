import './sass/main.scss';
import cardTemplate from "./templates/cards.hbs";
import initialNotes from '../src/assets/notes.json'



import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from  "./js/utils/constants";
import notepadNew from "./js/utils/newNotepad"
import ref from  "./js/utils/refs";
import addItem from  "./js/utils/addItem";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'
import MicroModal from 'micromodal';
import localStorage from './js/utils/localStorage';

const allNotes = notepadNew.notes;
const notyf = new Notyf();






const renderNoteList = (noteListRef, allNotes) => {
  const element = createCard(allNotes)
  noteListRef.innerHTML = " ";
  ref.noteList.insertAdjacentHTML('beforeend', element)

}



ref.form.addEventListener('submit', addItem);


const searchForm = evt => {
    const findNote = notepadNew.search(evt.target.value);
    renderNoteList(ref.noteList, findNote)
}

ref.search.addEventListener("input", searchForm);






const deleteListItem = element => {
    
    const parentListItem = element.closest('.note-list__item');
    const id = parentListItem.dataset.id;

    notepadNew.deleteNote(id).then(
      note => {
        parentListItem.remove()
        notyf.success('Заметка удалена')
        localStorage.set('wow', notepadNew._notes);
      }
    );
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

const handleOpenBtn = () => {
  MicroModal.show('note-editor-modal')
}


ref.noteList.addEventListener('click', checkClick);

ref.openEditorBtn.addEventListener('click', handleOpenBtn);





const createCard = cards => {
  const markup = cards.map(card => cardTemplate(card)).join('');
  return markup
}
let markup = createCard(initialNotes);

if(localStorage.get('wow')){
  markup = createCard(localStorage.get('wow'));
}


ref.noteList.insertAdjacentHTML('beforeend', markup);