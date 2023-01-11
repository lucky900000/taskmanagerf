const mongoose = require("mongoose");
const validator = require("validator");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanagerapi")
  .then(() => console.log("Connected!"));
mongoose.pluralize(null);
// const User = mongoose.model("person", {
//   name: { type: String },
//   age: { type: Number },
// });

// const me = new User({ name: "Lucky", age: 29 });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error-->", error);
//   });
//mongoose.set("strictQuery", true);
const Task = mongoose.model("task", {
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const studyjs = new Task({
  description: "Study java script",
  completed: true,
});

const studynode = new Task({
  description: "Study NodeJS",
  completed: false,
});

const studyjava = new Task({
  description: "Study JAHVA",
  completed: false,
});
//studyjs.save();
// studyjava
//   .save()
//   .then(() => {
//     console.log("result--", studyjava);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const studymongodb = new Task({
//   description: "Study MONGODB",
//   completed: false,
//   difficulty: "moderate",
// });

// studymongodb.save();

const User = mongoose.model("users", {
  name: { type: String, required: true, trim: true },
  email: {
    type: "string",
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("enter valid emailid");
      }
    },
  },
  password: {
    //
    trim: true,

    validate(value) {
      if (value.length < 7) {
        throw new Error("Enter password of minimum 7 characters");
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not contain the string password");
      }
    },
    type: "String",
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Enter valid age");
      }
    },
  },
});

const Pawan = new User({
  name: "Pawan",
  email: "pawan@gmail.com",
  age: 29,
  password: "                      gf",
});

Pawan.save()
  .then((gugu) => console.log(8888888888, gugu))
  .catch((error) => console.log("99999999999999999->", error));

// const str = "             hi";
// console.log(str.trim().length);
// if (str.trim().length < 7) {
//   throw new Error("Enter password of minimum 7 characters");
// }
