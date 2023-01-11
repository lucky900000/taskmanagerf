const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
mongoose.set("strictQuery", false);
const bcrypt = require("bcrypt");
const task = require("./tasks.js");
// mongoose
//   .connect("mongodb://127.0.0.1:27017/taskmanagerapi2")
//   .then(() => console.log("Connected!"));

mongoose.connect(process.env.mongodburl).then(() => console.log("Connected!"));

mongoose.pluralize(null);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userschema = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    password: { type: String },
    avatar: { type: Buffer },

    tokens: [{ token: { type: String } }],
    email: {
      unique: true,
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email id");
        }
      },
    },
  },

  { timestamps: true }
);

userschema.virtual("mytasks", {
  ref: "tasks",
  localField: "_id",
  foreignField: "creatorid",
});

userschema.pre("save", async function (next) {
  const user = this;
  console.log(900000000000000);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    console.log(user.password);
    console.log(777);
  }
  next();
});

userschema.pre("remove", async function (next) {
  await task.deleteMany({ creatorid: this._id });
  next();
});

userschema.statics.loginvalidation = async function (emailid, password) {
  console.log(89898);
  const userwiththisemail = await User.findOne({ email: emailid });
  console.log(userwiththisemail);
  if (!userwiththisemail) {
    console.log("no user with this emailid");
    throw new Error("Not able to login");
    return;
  }

  const actualpasswordofthisuser = userwiththisemail.password;
  console.log(actualpasswordofthisuser);
  const ifpasswordsmatch = await bcrypt.compare(
    password,
    actualpasswordofthisuser
  );
  console.log(ifpasswordsmatch);
  if (!ifpasswordsmatch) {
    console.log(99);
    throw new Error("unable to login as passwords do not match");
    return;
  }

  return userwiththisemail;
};

userschema.methods.showonlyselecteddata = async function () {
  console.log("welcm to showonlydel");
  // console.log(this);
  const duplicateobject = this.toObject();
  // console.log(duplicateobject);
  delete duplicateobject.tokens;
  delete duplicateobject.password;
  // console.log(duplicateobject);

  return duplicateobject;
};

// BELOW IS HOW I TRIED TO DECLARE AUTH FUNCTION WITHOUT USING IT AS MIDDLEWARE AND IT WORKED
// userschema.statics.authorization = async function (req, res) {
//   console.log("welcome to middldeare authorixaiotn  fn");

//   const enteredtokenfull = req.header("Authorization");
//   const enteredtokennet = enteredtokenfull.replace("Bearer ", "");
//   console.log(enteredtokennet);
//   const decoded = await jwt.verify(enteredtokennet, "im doing node");
//   console.log(decoded);
//   const thisuser = await User.findOne({
//     _id: decoded._id,
//     "tokens.token": enteredtokennet,
//   });

//   req.user = thisuser;
// };

//BELOW IS HOW I TRIED TO USE GENERATE TOKENS FUNCTION WITH STATICS AND IT WORKED.
// userschema.statics.generatetokens = async function (userresult) {
//   console.log("inside gen fn");
//   console.log(userresult);
//   const tokengen = jwt.sign({ _id: userresult.id.toString() }, "im doing node");

//   return tokengen;
// };
userschema.methods.generatetokens = async function () {
  console.log("inside gen fn");

  const tokengen = jwt.sign({ _id: this.id.toString() }, "im doing node");
  this.tokens = this.tokens.concat({ token: tokengen });
  // this.tokens.push({ token: tokengen });
  await this.save();

  return tokengen;
};

const User = mongoose.model("users", userschema);
// const me = new User({ name: "Lucky", age: 29 });
const a = 900000;

// async function loginvalidation3(emailid, password) {
//   console.log(77777777);
//   const userwiththisemail = await User.findOne({ email: emailid });
//   console.log(userwiththisemail);
//   if (!userwiththisemail) {
//     console.log("no user with this emailid");
//     throw new Error("Not able to login");
//     return;
//   }

//   const actualpasswordofthisuser = userwiththisemail.password;
//   console.log(actualpasswordofthisuser);
//   const ifpasswordsmatch = await bcrypt.compare(
//     password,
//     actualpasswordofthisuser
//   );
//   console.log(ifpasswordsmatch);
//   if (!ifpasswordsmatch) {
//     console.log(99);
//     throw new Error("unable to login as passwords do not match");
//     return;
//   }

//   return userwiththisemail;
// }

module.exports = User;
