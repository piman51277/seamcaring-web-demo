import "./main.js"
function change_main_content_html(html) {
    document.getElementById("main-content").innerHTML = html;
}

// Use of this function assumes that prerequisites are have been checked
function change_state(new_state) {
    state = new_state;
  
    switch (state) {
      case a.FileUpload:
        change_main_content_html(`
          <button id="upload-button" onclick="accept_upload()">
              Upload
          </button>`
          );
        break;
      case a.FileUploaded:
        console.log("FileUploaded");
        break;
      case a.Masking:
        console.log("Masking");
        break;
      case a.Settings:
        console.log("Settings");
        break;
      case a.Loading:
        console.log("Loading");
        break;
      case a.ShowImage:
        console.log("ShowImage");
        break;
    }
  }