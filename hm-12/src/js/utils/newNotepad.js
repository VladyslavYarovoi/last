import Notepad from  "./Notepad";
import { PRIORITY_TYPES } from  "./constants";
import initialNotes from '../../assets/notes.json'


let localStorageNotes = localStorage.getItem('wow');

if(localStorageNotes){
    localStorageNotes = JSON.parse(localStorageNotes);
}

const inNotes = localStorageNotes ? localStorageNotes : initialNotes;

const notepadNew = new Notepad(inNotes);


export default notepadNew