require("dotenv").config();
const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((registerHomes) => {
      res.render("store/index", {
        registerHomes: registerHomes,
        pageTitle: "Airbnb",
        currentPage: "index",
      });
    })
    .catch((err) => {
      console.log("Error fetching homes:", err);
    });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then((registerHomes) =>
      res.render("store/home-list", {
        registerHomes: registerHomes,
        pageTitle: "Home",
        currentPage: "home",
      })
    )
    .catch((err) => {
      console.log("Error fetching homes:", err);
    });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((registerHomes) => {
      const favouriteHomes = registerHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.addPostFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("Added to favourites", result);
    })
    .catch((err) => {
      console.log("Error adding to favourites", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then((result) => {
      console.log("Removed from favourites", result);
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error removing from favourites", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/homes");
      console.log("Home not found");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home",
      });
    }
  });
};
