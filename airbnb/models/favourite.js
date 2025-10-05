const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home already in favourites");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
        console.log("Added to favourites");
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(favHomeId, callback) {
    Favourite.getFavourites((homeIds) => {
      homeIds = homeIds.filter((homeId) => favHomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
