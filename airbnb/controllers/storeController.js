const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  res.render("store/index", {
    pageTitle: "Airbnb",
    currentPage: "index",
  })
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
  })
};

exports.getFavourites = (req, res, next) => {
  res.render("store/favourite-list", {
    pageTitle: "My Favourites",
    currentPage: "favourites",
  })
};