import { imageUploadHandler } from "./handlers/imageUploadHandler";
import { bufToImage } from "./image/bufToImage";
import { imageToBuf } from "./image/imageToBuf";
import { carveImage } from "./io/carveImage";
import { ready } from "./util/ready";

ready(() => {
  const inputelement = document.getElementById(
    "imageupload"
  ) as HTMLInputElement;

  inputelement.addEventListener("change", async (e) => {
    const result = await imageUploadHandler(e);
    if (result.success) {
      console.log("Image uploaded!");

      const image = result.image;

      const width = image.getWidth();
      const height = image.getHeight();

      const pixels = imageToBuf(image);

      const carvedImage = await carveImage(width, height, 1000, pixels, null);

      const newImage = bufToImage(
        carvedImage.width,
        carvedImage.height,
        carvedImage.pixels
      );

      const canvas = document.getElementById("output") as HTMLCanvasElement;
      canvas.width = newImage.getWidth();
      canvas.height = newImage.getHeight();

      newImage.draw(canvas, 0, 0, 1);
    }
  });
});
