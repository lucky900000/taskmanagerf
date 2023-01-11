const user = require("./src/models/users.js");
const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./src/models/users.js");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanagerapi")
  .then(() => console.log("Connected!"));
mongoose.pluralize(null);

user
  .findByIdAndUpdate("63b5b4929447e7b348e9afad", { age: 800 })
  .then((g) => {
    console.log(g);
    return User.countDocuments({ age: 800 });
  })
  .then((r) => console.log(r))
  .catch((err) => {
    console.log(err);
  });
console.log(user);

user.findOne({ _id: "63b5b4929447e7b348e9afad" }).then((g) => console.log(g));
