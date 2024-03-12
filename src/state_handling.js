import { state } from "./main.js";
import { STATES } from './state.js';

function change_main_content_html(html) {
    document.getElementById("main-content").innerHTML = html;
}
function get_div_of_state(state) {
    switch (state) {
        case STATES.FileUpload:
            return document.getElementById("file_upload_div");
        case STATES.FileUploaded:
            return document.getElementById("file_uploaded_div");
        case STATES.Masking:
            return document.getElementById("masking_div");
        case STATES.Settings:
            return document.getElementById("settings_div");
        case STATES.Loading:
            return document.getElementById("loading_div");
        case STATES.ShowImage:
            return document.getElementById("show_image_div");

    }
}
// Use of this function assumes that prerequisites are have been checked
export function change_state(new_state) {
    get_div_of_state(state).style.visibility = "false";
    get_div_of_state(new_state).style.display = "true";
    state = new_state;
    
  }