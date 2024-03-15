import { ready } from "../../util/ready";
import { imInstance } from "../ImageManager";
import { Stage, setStage } from "../setStage";

ready(() => {
  const downloadBtn = document.getElementById("review-dwn") as HTMLElement;
  const resetBtn = document.getElementById("review-reset") as HTMLElement;

  downloadBtn.addEventListener("click", () => {
    const img = imInstance.destImage;
    const virtualCanvas = document.createElement("canvas");
    virtualCanvas.width = img.getWidth();
    virtualCanvas.height = img.getHeight();
    img.draw(virtualCanvas, 0, 0, 1);
    const url = virtualCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "image.png";
    a.click();
  });

  resetBtn.addEventListener("click", () => {
    setStage(Stage.UPLOAD_AWAIT);
  });
});
