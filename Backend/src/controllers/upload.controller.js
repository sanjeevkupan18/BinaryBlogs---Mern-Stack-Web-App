const { uploadFile } = require("../services/imageKit");

/**
 * @name uploadImage
 * @desc Upload an image to ImageKit
 * @route POST /api/upload
 * @access Private
 */
async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const result = await uploadFile(req.file);

  return res.status(201).json({
    message: "Image uploaded successfully",
    file: {
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      fileId: result.fileId,
      name: result.name,
    },
  });
}

module.exports = { uploadImage };
