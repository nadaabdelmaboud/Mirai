const mongoose = require("mongoose");

const Image = {
  deleteImage: async function (imageId) {
    var ObjectID = mongoose.Types.ObjectId(imageId);
    gfs.remove({ _id: ObjectID, root: "images" }, (err, gridStore) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  },
};

module.exports = Image;
