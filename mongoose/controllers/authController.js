exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
  });
};

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);

  // Simple validation (TODO: Add proper authentication)
  if (username && password) {
    req.session.isLoggedIn = true;
    req.session.user = {
      username: username,
    };

    req.session.save((err) => {
      if (err) {
        console.log("Session save error:", err);
      }
      console.log("User logged in successfully");
      res.redirect("/");
    });
  } else {
    console.log("Login failed: Missing credentials");
    res.redirect("/login");
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout error:", err);
    }
    console.log("User logged out");
    res.redirect("/login");
  });
};
