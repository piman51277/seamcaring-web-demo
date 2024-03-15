import { Masker } from "./../../masker/Masker";
import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";
import { imInstance } from "../ImageManager";

let masker = new Masker(document.createElement("canvas"), 0, 0, 0);

export function newMasker(): void {
  const canvas = document.getElementById("masking-canvas") as HTMLCanvasElement;
  const img = imInstance.sourceImage;
  const width = img.getWidth();
  const height = img.getHeight();
  const aspectRatio = width / height;

  masker = new Masker(canvas, 860, 660, aspectRatio);
}

ready(() => {
  const retryBtn = document.getElementById("masking-retry") as HTMLElement;
  const nextBtn = document.getElementById("masking-next") as HTMLElement;
  const canvas = document.getElementById("masking-canvas") as HTMLCanvasElement;

  //listen if the classes ae changed
  const img = imInstance.sourceImage;
  const width = img.getWidth();
  const height = img.getHeight();
  const aspectRatio = width / height;

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
