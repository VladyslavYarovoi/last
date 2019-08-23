import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from  "./constants";



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
    refCreatEl.note.appendChild(footer(priority));
    refCreatEl.listItem.appendChild(refCreatEl.note);
  
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



  export default createListItem