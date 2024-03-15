import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";

ready(() => {
  const retryBtn = document.getElementById("preview-retry") as HTMLElement;
  const nextBtn = document.getElementById("preview-next") as HTMLElement;

  retryBtn.addEventListener("click", () => {
    setStage(Stage.UPLOAD_AWAIT);
  });

  nextBtn.addEventListener("click", () => {
    setStage(Stage.MASKING);
  });
});
