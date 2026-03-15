const ImageKit = require("imagekit");

const imageKitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  try {
    const response = await imageKitClient.upload({
      file: file.buffer,
      fileName: file.originalname,
    });
    return response;
  } catch (error) {
    console.error("Error uploading file to ImageKit:", error);
    throw error;
  }
}

module.exports = { uploadFile };
