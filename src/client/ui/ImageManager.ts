import { MarvinImage } from "marvinj-ts";
import { Stage, setStage } from "./setStage";
import { carveImage } from "../io/carveImage";
import { imageToBuf } from "../image/imageToBuf";
import { bufToImage } from "../image/bufToImage";
import { newMasker } from "./stages/masking";

const previewImgs = ["preview-img", "resize-img", "masking-img"];
const finalImg = "review-img";

class ImageManager {
  sourceImage: MarvinImage;
  seamsToRemove: number;
  mask: Uint8Array;
  destImage: MarvinImage;

  constructor() {
    this.sourceImage = new MarvinImage();
    this.seamsToRemove = 0;
    this.destImage = new MarvinImage();
    this.mask = new Uint8Array();
  }

  setSourceImage(image: MarvinImage) {
    this.sourceImage = image;

    //convert MarvinImage to URI
    const blob = image.toBlob();
    const uri = URL.createObjectURL(blob);

    //write the image to the three <img>
    for (const loc of previewImgs) {
      const elem = document.getElementById(loc) as HTMLImageElement;
      elem.setAttribute("src", uri);

      //force resize to 860x660
      elem.style.width = "860 px";
      elem.style.height = "660 px";
    }

    //force a reset of the masker
    newMasker();
  }

  setSeamsToRemove(seams: number) {
    this.seamsToRemove = seams;
  }

  setMask(mask: Uint8Array) {
    this.mask = mask;
  }

  async carve() {
    setStage(Stage.PROCESSING);
    const pixels = imageToBuf(this.sourceImage);
    const width = this.sourceImage.getWidth();
    const height = this.sourceImage.getHeight();
    const result = await carveImage(
      width,
      height,
      this.seamsToRemove,
      pixels,
      this.mask
    );

    const imgData = bufToImage(
      width - this.seamsToRemove,
      height,
      result.pixels
    );

    const virtualCanvas = document.createElement("canvas");
    virtualCanvas.width = result.width;
    virtualCanvas.height = result.height;

    const ctx = virtualCanvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.putImageData(imgData, 0, 0);

    const url = virtualCanvas.toDataURL("image/png");

    const reviewImg = document.getElementById(finalImg) as HTMLImageElement;
    reviewImg.setAttribute("src", url);

    setStage(Stage.REVIEW);
  }
}

export const imInstance = new ImageManager();
