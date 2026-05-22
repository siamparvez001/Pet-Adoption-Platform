import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const connectDB = async () => {
  await client.connect();
  return client.db("pet_adoption");
};