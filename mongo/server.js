import { MongoClient, MongoNetworkError, ObjectId } from "mongodb";
import cors from "cors";
import express from "express";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
let client;
const dbName = 'store';
const url = 'mongodb://localhost:27017';

paths = [
    '/api/by-category/:category', //category == "product_type"
    '/api/by-name/:searchTerm',
    '/api/add-user', //body
    '/api/add-order/:uid',
]

/*****  MongoDB endpoints *****/

// Endpoint to read and send JSON file content
app.get("/api/all-products", async (req, res) => {
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection('products');
    const products = await collection.find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error retrieving all products");
  } finally {
    client.close();
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });