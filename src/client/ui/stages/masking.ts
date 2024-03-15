import { Masker } from "./../../masker/Masker";
import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";
import { imInstance } from "../ImageManager";

let masker = new Masker(document.createElement("canvas"), 0, 0, 0);
let width = 0;
let height = 0;
let aspectRatio = width / height;

export function newMasker(): void {
  const canvas = document.getElementById("masking-canvas") as HTMLCanvasElement;
  const img = imInstance.sourceImage;
  width = img.getWidth();
  height = img.getHeight();
  aspectRatio = width / height;

  masker = new Masker(canvas, 860, 660, aspectRatio);
}

ready(() => {
  const retryBtn = document.getElementById("masking-retry") as HTMLElement;
  const nextBtn = document.getElementById("masking-next") as HTMLElement;
  const canvas = document.getElementById("masking-canvas") as HTMLCanvasElement;

  //listen if the classes ae changed
  masker = new Masker(canvas, 860, 660, aspectRatio);

  retryBtn.addEventListener("click", () => {
    masker.reset();
  });

  nextBtn.addEventListener("click", () => {
    const mask = masker.export(width, height);
    imInstance.setMask(mask);
    setStage(Stage.RESIZE);
    masker.reset();
  });
});
