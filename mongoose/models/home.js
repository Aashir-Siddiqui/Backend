const { default: mongoose } = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
});

homeSchema.pre("findOneAndDelete", function (next) {
  const homeId = this.getQuery()["_id"];
  mongoose
    .model("Favourite")
    .deleteMany({ houseId: homeId })
    .then(() => next())
    .catch((err) => next(err));
});

module.exports = mongoose.model("Home", homeSchema);
