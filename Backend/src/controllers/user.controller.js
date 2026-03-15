const User = require("../models/user.model");
const { uploadFile } = require("../services/imageKit");

/**
 * @name uploadAvatar
 * @desc Upload user avatar and update profile
 * @route POST /api/users/avatar
 * @access Private
 */
async function uploadAvatar(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const uploaded = await uploadFile(req.file);

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: uploaded.url },
    { new: true }
  );

  return res.status(200).json({
    message: "Avatar updated successfully",
    avatar: user.avatar,
  });
}

module.exports = { uploadAvatar };
