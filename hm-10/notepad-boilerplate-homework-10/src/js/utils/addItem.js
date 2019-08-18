import NotepadNew from "./newNotepad";
import createListItem from  "./view";
import ref from  "./refs";

const addItem = evt => {
    evt.preventDefault();
  
    const [input, texteria] = evt.target.elements;
   let inputF = input.value;
    let texteriaF = texteria.value;
    if(inputF === '' || texteriaF === ''){
      return alert('Необходимо заполнить все поля!')
      } else {
  
      const item = NotepadNew.addItem(inputF, texteriaF);
      const renderItem = createListItem(item);
      ref.noteList.append(renderItem);
      ref.form.reset()
      }
  };



  export default addItem