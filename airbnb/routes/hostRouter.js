const express = require("express");

const hostRouter = express.Router();

const hostController  = require("../controllers/hostController");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.get("/host-home-list", hostController.getHostHome);
hostRouter.post("/add-home", hostController.postAddHome);

module.exports = hostRouter;