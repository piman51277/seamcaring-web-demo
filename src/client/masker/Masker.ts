import { Marvin, MarvinImage } from "marvinj-ts";

type ImgBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Helper for image masking
 */
export class Masker {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  targetAspect: number;
  mouseDown: boolean;
  lastMousePos: { x: number; y: number };

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    targetAspect: number
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = width;
    this.height = height;
    this.targetAspect = targetAspect;

    //force set canvas to the correct size
    canvas.width = width;
    canvas.height = height;

    //bind mouse events
    canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    canvas.addEventListener("mousemove", this.handleMouseDrag.bind(this));

    this.reset();
  }

  /**
   * Handles mouse down
   *
   * @param e event
   */
  handleMouseDown(e: MouseEvent): void {
    const x = e.offsetX;
    const y = e.offsetY;
    this.mouseDown = true;
    this.lastMousePos = { x, y };

    this.draw(x, y);
  }

  /**
   * Handles mouse up
   */
  handleMouseUp(): void {
    this.mouseDown = false;
  }

  /**
   * Handles mouse drag
   *
   * @param e
   */
  handleMouseDrag(e: MouseEvent): void {
    const x = e.offsetX;
    const y = e.offsetY;

    if (this.mouseDown) {
      //figure out the vector from the last mouse pos to the current one
      let dx = x - this.lastMousePos.x;
      let dy = y - this.lastMousePos.y;

      //normalize the vector
      const mag = Math.sqrt(dx * dx + dy * dy);
      dx /= mag;
      dy /= mag;

      //do draw calls every 4 units of the vector until we reach the current mouse pos
      for (let i = 0; i < mag; i += 4) {
        this.draw(this.lastMousePos.x + dx * i, this.lastMousePos.y + dy * i);
      }

      this.lastMousePos = { x, y };
    }
  }
  cons;
  /**
   * Gets the bounds of the image
   * @returns bounds of the imag
   */
  getImgBounds(): ImgBounds {
    const cAspect = this.width / this.height;
    let imgWidth = this.width;
    let imgHeight = this.height;

    if (cAspect < this.targetAspect) {
      imgHeight = this.width / this.targetAspect;
    } else if (cAspect > this.targetAspect) {
      imgWidth = this.height * this.targetAspect;
    }

    const x = (this.width - imgWidth) / 2;
    const y = (this.height - imgHeight) / 2;

    return { x, y, width: imgWidth, height: imgHeight };
  }

  /**
   * Resets the mask
   */
  reset(): void {
    //clear the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    //draw the box
    const { x, y, width, height } = this.getImgBounds();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(x, y, width, height);
  }

  /**
   * Draw on the mask
   *
   * @param x
   * @param y
   */
  draw(x: number, y: number): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
    this.ctx.clearRect(x - 10, y - 10, 20, 20);
  }

  /**
   * Exports the mask
   *
   * @param targetWidth The width of the target image
   * @param targetHeight The height of the target image
   */
  export(targetWidth: number, targetHeight: number): Uint8Array {
    const { x, y, width, height } = this.getImgBounds();

    const imgData = this.ctx.getImageData(x, y + 1, width, height);

    //convert to marvin image
    const canvasPix = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < imgData.data.length; i += 4) {
      //if the alpha is 0, set it to white
      if (imgData.data[i + 3] < 20) {
        canvasPix[i] = 255;
        canvasPix[i + 1] = 255;
        canvasPix[i + 2] = 255;
      } else {
        canvasPix[i] = 0;
        canvasPix[i + 1] = 0;
        canvasPix[i + 2] = 0;
      }
      canvasPix[i + 3] = 255;
    }
    const smallImg = new MarvinImage(width, height);
    smallImg.data = canvasPix;

    const actualImg = new MarvinImage(targetWidth, targetHeight);
    Marvin.scale(smallImg, actualImg, targetWidth, targetHeight);

    const mask = new Uint8Array(targetWidth * targetHeight);
    const data = actualImg.data;
    for (let i = 0; i < targetWidth * targetHeight; i++) {
      mask[i] = data[i * 4 + 1] > 0 ? 1 : 0;
    }

    return mask;
  }
}
