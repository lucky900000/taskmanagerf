const express = require("express");
const taskrouter = express();
const bcrypt = require("bcrypt");
const auth = require("./../middleware/auth.js");
//const taskrouter = new express.Router();
const task = require("./../models/tasks.js");
const { query } = require("express");
module.exports = taskrouter;

//CREATE TASK BELOW
taskrouter.post("/tasks", auth, async (req, res) => {
  try {
    const allowedkeys = ["description", "completed"];
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

    console.log(9900);
    const taskdocument = await new task({
      ...req.body,
      creatorid: req.user._id,
    });
    //taskdocument.creatorid = req.taskcreatorid;
    await taskdocument.save();
    res.status(200).send(taskdocument);
  } catch (err) {
    res.status(400).send(err);
  }
});

//READ

// taskrouter.get("/tasks", async (req, res) => {
//   try {
//     const result = await task.find();
//     res.send(result);
//   } catch {
//     res.status(500).send();
//   }
// });

//GETTING ALL TASKS OF A USER AFTER AUTHENTICATING HIM:=

// taskrouter.get("/tasks/", auth, async (req, res) => {
//   try {
//     const taskresults = await task.find({ creatorid: req.user._id });
//     console.log(900);
//     console.log(taskresults);
//     if (taskresults.length === 0) {
//       console.log("none");
//       return res.status(404).send();
//     }
//     res.status(200).send(taskresults);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

//GETTING ALL TASKS OF A USER AFTER AUTHENTICAITON USING VIRTUAL MODELS-

// taskrouter.get("/tasks", auth, async (req, res) => {
//   try {
//     await req.user.populate(["mytasks"]);
//     res.send(req.user.mytasks);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

//GETTING TASK BY AUTHENTICATING USER AND TASK ID:
// taskrouter.get("/tasks/:id", auth, async (req, res) => {
//   const taskid = req.params.id;
//   try {
//     const taskresult = await task.findOne({
//       _id: taskid,
//       creatorid: req.user._id,
//     });

//     if (!taskresult) {
//       return res.status(404).send();
//     }
//     res.status(200).send(taskresult);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

//GETTING TASKS OF A USER BY QUERY AFTER AUTHENTICATING HIM:
taskrouter.get("/tasks", auth, async (req, res) => {
  try {
    let taskresults = [];
    if (!req.query.completed) {
      taskresults = await task
        .find({
          creatorid: req.user._id,
        })
        .skip((req.query.page - 1) * 2)
        .limit(2)
        .sort(req.query.sortby);
    } else {
      taskresults = await task
        .find({
          creatorid: req.user._id,
          completed: req.query.completed,
        })
        .skip((req.query.page - 1) * 2)
        .limit(2);
    }
    console.log("gggg");
    console.log(taskresults);
    if (!taskresults) {
      return res.status(404).send();
    }
    res.status(200).send(taskresults);
  } catch (e) {
    res.status(400).send();
  }
});

//UPDATE BELOW
// taskrouter.patch("/tasks/:id", async (req, res) => {
//   console.log(22);

//   const keysallowedtobeupdated = ["completed", "description"];
//   const keystobeupdated = Object.keys(req.body);
//   const isvalidoperation = keystobeupdated.every((update) => {
//     return keysallowedtobeupdated.includes(update);
//   });
//   if (!isvalidoperation) {
//     return res.send({ error: "This update is not allowed" });
//   }

//   try {
//     const idofdocumenttobeupdated = req.params.id;
//     const updateddocument = await task.findByIdAndUpdate(
//       idofdocumenttobeupdated,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updateddocument) {
//       res.status(404).send();
//     } else {
//       if (updateddocument.description) {
//         console.log("cccccc");
//         updateddocument.description = await bcrypt.hash(
//           updateddocument.description,
//           8
//         );
//         updateddocument.save();
//       }
//       console.log("aaaaaaaaaa");
//       res.status(200).send(updateddocument);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

//DELETE A TASK OF A USER AFTER AUTHENTICATING HIM
taskrouter.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const result = await task.findOneAndDelete({
      creatorid: req.user._id,
      _id: req.params.id,
    });

    if (!result) {
      res.status(404).send();
    } else {
      console.log(88);
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//UPDATE TASK OF A USER AFTER AUTHENTICATING HIM:-
taskrouter.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const allowedupdates = ["description", "completed"];

    //   Object.keys(req.body).forEach((key) => {
    //     console.log(key);
    //     if (!allowedupdates.includes(key)) {
    //       console.log(2);
    //       validator = false;
    //     }
    //   });

    const validator = Object.keys(req.body).every((key) => {
      return allowedupdates.includes(key);
    });

    if (!validator) {
      return res.status(400).send({ error: "This key cannot be udpated" });
    }

    const tasktobeupdated = await task.findOne({
      creatorid: req.user._id,
      _id: req.params.id,
    });

    if (!tasktobeupdated) {
      console.log("none");
      return res.status(404).send();
    }

    Object.keys(req.body).forEach((key) => {
      tasktobeupdated[key] = req.body[key];
    });

    console.log(tasktobeupdated);
    await tasktobeupdated.save();
    res.status(200).send(tasktobeupdated);
  } catch (e) {
    res.status(400).send();
  }
  //   const usertobeupdated = await task.findById(req.params.id);

  //   if (!usertobeupdated) {
  //     return res.status(404).send();
  //   }
});
