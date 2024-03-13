export const STATES = Object.freeze({
  FileUpload: 0,
  FileUploaded: 1,
  Masking: 2,
  Settings: 3,
  Loading: 4,
  ShowImage: 5,
});

export var current_state = STATES.FileUpload;

// Use of this function assumes that prerequisites are have been checked
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
  get_div_of_state(current_state).style.display = "none";
  get_div_of_state(new_state).style.display = "block";
  current_state = new_state;

  switch (new_state) {
    case STATES.FileUpload:
        document.getElementById('circle-1').classList.replace('not-filled-in', 'filled-in');
        break;
    case STATES.FileUploaded:
        break;
    case STATES.Masking:
        console.log("Attempt")
        console.log(document.getElementById('circle-2').classList.replace('not-filled-in', 'filled-in'));
        break;
    case STATES.Settings:
        document.getElementById('circle-3').classList.replace('not-filled-in', 'filled-in');
        break;
    case STATES.Loading:
        document.getElementById('circle-4').classList.replace('not-filled-in', 'filled-in');
        break;

  }
}