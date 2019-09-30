import Notepad from  "./Notepad";
import { PRIORITY_TYPES } from  "./constants";
import initialNotes from '../../../db.json'


const notepadNew = new Notepad(initialNotes);

 export default notepadNew