require("dotenv").config();
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

module.exports = class Home {
  constructor(houseName, address, price, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.houseAddress = address;
    this.housePrice = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      const updatedFields = {
        houseName: this.houseName,
        houseAddress: this.houseAddress,
        housePrice: this.housePrice,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updatedFields }
        );
    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
