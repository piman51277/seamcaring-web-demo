export async function getSeamCarvingImage(number_of_seams, image_width, image_height, has_mask, image_pixels, mask_states = null) {
    const blob = new Blob([ 
        new Uint32Array(number_of_seams) ,
        new Uint32Array(image_width),
        new Uint32Array(image_height),
        new Uint8Array(has_mask ? 1 : 0),
        new Uint32Array(image_pixels),
        new Uint8Array(mask_states)
    ]);
    const response = await axios.post('http://localhost:5000/api/carve', {
        blob
    });

    return response.data;
}