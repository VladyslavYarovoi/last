import notepadNew from "./newNotepad";
import ref from  "./refs";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'
import MicroModal from 'micromodal';
import cardTemplate from "../../templates/cards.hbs";
import localStorage from "./localStorage";


const notyf = new Notyf();




const addItem = evt => {
  evt.preventDefault();
  const [input, texteria] = evt.target.elements;
 let inputF = input.value;
  let texteriaF = texteria.value;
  if(inputF === '' || texteriaF === ''){
    return notyf.error('Необходимо заполнить все поля!')
    } else {
      localStorage.remove('wow');

    const item = notepadNew.addItem(inputF, texteriaF);
      const newItem = cardTemplate(item);


    ref.noteList.insertAdjacentHTML('beforeend', newItem);

    ref.form.reset();
    notyf.success('Заметка добавлена');
    MicroModal.close('note-editor-modal');
    localStorage.set('wow', notepadNew._notes);
    console.log('additem',notepadNew._notes);
    }
};
 


  export default addItem