import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";

ready(() => {
  const downloadBtn = document.getElementById("review-dwn") as HTMLElement;
  const resetBtn = document.getElementById("review-reset") as HTMLElement;

  downloadBtn.addEventListener("click", () => {
    //TODO: download the image
  });

  resetBtn.addEventListener("click", () => {
    //TODO: actually perform resets
    setStage(Stage.UPLOAD_AWAIT);
  });
});
