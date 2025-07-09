// import { MongoClient, MongoNetworkError, ObjectId } from "mongodb";
const mongo = require('mongodb');
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'json');

const modules = {};

fs.readdirSync(folderPath).forEach(file => {
  if (file.endsWith('.json')) {
    const moduleName = path.basename(file, '.json');
    modules[moduleName] = require(path.join(folderPath, file));
  }
});


let client;
async function connect() {
    client = await mongo.MongoClient.connect('mongodb://localhost:27017')
}
connect();
const db = client.db('store');
const collection = db.collection('products');
async function insert() {await collection.insertMany(modules)}

insert();