const auth = async function (req, res, next) {
  try {
    const enteredtokenfull = req.header("Authorization");
    const enteredtokennet = enteredtokenfull.replace("Bearer ", "");
    console.log(enteredtokennet);
    const decoded = await jwt.verify(enteredtokennet, "im doing node");
    console.log(decoded);
    const thisuser = await user.findOne({
      _id: decoded._id,
      "tokens.token": enteredtokennet,
    });
    console.log("kokoko");
    console.log(enteredtokennet);
    if (!thisuser) {
      console.log("no user");

      throw new Error("invalid token");
    }
    console.log("after thrwoing error");
    req.user = thisuser;
    req.token = enteredtokennet;
    req.taskcreatorid = decoded._id;
    // req.body.taskcreatorid = decoded._id;
    // const thisuser = await user.findOne({
    //     _id: decoded._id,
    //     tokens[0].token: enteredtokennet,
    //   });

    console.log(thisuser);
    console.log("lplplplplp");
    next();
  } catch (e) {
    console.log("in catch");
    res.status(401).send({ error: "please authentiate" });
  }
};

module.exports = auth;
const jwt = require("jsonwebtoken");
const user = require("./../models/users.js");
