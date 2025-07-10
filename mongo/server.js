import { MongoClient, MongoNetworkError, ObjectId } from "mongodb";
import cors from "cors";
import express from "express";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const url = "mongodb://localhost:27017";
let client = new MongoClient(url);
const dbName = "store";

// paths = [
//     '/api/by-category/:category', //category == "product_type"
//     '/api/add-user', //body
//     '/api/add-order/:uid',
// ]

/*****  MongoDB endpoints *****/

// products collection endpoints
app.get("/api/all-products", async (req, res) => {
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("products");
    const products = await collection.find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error retrieving all products");
  }
});

app.get("/api/by-category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("products");
    const products = await collection
      .find({ product_type: category })
      .toArray();
    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error retrieving all products");
  }
});

app.get("/api/by-name/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("products");
    const searchResults = await collection
      .find({ name: { $regex: searchTerm, $options: 'i' } })
      .toArray();
    res.json(searchResults);
  } catch {
    console.error("Error:", err);
    res.status(500).send("Error retrieving all products");
  }
});

// users collection endpoints

app.post("/api/add-user", async (req, res) => {
  try {
    const user = req.body;
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("users");
    await collection.insertOne(user);
    res.send("Successfully added user");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error adding user");
  }
});

app.put("/api/add-order/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const newOrder = req.body;
    console.log(newOrder);

    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("users");

    const result = await collection.updateOne(
      { username: username },
      { $push: { orders: newOrder } }
    );

    if (result.modifiedCount > 0) {
      res.send("Successfully updated orders");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error adding user");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
