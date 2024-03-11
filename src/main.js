
import { change_state } from "./state_handling.js";

change_state(a.FileUpload);

let image = null;
let state = a.FileUpload;

console.log(state);

function accept_upload() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => { 
        var file = e.target.files[0]; 
        console.log(file);
    }
}