const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  res.render("store/index", {
    pageTitle: "Airbnb",
    currentPage: "index",
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registerHomes) =>
    res.render("store/home-list", {
      registerHomes: registerHomes,
      pageTitle: "Home",
      currentPage: "home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registerHomes) => {
      const favouriteHomes = registerHomes.filter((home) =>
        favourites.includes(home.id)
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
  Favourite.addToFavourite(req.body.id, (err) => {
    if (err) {
      console.log("Error adding to favourites", err);
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error removing from favourites:", error);
    }
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
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
