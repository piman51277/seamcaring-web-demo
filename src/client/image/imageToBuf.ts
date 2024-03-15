import { MarvinImage } from "marvinj-ts";

/**
 * Converts the MarvinImage to a ARGB 8888 buffer
 *
 * @param img
 * @returns
 */
export function imageToBuf(img: MarvinImage): Uint32Array {
  const width = img.getWidth();
  const height = img.getHeight();
  const pixArr = new Uint32Array(width * height);

  //The MarvinImage stores data as a Uint8ClampedArray, but its more convenient
  //as a Uint32Array
  for (let pix = 0; pix < width * height; pix++) {
    const offset = pix * 4;
    const A = img.data[offset];
    const R = img.data[offset + 1];
    const G = img.data[offset + 2];
    const B = img.data[offset + 3];

    //JS number uses double, so unsigned 32-bit bit ops are safe.
    const value = (A << 24) | (R << 16) | (G << 8) | B;
    pixArr[pix] = value;
  }

  return pixArr;
}
