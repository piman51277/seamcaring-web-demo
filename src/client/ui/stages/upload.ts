import { ready } from "../../util/ready";
import { imageUploadHandler } from "../../handlers/imageUploadHandler";
import { Stage, setStage } from "../setStage";
import { imInstance } from "../ImageManager";

ready(() => {
  const uploadBtn = document.getElementById("upload-button") as HTMLElement;
  const fileInput = document.getElementById("file-input") as HTMLInputElement;
  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", async (e) => {
    const result = await imageUploadHandler(e);

    //if invalid file, boot to the upload reject stage
    if (!result.success) {
      setStage(Stage.UPLOAD_REJECT);
      return;
    }

    imInstance.setSourceImage(result.image);
    setStage(Stage.PREVIEW);
  });
});
