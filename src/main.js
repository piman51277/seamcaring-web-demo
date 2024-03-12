
import { STATES, change_state } from './state.js';

let image = null;

function accept_upload() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => { 
        var file = e.target.files[0];
        
        let image_element = document.getElementById("uploaded-image");

        image_element.src = URL.createObjectURL(file);
            
        change_state(STATES.FileUploaded);
    }
}
window.accept_upload = accept_upload;