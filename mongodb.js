// const mongodb = require("mongodb");

// const mongoclient = mongodb.MongoClient;

// const connectionurl = "mongodb://127.0.0.1:27017";

// const databasename = "taskmanager";
// mongoclient.connect(
//   connectionurl,
//   { useNewUrlParser: true },
//   function (error, client) {
//     if (error) console.log("connection not made");
//     else {
//       const db = client.db(databasename);

//       db.collection("users").insertOne({ name: "Lucky", age: "29" });
//       db.collection("subjects").insertOne({
//         name: "English",
//         difficulty: "medium",
//       });
//     }
//   }
// );

const { ObjectID } = require("bson");
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "taskmanager";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("users2");
  const id = ObjectID();
  console.log(id);
  const insertresult = await collection.insertMany([
    { name: "lucky", age: 30 },
    { name: "lok", age: "30" },
  ]);
  console.log("Inserted documents =>", insertresult);
  // the following code examples can be pasted here...
  const findcollection = await collection.find({ age: "30" }).toArray();
  console.log("found results-->", findcollection);
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
