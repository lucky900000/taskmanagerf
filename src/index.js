const express = require("express");
const app = express();
const multer = require("multer");
const user = require("./models/users.js");
const task = require("./models/tasks.js");
const userrouter = require("./routers/userrouter.js");
const taskrouter = require("./routers/taskrouter.js");
//const port = process.env.PORT || 3000
const port = process.env.PORT;
app.use(express.json());
app.use(userrouter);
app.use(taskrouter);
console.log("index file");
const auth = require("./middleware/auth.js");
// app.get("/users", async (req, res) => {
//   console.log("in get function");
//   try {
//     console.log(10);
//     const result = await user.find();
//     res.send(result);
//   } catch (e) {
//     res.send(e);
//   }
// });
// app.use(function (req, res, next) {
//   if (req.method === "GET") {
//     // console.log("ff");
//     res.send("GET requetss are disbled");
//     next();
//   } else next();
// });

// app.use(function (req, res, next) {
//   res.status(503).send("Site is under maintenance");
// });
// app.use(taskrouter);
// app.use(userrouter);

// app.post("/users", function (req, res) {
//   console.log(99);
//   const abir = new user(req.body);
//   abir
//     .save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       //  res.send(err);
//       res.status(400).send(err);
//     });
//   console.log(req.body);
// });

app.listen(port);
app.use(express.json());
// app.post("/tasks", async (req, res) => {
//   try {
//     // console.log(req.body);
//     // const result = await task.insertMany(req.body);
//     // res.send(result);

//     const taskdocument = new task(req.body);
//     //console.log(taskdocument.description);
//     // const result = await taskdocument.save();
//     // res.status(201).send(result);

//     await taskdocument.save();
//     res.status(201).send(taskdocument);
//     //   const taskdocument = new task(req.body);
//     //   taskdocument
//     //     .save()
//     //     .then((data) => res.send(data))
//     //     .catch((error) => res.status(400).send(error));}
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.get("/users", (req, res) => {
//   task
//     .find(req.body)
//     .then((data) => {
//       res.send(data);
//       //console.log(JSON.parse(data));
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get("/users/:desc", (req, res) => {
//   const thisid = req.params.desc;
//   task
//     .find({ description: thisid })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get("/users", (req, res) => {
//   const thisid = req.query.desc;
//   task
//     .find({ description: thisid })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const result = await task.find();
//     res.send(result);
//   } catch {
//     res.status(500).send();
//   }
// });
// task
//   .find()
//   .then((data) => res.send(data))
//   .catch((err) => {
//     res.send(err);
//   });

// app.get("/tasks/:x", async (req, res) => {
//   try {
//     const id = req.params.x;
//     console.log(11);
//     const result = await task.findByIdAndDelete(id);
//     console.log(1314);
//     console.log(result);
//     if (!result) {
//       res.send("enter a valid id");
//     } else {
//       res.send(result);
//     }
//   } catch {
//     res.status(500).send("t");
//   }
//   // const y = req.params.x;

//   //   task
//   //     .findById(y)
//   //     .then((data) => res.status(200).send(data))
//   //     .catch((err) => res.status(400).send(err));
// });

// userrouter.get("/tasks", async (req, res) => {
//   try {
//     const result = await task.find();
//     res.send(result);
//   } catch {
//     res.status(500).send();
//   }
// });
// console.log("hlo");
// async function crete() {
//   nd = new user({ name: "ppppppppp" });
//   console.log(nd);
//   await nd.save();
// }

// crete().then();
// async function cretet() {
//   nd = new task({ description: "ppppppppp" });
//   await nd.save();
// }
// cretet().then();
const main = async function () {
  //   const t = await task.findById("63bc5500b4895b70bded7972");
  //   // console.log(t);

  //   await t.populate(["creatorid"]);
  //   console.log(t.creatorid);
  console.log(100);
  const o = await user.findById("63bc1fc49a61a99371781602");
  console.log(o);

  await o.populate(["mytasks"]);
  console.log(o.mytasks);
};

//main();
// const upload = multer({ dest: "../avatars" });
// console.log("index filee");
// app.post("/users/me/avatar", upload.single("avatar"), (req, res, next) => {
//   console.log("in avatar fn");
//   res.send();
// });
const middle = async function (req, res, next) {
  console.log("in midd");
  throw new Error("tytyy");
  console.log("after thrwoing error");
  next();
};
app.post(
  "/test",
  middle,
  (req, res) => {
    try {
      res.send("dn");
    } catch (e) {
      res.send(e);
    }
  },
  (error, req, res, next) => {
    console.log("in vb");
    res.status(400).send({ error: error.message });
  }
);
