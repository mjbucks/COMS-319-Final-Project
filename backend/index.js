// Author: Maxwell Rohrer Tate Myers
// ISU Netid : mrohrer@iastate.edu tatmyers@iastate.edu
// Date :  May 1, 2024

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "final319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});


app.get("/player", async (req, res) => {
  try {
      await client.connect();
      console.log("Node connected successfully to GET MongoDB");
      const query = {};
      const results = await db
          .collection("players")
          .find(query)
          .limit(100)
          .toArray();
      res.json(results); // Send the results back as JSON response
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error
  }
});


app.get("/player/:id", async (req, res) => {
  const itemid = Number(req.params.id);
  console.log("Item to find :", itemid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = {"id": itemid };
  const results = await db.collection("players")
  .findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
 });
    
app.post("/addPlayer", async (req, res) => {
  try{
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
      "id": req.body.id, 
      "username": req.body.username,
      "password": req.body.password, 
      "win": req.body.win, 
      "loss": req.body.loss, 
    };
    console.log(newDocument);

    const results = await db
    .collection("players")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);
  }
  catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: 'An internal server error occurred' });
  }

 });

app.delete("/deletePlayer/:id", async (req, res) => {
  try {
  const id = Number(req.params.id);
  await client.connect();
  console.log("Item to delete :",id);
  const query = { id: id };
  // delete
  const results = await db.collection("players").deleteOne(query);
  res.status(200);
  res.send(results);

  }
  catch (error){
  console.error("Error deleting item:", error);
  res.status(500).send({ message: 'Internal Server Error' });
  }
  });

  app.put("/updatePlayers/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Item to Update :",id);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
    $set:{
    "win": req.body.win,
    "loss":req.body.loss
    }
    };
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("players").updateOne(query, updateData, options);
    if (results.matchedCount === 0) {
      return res.status(404).send({ message: 'Item not found' });
    }
    else{
      res.status(200);
      res.send(results);
    }
    });

app.get("/characters", async (req, res) => {
  try {
      await client.connect();
      console.log("Node connected successfully to GET MongoDB");
      const query = {};
      const results = await db
          .collection("characters")
          .find(query)
          .limit(100)
          .toArray();
      res.json(results); // Send the results back as JSON response
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error
  }
});


app.get("characters/:id", async (req, res) => {
  const itemid = Number(req.params.id);
  console.log("Item to find :", itemid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = {"id": itemid };
  const results = await db.collection("characters")
  .findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
 });

 app.post("/player/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Attempting login for username:", username);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const query = { username: username };
    const user = await db.collection("players").findOne(query);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    if (user.password !== password) {
      res.status(401).send("Incorrect password");
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  } finally {
    await client.close();
  }
});
