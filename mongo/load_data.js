import { MongoClient, MongoNetworkError, ObjectId } from "mongodb";

products = []
for(json in jsons) {
    products.append(json)
}

const client = await MongoClient.connect('mongodb://localhost:27017');

const db = client.db('store');
const collection = db.collection('products');
const socks = await collection.insertMany()
res.json(socks);
