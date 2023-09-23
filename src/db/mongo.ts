// online database 
import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';
//db.profiles.find({ "user_id": YOUR_USER_ID }) for mongodb

console.log('url: '+ MONGO_URL);
const client = new MongoClient(MONGO_URL);



export async function start_mongo(): Promise<MongoClient> {

  
  console.log('starting mongo...');
  
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error
  }
}

export default client.db('theRecipe');