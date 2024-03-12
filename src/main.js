
import { STATES, change_state } from './state.js';
import { image_to_canvas } from './helper.js';
let image = null;
let mask = null;
function restart() {
    change_state(STATES.FileUpload);
}

window.restart = restart;

function accept_upload() {
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => { 
        image = e.target.files[0];
        
        let image_element = document.getElementById("uploaded-image");

        image_element.src = URL.createObjectURL(image);

        change_state(STATES.FileUploaded);
    }
}

window.accept_upload = accept_upload;

function go_to_masking_phase() {
    change_state(STATES.Masking);

    // TODO: Add masking support
    image_to_canvas(document.getElementById("uploaded-image"), document.getElementById("masking-canvas"));
}

window.go_to_masking_phase = go_to_masking_phase;

function go_to_settings() {
    // TODO: Save state of canvas for the masking phase
    document.getElementById("seam-slider").max = image.width - 1;
    change_state(STATES.Settings);
}

window.go_to_settings = go_to_settings;

function submit_image_for_carving() {
    change_state(STATES.Loading);

    // wait 2 seconds
    setTimeout(() => {
        change_state(STATES.ShowImage);
    }, 2000);
    // placeholder
    document.getElementById("final-image").src = URL.createObjectURL(image);
}

window.submit_image_for_carving = submit_image_for_carving;