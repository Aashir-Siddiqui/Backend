const { mongo, default: mongoose } = require("mongoose");

const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Home",
    unique: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
