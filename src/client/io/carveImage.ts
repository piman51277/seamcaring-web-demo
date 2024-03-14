import axios from "axios";

//FIXME: This is temp!
const SERVER_URL = "http://127.0.0.1:5000";

/**
 * Packs a a data packet to be sent to the server
 *
 * @param width with of the image
 * @param height height of the image
 * @param remove seams to remove
 * @param pixels pixel data
 * @param mask mask data. optional
 * @returns
 */
function createPacket(
  width: number,
  height: number,
  remove: number,
  pixels: Uint32Array,
  mask: Uint8Array | null
): ArrayBuffer {
  const hasMask = mask !== null;
  const len = width * height * (4 + (hasMask ? 1 : 0)) + 13;
  const buf = new ArrayBuffer(len);
  const view = new DataView(buf);

  //first 4 bytes is the remove, uint32_t
  view.setUint32(0, remove, true);

  //next 4 bytes is the width, uint32_t
  view.setUint32(4, width, true);

  //next 4 bytes is the height, uint32_t
  view.setUint32(8, height, true);

  //next 1 byte is the mask flag, uint8_t
  view.setUint8(12, hasMask ? 1 : 0);

  //next width * height * 4 bytes is the pixels, uint32_t[]
  for (let i = 0; i < pixels.length; i++) {
    view.setUint32(13 + i * 4, pixels[i], true);
  }

  //if theres a mask, next width * height bytes is the mask, uint8_t[]
  if (hasMask) {
    for (let i = 0; i < mask.length; i++) {
      view.setUint8(13 + pixels.length * 4 + i, mask[i]);
    }
  }

  return buf;
}

type CarverImage = {
  width: number;
  height: number;
  pixels: Uint32Array;
};

/**
 * Parses incoming data packet
 *
 * @param buf packet data
 * @returns image object
 */
function parsePacket(buf: ArrayBuffer): CarverImage {
  const view = new DataView(buf);
  const width = view.getUint32(0, true);
  const height = view.getUint32(4, true);

  //we skip one byte, the mask presence flag
  const pixels = new Uint32Array(width * height);
  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = view.getUint32(9 + i * 4, true);
  }

  return {
    width,
    height,
    pixels,
  };
}

/**
 * Sends a request to the backend server to carve the image
 *
 * @param width width of the image
 * @param height height of the image
 * @param remove seams to remove
 * @param pixels pixel data
 * @param mask mask data. optional
 * @returns
 */
export async function carveImage(
  width: number,
  height: number,
  remove: number,
  pixels: Uint32Array,
  mask: Uint8Array | null
): Promise<CarverImage> {
  const body = createPacket(width, height, remove, pixels, mask);
  const response = await axios.post(`${SERVER_URL}/api/carve`, body, {
    responseType: "arraybuffer",
  });

  const packet = parsePacket(response.data);
  return packet;
}
