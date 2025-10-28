import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client = null;
let clientPromise = null;

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getMongoClient() {
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, options).connect();
  }

  return clientPromise;
}

export async function getCollection(dbName, collectionName) {
  const mongoClient = await getMongoClient();
  return mongoClient.db(dbName).collection(collectionName);
}

export async function pingMongo() {
  const mongoClient = await getMongoClient();
  return mongoClient.db("admin").command({ ping: 1 });
}
