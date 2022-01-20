export default {
    methods: {
        formatImage(image, size) {
            if(image.formats && image.formats !== null){
                const final = (process.env.IMAGE_URL + (size in image.formats? image.formats[size].url : image.url));
                return final;
            } else {
                const final = (process.env.IMAGE_URL + image.url);
                return final;
            }
        },
    }
}