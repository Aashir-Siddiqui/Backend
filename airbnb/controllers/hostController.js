const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", { pageTitle: "Add Home", currentPage: "addHome" });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, address, price, rating, photoUrl } = req.body;
  const home = new Home(houseName, address, price, rating, photoUrl);
  home.save();
  res.render("host/home-added", { pageTitle: "Home Added", currentPage: "homeAdded" });
};

exports.getHostHome = (req, res, next) => {
  Home.fetchAll((registerHomes) =>
    res.render("host/host-home-list", {
      registerHomes: registerHomes,
      pageTitle: "Host Homes",
      currentPage: "host-home",
    })
  );
};