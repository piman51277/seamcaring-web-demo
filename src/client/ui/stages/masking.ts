import { Masker } from "./../../masker/Masker";
import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";

ready(() => {
  const retryBtn = document.getElementById("masking-retry") as HTMLElement;
  const nextBtn = document.getElementById("masking-next") as HTMLElement;
  const canvas = document.getElementById("masking-canvas") as HTMLCanvasElement;

  //TODO: set aspect ratio based on the image
  const masker = new Masker(canvas, 860, 660, 1);

  retryBtn.addEventListener("click", () => {
    masker.reset();
  });

  nextBtn.addEventListener("click", () => {
    //TODO: save the masker state
    //FIXME: rememeber to re-create a new masker instance every time
    setStage(Stage.RESIZE);
    masker.reset();
  });
});
