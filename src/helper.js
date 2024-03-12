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