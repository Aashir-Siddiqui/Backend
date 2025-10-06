require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/pathUtil");
const db = require("../utils/database");

// const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, address, price, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.houseAddress = address;
    this.housePrice = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
      'UPDATE homes SET houseName=?, houseAddress=?, housePrice=?, rating=?, photoUrl=?, description=? WHERE id=?',
        [
          this.houseName,
          this.houseAddress,
          this.housePrice,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (houseName, houseAddress, housePrice, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.houseName,
          this.houseAddress,
          this.housePrice,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
};
