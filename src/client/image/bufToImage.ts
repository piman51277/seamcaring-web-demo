import { MarvinImage } from "marvinj-ts";

/**
 * Create an image from a buffer
 *
 * @param width width of image
 * @param height height of image
 * @param pixels Uint32Array of pixels (ARGB 8888)
 * @returns
 */
export function bufToImage(
  width: number,
  height: number,
  pixels: Uint32Array
): MarvinImage {
  const img = new MarvinImage(width, height);
  const data = img.data;
  for (let pix = 0; pix < width * height; pix++) {
    const offset = pix * 4;
    const value = pixels[pix];
    data[offset] = (value >> 24) & 0xff;
    data[offset + 1] = (value >> 16) & 0xff;
    data[offset + 2] = (value >> 8) & 0xff;
    data[offset + 3] = value & 0xff;
  }
  return img;
}
