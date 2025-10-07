const { getDb } = require("../utils/database");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDb();
    return db
      .collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((fav) => {
        if (!fav) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static getFavourites() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDb();
    return db.collection("favourites").deleteOne({ houseId: delHomeId });
  }
};
