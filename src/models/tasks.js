const mongoose = require("mongoose");
// const validator = require("validator");
// const user = require("./users.js");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanagerapi2")
  .then(() => console.log("Connected!"));

//mongoose.connect(process.env.mongodburl).then(() => console.log("Connected!"));
const taskschema = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean },

    creatorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const task = mongoose.model("tasks", taskschema);

module.exports = task;
