import NotepadNew from "./newNotepad";
// import createListItem from  "./view";
import ref from  "./refs";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'
import MicroModal from 'micromodal';
import cardTemplate from "../../templates/cards.hbs";


const notyf = new Notyf();




const addItem = evt => {
  evt.preventDefault();
  const [input, texteria] = evt.target.elements;
 let inputF = input.value;
  let texteriaF = texteria.value;
  if(inputF === '' || texteriaF === ''){
    return notyf.error('Необходимо заполнить все поля!')
    } else {

    const item = NotepadNew.addItem(inputF, texteriaF);
      const newItem = cardTemplate(item);
    console.log(newItem);


    ref.noteList.insertAdjacentHTML('beforeend', newItem);
    
    ref.form.reset()
    notyf.success('Заметка добавлена')
    MicroModal.close('note-editor-modal')
    }
};



  export default addItem