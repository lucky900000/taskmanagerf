const express = require("express");
const { findById } = require("./../models/users.js");
const auth = require("./../middleware/auth.js");
const {
  sendgoodbyeemail,
  sendwelcomeemail,
} = require("./../emails/account.js");

const sharp = require("sharp");
//const userrouter = new express.Router();
const userrouter = express();
const user = require("./../models/users.js");
module.exports = userrouter;
const bcrypt = require("bcrypt");
const task = require("../models/tasks.js");
//CREATE BELOW
userrouter.post("/users", async (req, res) => {
  console.log("in user signup fn");
  const allowedkeys = ["name", "email", "age", "password", "tokens"];
  const keysyouarecreating = Object.keys(req.body);
  const isvalidkey = keysyouarecreating.every((key) => {
    return allowedkeys.includes(key);
  });
  console.log(88888888);
  console.log(isvalidkey);
  if (!isvalidkey) {
    return res.status(400).send({
      error: "One/Some of the keys you are trying to create is/are not valid",
    });
  }
  console.log(100);

  try {
    const userdocument = new user(req.body);
    console.log("dubara");
    //  await userdocument.save();
    const token = await userdocument.generatetokens();
    // console.log(token);
    console.log(9900);
    console.log(8000);
    // console.log(userdocument);
    // const userdocument = new user(req.body);
    await userdocument.save();
    sendwelcomeemail(userdocument.name, userdocument.email);
    console.log("save hogya?");
    res.status(200).send({ userdocument });
    console.log(90000899999999);
  } catch (err) {
    res.status(400).send(err);
  }
});

//READ BELOW

userrouter.get("/users/me", auth, async (req, res) => {
  console.log("in get function");
  try {
    console.log(10);

    // const result = await user.find();
    const result = req.user;
    console.log("back from auth");
    res.send(await result.showonlyselecteddata());
  } catch (e) {
    res.send(e);
  }
});

// userrouter.get("/users/me", async (req, res) => {
//   console.log("in get function");
//   try {
//     const result = await user.authorization(req, res);
//     // console.log(10);
//     // const result = await user.find();

//     res.send(req.user);
//   } catch (e) {
//     res.send(e);
//   }
// });

//UPDATE BELOW - THIS CAN UPDATE ANYONES PROFILE. SO WE WONT USE IT
// userrouter.patch("/users/:id", async function (req, res) {
//   const keystobeupdated = Object.keys(req.body);
//   const keysallowedtobeupdated = ["name", "email", "age", "password"];
//   const isvalidoperation = keystobeupdated.every((update) =>
//     keysallowedtobeupdated.includes(update)
//   );
//   console.log(isvalidoperation);

//   if (!isvalidoperation) {
//     return res.status(400).send({ error: "YOu cannot update this key" });
//   }
//   // try {
//   //   console.log(999999999999);
//   //   const thisid = req.params.id;

//   //   const userupdated = await user.findByIdAndUpdate(thisid, req.body, {
//   //     new: true,
//   //     runValidators: true,
//   //   });
//   //   if (!userupdated) {
//   //     res.status(404).send();
//   //   } else {
//   //     res.status(200).send(userupdated);
//   //   }
//   // } catch (e) {
//   //   res.status(400).send(e);
//   // }

//   try {
//     console.log(880);
//     console.log(req.params.id);
//     const usertobeupdated = await user.findById(req.params.id);

//     console.log(670);
//     // console.log(JSON.parse(usertobeupdated));
//     console.log(Object.keys(req.body));

//     if (!usertobeupdated) {
//       return res.status(404).send();
//     } else {
//       Object.keys(req.body).forEach((key) => {
//         console.log(100);
//         console.log(key);
//         usertobeupdated[key] = req.body[key];
//       });
//       console.log(usertobeupdated);
//       console.log("pehla");
//       await usertobeupdated.save();
//       console.log("baadch");
//       console.log(usertobeupdated);
//       res.send(usertobeupdated);
//     }
//   } catch (e) {
//     res.status(400).send();
//   }
// });

//DELETE BELOW- BUT THIS WILL NOT BE USED AS IT WILL DELETE ANYONES PROFILE
// userrouter.delete("/users/:id", auth, async (req, res) => {
//   try {
//     const result = await user.findByIdAndDelete(req.params.id);
//     console.log(req.params.id);
//     //  console.log(result);
//     if (!result) {
//       res.status(404).send();
//     } else {
//       console.log(88);
//       res.status(200).send(result);
//     }
//   } catch (e) {
//     res.status(400).send();
//   }
// });

