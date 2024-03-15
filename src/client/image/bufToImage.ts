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
): ImageData {
  const imgData = new ImageData(width, height);

  //convert to RGBA Uint8Clamped
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    imgData.data[i * 4 + 0] = (pixel >> 24) & 0xff;
    imgData.data[i * 4 + 1] = (pixel >> 16) & 0xff;
    imgData.data[i * 4 + 2] = (pixel >> 8) & 0xff;
    imgData.data[i * 4 + 3] = pixel & 0xff;
  }

  return imgData;
}
