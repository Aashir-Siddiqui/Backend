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

  Home.findById(homeId).then((home) => {
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
  const { houseName, address, price, rating, photoUrl, description } = req.body;
  const home = new Home({
    houseName,
    address,
    price,
    rating,
    photoUrl,
    description,
  });
  home.save().then(() => console.log("Created New Home"));
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, address, price, rating, photoUrl, description, homeId } =
    req.body;
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found for updating");
        return res.redirect("/host/host-home-list");
      }
      home.houseName = houseName;
      home.address = address;
      home.price = price;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;
      home
        .save()
        .then(() => console.log("Updated Home"))
        .catch((err) => console.log("Error while updating home", err));
    })
    .catch((err) => console.log("Error finding home for update", err));
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting Home ID:", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};

exports.getHostHome = (req, res, next) => {
  Home.find().then((registerHomes) =>
    res.render("host/host-home-list", {
      registerHomes: registerHomes,
      pageTitle: "Host Homes",
      currentPage: "host-home",
    })
  );
};
