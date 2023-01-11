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
  const collection = db.collection("tasks");
  //   const id = ObjectID();
  //   console.log(id);
  //   const insertresult = await collection.insertMany([
  //     { name: "lucky", age: 30 },
  //     { name: "gugu", age: "30" },
  //   ]);
  //   console.log("Inserted documents =>", insertresult);
  // the following code examples can be pasted here...
  //   const findcollection = await collection
  //     .find({
  //       _id: ObjectID("63b5420ff25c6ed47f5094dc"),
  //     })
  //     .toArray();
  //   console.log(findcollection.count);

  //   const findcollection2 = await collection.findOne({
  //     _id: ObjectID("63b53d4639f166a4695ccba4"),
  //   });
  //   const findcollection3 = await collection.find({ completed: false }).toArray();
  //   console.log("id result--->", findcollection2);
  //   console.log("false desc results", findcollection3);
  //   //console.log("found results-->", findcollection);
  //   return "done.";

  const updateresult = await collection.deleteOne(
    { completed: false }

    //  [{ name: "lucky" }, { $set: { age: 67 } }]
  );
  console.log(updateresult, 90);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
