export function image_to_canvas(image, canvas) {
    let ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    return canvas;
}

export function canvas_to_image(canvas) {
    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

// idk if this works
export function image_to_arbg_array(image) {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    let data = ctx.getImageData(0, 0, image.width, image.height);
    return new Uint32Array(data.data.buffer);

}