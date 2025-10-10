require("dotenv").config();
const Home = require("../models/home");
const User = require("../models/auth");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then((registerHomes) => {
      res.render("store/index", {
        registerHomes: registerHomes,
        pageTitle: "Airbnb",
        currentPage: "index",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log("Error fetching homes:", err);
    });
};

exports.getHomes = (req, res, next) => {
  Home.find()
    .then((registerHomes) =>
      res.render("store/home-list", {
        registerHomes: registerHomes,
        pageTitle: "Home",
        currentPage: "home",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
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
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavourites = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.addPostFavourites = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
    console.log("Added to favourites");
  }
  res.redirect("/favourites");
};

exports.postRemoveFromFavourites = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
    console.log("Removed from favourites");
  }
  res.redirect("/favourites");
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
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
