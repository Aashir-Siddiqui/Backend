require("dotenv").config();

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const url = process.env.MONGO_URL;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error while connecting mongo", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
