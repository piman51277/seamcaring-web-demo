import { MarvinImage } from "marvinj-ts";

/**
 * Load a File object and converts it into a MarvinImage
 *
 * @param img The image File object
 * @returns MarvinImage object of the image
 */
export async function loadImage(img: File): Promise<MarvinImage> {
  //convert the file into a format that Marvin can read
  const reader = new FileReader();
  const readerPromise: Promise<ArrayBuffer> = new Promise((res, rej) => {
    reader.onload = () => res(reader.result as ArrayBuffer);
    reader.onerror = () => rej(reader.error);
  });
  reader.readAsArrayBuffer(img);

  const buf: ArrayBuffer = await readerPromise;
  const blob = new Blob([buf], { type: img.type });
  const url = URL.createObjectURL(blob);

  //load at ARGB 8888 using Marvin
  const image = new MarvinImage();
  await new Promise((resolve) => {
    image.load(url, resolve);
  });

  return image;
}
