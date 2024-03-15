import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";

ready(() => {
  const retryBtn = document.getElementById(
    "upload-reject-retry"
  ) as HTMLElement;

  retryBtn.addEventListener("click", () => {
    setStage(Stage.UPLOAD_AWAIT);
  });
});
