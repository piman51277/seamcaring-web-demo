
import { STATES, change_state } from './state.js';

change_state(STATES.FileUpload);

let image = null;

function accept_upload() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => { 
        var file = e.target.files[0];
        change_state(STATES.FileUploaded);
    }
}