//UPDATE OWN PROFILE:-
userrouter.patch("/users/me/", auth, async (req, res) => {
  try {
    console.log("elcome to update fn");
    const allowedupdates = ["name", "email", "password", "age"];

    const validator = Object.keys(req.body).every((element) => {
      return allowedupdates.includes(element);
    });
    if (!validator) {
      return res.status(404).send("INVALID UPDATE");
    }
    // const filteredarray = Object.keys(req.body).filter((key) => {
    //   return !allowedupdates.includes(key);
    // });

    // if (filteredarray.length > 0) {
    //   return res.status(400).send({ error: "invalid update" });
    // }

    Object.keys(req.body).forEach((key) => {
      req.user[key] = req.body[key];
    });

    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE OWN PROFILE BELOW;-

userrouter.delete("/users/me", auth, async (reqt, res) => {
  try {
    console.log("in delet user fn");
    //await task.deleteMany({ creatorid: req.user._id });

    await reqt.user.remove();
    sendgoodbyeemail(reqt.user.name, reqt.user.email);
    res.send(reqt.user);
    console.log("hihihihihihihhihihi");
  } catch (e) {
    res.status(500).send();
  }
});

//USELOGIN-
userrouter.post("/users/login", async (req, res) => {
  try {
    const userresult = await user.loginvalidation(
      req.body.email,
      req.body.password
    );
    console.log(userresult);
    console.log("pppp");
    const token = await userresult.generatetokens();
    // userresult.tokens.push({ token: token });
    // await userresult.save();
    console.log("aagye");
    //console.log("token--->", token);
    console.log(token);
    console.log(89898989);
    console.log(userresult.showonlyselecteddata());
    res
      .status(200)
      .send({ userresult: await userresult.showonlyselecteddata(), token });
  } catch (e) {
    res.status(400).send(e);
  }
});

userrouter.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(function (obj) {
      return obj.token != req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

userrouter.post("/users/logoutall", auth, async function (req, res) {
  try {
    // req.user.tokens = req.user.tokens.filter((obj) => {
    //   return !obj.token;
    // });
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
const multer = require("multer");

//UPLOAD FILES:
const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("pls upload a jpg/jpeg/png file"));
    } else {
      cb(undefined, true);
    }
  },
});

userrouter.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      console.log("in image put ");
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      req.user.avatar = buffer;
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(400).send();
    }
  },
  (error, req, res, next) => {
    res.send({ error: error.message });
  }
);

//GETIING A USERS FILE BY HIS ID ONLY;-

userrouter.get("/users/:id/avatar", async (req, res) => {
  try {
    console.log("in");
    const userresult = await user.findById(req.params.id);
    console.log(userresult);
    if (!userresult || !userresult.avatar) {
      console.log("no such user/file");
      throw new Error("No such user or no file");
    }
    console.log("user exists");
    res.set("Content-Type", "image/png");
    res.send(userresult.avatar);
  } catch (e) {
    console.log("err");
    res.status(400).send(e);
  }
});

//DELETE FILES FROM A USERS PROFILE AFTER AUTHENTICTING HIM:-

userrouter.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

// async function loginvalidation(emailid, password) {
//   console.log("haha");
//   const userwiththisemail = await user.findOne({ email: emailid });
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
//   console.log(89999);
//   return userwiththisemail;
// }

// async function loginvalidation2(emailid, password) {
//   return new Promise(async function (rslv, rjct) {
//     console.log("start");
//     const userswiththisemail = await user.find({ email: emailid });
//     console.log(1400);
//     // console.log(userswiththisemail);
//     if (!userswiththisemail) {
//       console.log("no user with this emailid");
//       throw new Error("Not able to login");
//       return;
//     }
//     console.log(await bcrypt.hash(password, 8));
//     let usersofpasswordmatchedusers = [];
//     userswiththisemail.forEach(async (userobj) => {
//       // return new Promise(async function (rslv, rjct) {
//       console.log("entered in foreach");
//       console.log(userobj.password);

//       if (await bcrypt.compare(password, userobj.password)) {
//         console.log("matched");
//         usersofpasswordmatchedusers.push(userobj);
//       }
//       console.log("inside length", usersofpasswordmatchedusers.length);
//       console.log(usersofpasswordmatchedusers);
//       // rslv({ r: usersofpasswordmatchedusers.length });
//       console.log("ooooooooooooooo");
//       return userswiththisemail;

//       // rslv(99);
//     });

//     console.log("lengh", usersofpasswordmatchedusers.length);
//     console.log(usersofpasswordmatchedusers);
//   });

// if (usersofpasswordmatchedusers.length === 0) {
//   throw new Error("no password match");
//   return;
// }
// return usersofpasswordmatchedusers;
//rslv(usersofpasswordmatchedusers);
//}

// loginvalidation2("pawan@gmail.com", "jhxwaa")
//   .then((data) => console.log(data))
//   .catch((e) => {
//     console.log(e);
//   });

// async function add(a, b) {
//   return new Promise(function (rslv, rjct) {
//     rslv(a + b);
//   });
// }
