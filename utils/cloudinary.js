const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const cloudinaryUploadImg = (fileToUpload) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(fileToUpload, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve({
                    url: result.secure_url,
                    resource_type: result.resource_type
                });
            }
        });
    });
};

module.exports = cloudinaryUploadImg;
