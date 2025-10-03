const registerHomes = [];

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Add Home", currentPage: "addHome" });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  registerHomes.push({
    houseName: req.body.houseName,
    houseAddress: req.body.address,
    housePrice: req.body.price,
  });
  res.render("homeAdded", { pageTitle: "Home Added", currentPage: "addHome" });
};

exports.getHomes = (req, res, next) => {
  res.render("home", {
    registerHomes: registerHomes,
    pageTitle: "Home",
    currentPage: "home",
  });
};
