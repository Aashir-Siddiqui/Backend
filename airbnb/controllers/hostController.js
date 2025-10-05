const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.editing === "true";
  console.log(homeId, editMode);

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log("Editing Home:", home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit Home",
      currentPage: "addHome",
      editing: editMode,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, address, price, rating, photoUrl } = req.body;
  const home = new Home(houseName, address, price, rating, photoUrl);
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  console.log(req.body);
  const { id, houseName, address, price, rating, photoUrl } = req.body;
  const home = new Home(houseName, address, price, rating, photoUrl);
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
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

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting Home ID:", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error deleting home:", error);
    }
    res.redirect("/host/host-home-list");
  });
};
