import { MarvinImage } from "marvinj-ts";
import { loadImage } from "../image/loadImage";

type ImageUploadSucess = {
  success: true;
  image: MarvinImage;
};

type ImageUploadFailure = {
  success: false;
};

type ImageUploadResult = ImageUploadSucess | ImageUploadFailure;

/**
 * Handles the image upload event
 *
 * @param e The event object
 * @returns the image as a MarvinImage on success, { sucess: false } on failure.
 */
export async function imageUploadHandler(e: Event): Promise<ImageUploadResult> {
  const file = ((e.target as HTMLInputElement).files || [null])[0];
  if (file == null) return { success: false };

  const image = await loadImage(file);
  return {
    success: true,
    image,
  };
}
